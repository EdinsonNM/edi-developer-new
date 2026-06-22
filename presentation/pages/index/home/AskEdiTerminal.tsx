"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent, Lang } from "./content";

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
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // reinicia la conversación al cambiar de idioma
  useEffect(() => { setTurns([]); }, [lang]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [turns, loading]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setInput("");
    const history = turns;
    setTurns((p) => [...p, { role: "user", text }]);
    setLoading(true);
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
      const data = await res.json();
      const reply: string = data?.assistant?.response || data?.error || term.noResponse;
      setTurns((p) => [...p, { role: "model", text: reply }]);
    } catch {
      setTurns((p) => [...p, { role: "model", text: term.connError }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
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
        className="mono p-6 text-[13.5px] leading-[1.8] min-h-[250px] max-h-[340px] overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-[#5a5a60]"># {term.comment}</div>

        {turns.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="mt-3"><Prompt /> <span className="text-[#FAFAF9]">{m.text}</span></div>
          ) : (
            <div key={i} className="mt-2.5 text-[#d4d4d2] whitespace-pre-line">{m.text}</div>
          )
        )}

        {loading && (
          <div className="mt-2.5 text-[#9B9BA1]">
            {term.thinking}<span style={{ animation: "hm-blink 1.1s step-end infinite" }}>…</span>
          </div>
        )}

        {turns.length === 0 && !loading && (
          <div className="flex flex-wrap gap-2 mt-5">
            {term.chips.map((c, i) => (
              <button key={i} data-hov onClick={() => send(c)} className="hm-pill text-[11px] px-3 py-[7px] rounded-full border border-white/[.14] bg-transparent text-[#9B9BA1] cursor-none">
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-[18px] flex items-center gap-2">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
            placeholder={term.placeholder}
            aria-label={term.aria}
            className="hm-term-input flex-1 min-w-0 bg-transparent border-none outline-none text-[#FAFAF9] text-[13.5px] cursor-text"
            style={{ caretColor: "#FAFAF9" }}
          />
        </div>
      </div>
    </div>
  );
}
