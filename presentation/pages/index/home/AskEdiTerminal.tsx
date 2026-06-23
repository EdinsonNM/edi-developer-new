"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent, Lang } from "./content";
import { chatAnalytics } from "@/lib/analytics";

type Turn = { role: "user" | "model"; text: string };

const Prompt = () => (
  <>
    <span className="text-[#27C93F]">visitante</span>
    <span className="text-[#6b6b70]">@</span>
    <span className="text-[#5AC8FA]">edi-dev</span>
    <span className="text-[#6b6b70]">:</span>
    <span className="text-[#BF8BFF]">~</span>
    <span className="text-[#9B9BA1]">$</span>
  </>
);

export default function AskEdiTerminal({ lang, term }: { lang: Lang; term: HomeContent["t"]["about"]["terminal"] }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const resizeInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  // reinicia la conversación al cambiar de idioma
  useEffect(() => { setTurns([]); }, [lang]);

  useEffect(() => {
    resizeInput();
  }, [input]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [turns, loading]);

  const send = async (raw: string, source: "chip" | "input" = "input") => {
    const text = raw.trim();
    if (!text || loading) return;
    const turnIndex = Math.floor(turns.length / 2) + 1;
    chatAnalytics.messageSent({
      language: lang,
      source,
      messageLength: text.length,
      turnIndex,
    });

    const startedAt = performance.now();
    setInput("");
    const history = turns;
    setTurns((p) => [...p, { role: "user", text }]);
    setLoading(true);
    setStreaming(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInput: text,
          messagesForApi: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
          language: lang,
        }),
      });

      // error (no streaming): el servidor responde JSON con { error }
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const errorType =
          res.status === 429
            ? "rate_limit"
            : res.status === 400
              ? "validation"
              : "server";
        chatAnalytics.responseError({
          language: lang,
          errorType,
          statusCode: res.status,
          turnIndex,
        });
        setTurns((p) => [...p, { role: "model", text: data?.error || term.noResponse }]);
        return;
      }

      // stream de texto plano: vamos agregando los tokens en vivo
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let started = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        acc += chunk;
        if (!started) {
          started = true;
          setStreaming(true);
          setTurns((p) => [...p, { role: "model", text: acc }]);
        } else {
          setTurns((p) => {
            const copy = [...p];
            copy[copy.length - 1] = { role: "model", text: acc };
            return copy;
          });
        }
      }
      if (!started) {
        chatAnalytics.responseError({
          language: lang,
          errorType: "empty",
          turnIndex,
        });
        setTurns((p) => [...p, { role: "model", text: term.noResponse }]);
        return;
      }

      chatAnalytics.responseSuccess({
        language: lang,
        responseLength: acc.length,
        durationMs: Math.round(performance.now() - startedAt),
        turnIndex,
      });
    } catch {
      chatAnalytics.responseError({
        language: lang,
        errorType: "network",
        turnIndex,
      });
      setTurns((p) => [...p, { role: "model", text: term.connError }]);
    } finally {
      setLoading(false);
      setStreaming(false);
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
    }
  };

  return (
    <div data-reveal className="rounded-[14px] overflow-hidden border border-white/[.08] bg-[#0C0C0E]">
      <div className="flex items-center gap-2 px-4 py-[13px] border-b border-white/[.06]">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-black/10" />
        <span className="mono ml-2 text-xs text-[#6b6b70]">{term.title}</span>
      </div>
      <div
        ref={bodyRef}
        className="mono hm-term-scroll p-6 text-[13.5px] leading-[1.8] min-h-[250px] max-h-[340px] overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-[#5a5a60]"># {term.comment}</div>

        {turns.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="mt-3"><Prompt /> <span className="text-[#FAFAF9] whitespace-pre-line break-words">{m.text}</span></div>
          ) : (
            <div key={i} className="mt-2.5 text-[#d4d4d2] whitespace-pre-line">{m.text}</div>
          )
        )}

        {loading && !streaming && (
          <div className="mt-2.5 text-[#9B9BA1]">
            {term.thinking}<span style={{ animation: "hm-blink 1.1s step-end infinite" }}>…</span>
          </div>
        )}

        {turns.length === 0 && !loading && (
          <div className="flex flex-wrap gap-2 mt-5">
            {term.chips.map((c, i) => (
              <button key={i} data-hov onClick={() => send(c, "chip")} className="hm-pill text-[11px] px-3 py-[7px] rounded-full border border-white/[.14] bg-transparent text-[#9B9BA1] cursor-none">
                {c}
              </button>
            ))}
          </div>
        )}

        <form
          className="mt-[18px]"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:gap-2">
            <span className="shrink-0 md:pt-[3px]"><Prompt /></span>
            <textarea
              ref={inputRef}
              value={input}
              disabled={loading}
              rows={1}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder={term.placeholder}
              aria-label={term.aria}
              enterKeyHint="send"
              className="hm-term-input w-full md:flex-1 min-w-0 mt-1.5 md:mt-0 resize-none overflow-hidden bg-transparent border-none outline-none text-[#FAFAF9] text-[13.5px] leading-[1.8] cursor-text break-words"
              style={{ caretColor: "#FAFAF9" }}
            />
          </div>
          <div className="md:hidden flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={term.sendAria}
              className="shrink-0 flex items-center justify-center h-7 w-7 rounded-[7px] border border-[#27C93F]/35 bg-[#27C93F]/10 text-[#27C93F] disabled:opacity-35 disabled:pointer-events-none active:bg-[#27C93F]/20 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
