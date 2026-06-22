"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "es" | "en";
type Turn = { role: "user" | "model"; text: string };

const PROMPT = (
  <>
    <span style={{ color: "#FAFAF9" }}>visitante</span>
    <span style={{ color: "#6b6b70" }}>@edi-dev</span>
    <span style={{ color: "#9B9BA1" }}>:~$</span>
  </>
);

export default function AskEdiTerminal({
  lang,
  termTitle,
  termComment,
  chips,
}: {
  lang: Lang;
  termTitle: string;
  termComment: string;
  chips: string[];
}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // reinicia la conversación al cambiar de idioma
  useEffect(() => {
    setTurns([]);
  }, [lang]);

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
      const reply: string =
        data?.assistant?.response ||
        data?.error ||
        (lang === "es" ? "Sin respuesta." : "No response.");
      setTurns((p) => [...p, { role: "model", text: reply }]);
    } catch {
      setTurns((p) => [
        ...p,
        { role: "model", text: lang === "es" ? "Error de conexión. Intenta de nuevo." : "Connection error. Try again." },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  return (
    <div data-reveal style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "#0C0C0E" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a3f" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a3f" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a3f" }} />
        <span className="mono" style={{ marginLeft: 8, fontSize: 12, color: "#6b6b70" }}>{termTitle}</span>
      </div>
      <div
        ref={bodyRef}
        className="mono"
        onClick={() => inputRef.current?.focus()}
        style={{ padding: 24, fontSize: 13.5, lineHeight: 1.8, minHeight: 250, maxHeight: 340, overflowY: "auto", cursor: "text" }}
      >
        <div style={{ color: "#5a5a60" }}># {termComment}</div>

        {turns.map((m, i) =>
          m.role === "user" ? (
            <div key={i} style={{ marginTop: 12 }}>{PROMPT} <span style={{ color: "#FAFAF9" }}>{m.text}</span></div>
          ) : (
            <div key={i} style={{ marginTop: 10, color: "#d4d4d2", whiteSpace: "pre-line" }}>{m.text}</div>
          )
        )}

        {loading && (
          <div style={{ marginTop: 10, color: "#9B9BA1" }}>
            <span className="hm-typing">{lang === "es" ? "pensando" : "thinking"}</span>
            <span style={{ animation: "hm-blink 1.1s step-end infinite" }}>…</span>
          </div>
        )}

        {turns.length === 0 && !loading && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {chips.map((c, i) => (
              <button
                key={i}
                data-hov
                onClick={() => send(c)}
                className="hm-pill"
                style={{ fontSize: 11, padding: "7px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,.14)", background: "transparent", color: "#9B9BA1", cursor: "none" }}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* línea de entrada real */}
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8 }}>
          {PROMPT}
          <input
            ref={inputRef}
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
            placeholder={lang === "es" ? "escribe tu pregunta…" : "type your question…"}
            aria-label={lang === "es" ? "Pregúntale a la IA sobre Edi" : "Ask the AI about Edi"}
            className="hm-term-input"
            style={{
              flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
              color: "#FAFAF9", fontFamily: "inherit", fontSize: 13.5, caretColor: "#FAFAF9", cursor: "text",
            }}
          />
        </div>
      </div>
    </div>
  );
}
