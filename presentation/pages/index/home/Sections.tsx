"use client";

import { useState, type RefObject } from "react";
import type { HomeContent, Lang } from "./content";
import AskEdiTerminal from "./AskEdiTerminal";
import { FORMSPREE_URL } from "@/lib/site-config";
import { contactAnalytics } from "@/lib/analytics";
import { useI18n } from "@/presentation/utils/use-i18n";

type T = HomeContent["t"];
const CONTAINER = "max-w-[1280px] mx-auto";
const SOLID_BTN = "hm-btn-solid inline-flex items-center gap-2.5 rounded-[10px] font-semibold text-[#0A0A0B] bg-[#FAFAF9]";
const GHOST_BTN = "hm-btn-ghost inline-flex items-center gap-2.5 font-medium border border-white/[.16] text-[#FAFAF9]";

/* ===================== 01 HERO ===================== */
export function Hero({ t, canvasRef }: { t: T["hero"]; canvasRef: RefObject<HTMLCanvasElement | null> }) {
  return (
    <header id="inicio" data-section-el="inicio" className="hm-hero relative min-h-screen overflow-hidden flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 block h-full w-full" />
      <div className="mono edge-readout absolute right-[clamp(20px,3vw,40px)] top-[42%] -translate-y-1/2 [writing-mode:vertical-rl] text-[11px] tracking-[.3em] text-[#3c3c42] z-[2]">
        EDI-DEVELOPER.DEV · 2026
      </div>

      <div className="relative z-[2] w-full max-w-[1280px] mx-auto">
        <div data-reveal className="mono flex items-center gap-3 text-[13px] tracking-[.18em] text-[#9B9BA1] mb-[30px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FAFAF9]" />
          {t.eyebrow}
        </div>
        <h1 className="hm-h1 max-w-[14ch]">
          <span data-reveal className="block text-[#FAFAF9]">{t.line1}</span>
          <span data-reveal className="block font-normal text-[#5a5a60]">{t.line2}</span>
          <span data-reveal className="block text-[#FAFAF9]">{t.accent}</span>
        </h1>
        <div className="flex flex-wrap items-end justify-between gap-10 mt-[clamp(32px,5vh,60px)]">
          <p data-reveal className="text-[clamp(15px,1.5vw,19px)] leading-relaxed text-[#9B9BA1] max-w-[48ch] [text-wrap:pretty]">{t.lead}</p>
          <div data-reveal className="flex flex-wrap gap-3.5">
            <a href="#productos" data-hov data-magnetic className={`${SOLID_BTN} px-[26px] py-[15px] text-[15px]`}>{t.cta1} <span className="mono">→</span></a>
            <a href="#contacto" data-hov data-magnetic className="hm-btn-ghost inline-flex items-center gap-2.5 px-[26px] py-[15px] rounded-[10px] text-[15px] font-medium border border-white/[.16] text-[#9B9BA1]">{t.cta2}</a>
          </div>
        </div>
        <div data-reveal className="mono flex flex-wrap gap-12 mt-[clamp(40px,6vh,68px)]">
          {t.readout.map((r, i) => (
            <div key={i}>
              <div className="text-[11px] tracking-[.14em] text-[#5a5a60]">{r.k}</div>
              <div className="text-[15px] text-[#FAFAF9] mt-[7px]">{r.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mono absolute right-[clamp(20px,5vw,56px)] bottom-[clamp(48px,8vh,96px)] text-[11px] tracking-[.2em] text-[#3c3c42] z-[2] flex items-center gap-2">
        {t.scroll} <span className="inline-block w-px h-7" style={{ background: "linear-gradient(#9B9BA1,transparent)" }} />
      </div>
    </header>
  );
}

/* ===================== 02 PRODUCTOS (horizontal con pin) ===================== */
export function Products({
  t,
  hwrapRef,
  htrackRef,
  hProgRef,
}: {
  t: T["products"];
  hwrapRef: RefObject<HTMLElement | null>;
  htrackRef: RefObject<HTMLDivElement | null>;
  hProgRef: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <section id="productos" data-section-el="productos" className="h-wrap relative h-[360vh]" ref={hwrapRef}>
      <div className="h-pin sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="flex items-end justify-between hm-pad-x max-w-[1400px] mx-auto w-full">
          <div>
            <div className="hm-eyebrow mb-3">02 — {t.eyebrow}</div>
            <h2 className="hm-h2-sm max-w-[18ch] [text-wrap:balance]">{t.title}</h2>
          </div>
        </div>
        <div ref={htrackRef} className="h-track flex gap-7 px-[clamp(20px,5vw,56px)] py-9 mt-[18px] will-change-transform">
          {t.items.map((p) => (
            <a key={p.n} href={p.url} target="_blank" rel="noopener noreferrer" data-hov className="hm-card-glass relative shrink-0 w-[min(82vw,620px)] rounded-[18px] overflow-hidden block">
              <div className="p-[34px_34px_30px]">
                <div className="flex items-center justify-between mb-7">
                  <div className="mono text-xs tracking-[.1em] text-[#6b6b70]">{p.tag}</div>
                  <div className="flex gap-2">
                    {p.badges.map((b, i) => (
                      <span key={i} className="mono text-[11px] px-[11px] py-[5px] rounded-full text-[#9B9BA1] border border-white/[.12]">{b}</span>
                    ))}
                  </div>
                </div>
                <h3 className="hm-prod-name">{p.name}</h3>
                <p className="mt-4 text-lg text-[#d4d4d2] leading-snug">{p.tagline}</p>
                <p className="mt-3.5 text-[15px] text-[#9B9BA1] leading-relaxed max-w-[48ch] [text-wrap:pretty]">{p.desc}</p>
              </div>
              <div className="relative h-[190px] overflow-hidden bg-[rgba(8,8,10,.35)]">
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px,rgba(255,255,255,.05) 1px,transparent 0)", backgroundSize: "16px 16px" }} />
                <span className="mono absolute left-6 bottom-[18px] text-[13px] text-[#FAFAF9] flex items-center gap-2">{p.link} <span>↗</span></span>
                <div className="mono absolute right-[22px] top-4 text-[40px] font-semibold text-white/[.06]">0{p.n}</div>
              </div>
            </a>
          ))}
          <div className="shrink-0 w-[min(60vw,360px)] flex flex-col justify-center gap-3.5 px-3">
            <div className="mono text-xs text-[#6b6b70] tracking-[.1em]">{t.moreComing}</div>
            <div className="text-[clamp(22px,3vw,34px)] font-medium text-[#5a5a60] tracking-[-.025em] [text-wrap:balance]">{t.moreComingSub}</div>
            <span ref={hProgRef} className="sr-only">00 / 03</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== 03 RECURSOS ===================== */
export function Resources({ t }: { t: T["resources"] }) {
  return (
    <section id="recursos" data-section-el="recursos" className="relative hm-sec-lg hm-pad-x">
      <div className={CONTAINER}>
        <div data-reveal className="hm-eyebrow mb-4">03 — {t.eyebrow}</div>
        <h2 data-reveal className="hm-h2 max-w-[20ch] mb-14 [text-wrap:balance]">{t.title}</h2>
        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(340px,1fr))]">
          {t.items.map((r, i) => (
            <a key={i} href={r.href} data-reveal data-hov className="hm-card-sm relative flex gap-[26px] p-[30px] rounded-2xl bg-[#101012]">
              <div className="shrink-0 w-[84px] h-[116px] rounded-md relative overflow-hidden bg-[#1a1a1d]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={encodeURI(r.cover)} alt={r.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <span className="mono text-[11px] px-2.5 py-1 rounded-full text-[#9B9BA1] border border-white/[.12]">{r.tag}</span>
                <h3 className="mt-4 text-[21px] font-semibold tracking-[-.02em] leading-tight">{r.name}</h3>
                <p className="mt-2.5 text-[#9B9BA1] text-sm leading-relaxed [text-wrap:pretty]">{r.desc}</p>
                <div className="mono mt-[18px] text-[13px] text-[#FAFAF9]">{r.cta} →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== 04 SOBRE MÍ + TERMINAL ===================== */
export function About({ t, lang }: { t: T["about"]; lang: Lang }) {
  return (
    <section id="sobre" data-section-el="sobre" className="relative hm-sec hm-pad-x">
      <div className="max-w-[1280px] mx-auto grid gap-[clamp(40px,5vw,80px)] items-center [grid-template-columns:minmax(0,1fr)] lg:[grid-template-columns:repeat(auto-fit,minmax(370px,1fr))]">
        <div>
          <div data-reveal className="hm-eyebrow mb-4">04 — {t.eyebrow}</div>
          <h2 data-reveal className="hm-h2 leading-[1.06] [text-wrap:balance]">{t.titlePre} <span className="text-[#FAFAF9]">{t.titleGrad}</span></h2>
          <p data-reveal className="mt-6 text-base leading-[1.75] text-[#9B9BA1] max-w-[54ch] [text-wrap:pretty]">{t.p1}</p>
          <p data-reveal className="mt-3.5 text-base leading-[1.75] text-[#9B9BA1] max-w-[54ch] [text-wrap:pretty]">{t.p2}</p>
          <div data-reveal className="flex flex-wrap gap-[9px] mt-7">
            {t.stack.map((tag) => (
              <span key={tag} className="mono text-xs px-3 py-[7px] rounded-[7px] border border-white/[.08] text-[#9B9BA1]">{tag}</span>
            ))}
          </div>
        </div>
        <AskEdiTerminal lang={lang} term={t.terminal} />
      </div>
    </section>
  );
}

/* ===================== 05 QUÉ HAGO ===================== */
export function Services({ t }: { t: T["services"] }) {
  return (
    <section id="servicios" data-section-el="servicios" className="relative hm-sec hm-pad-x">
      <div className="max-w-[1180px] mx-auto">
        <div data-reveal className="hm-eyebrow mb-4">05 — {t.eyebrow}</div>
        <h2 data-reveal className="hm-h2 max-w-[22ch]">{t.title}</h2>
        <p data-reveal className="mt-[18px] text-[#9B9BA1] text-base max-w-[60ch] [text-wrap:pretty]">{t.lead}</p>
        <div className="mt-14">
          {t.items.map((sv) => (
            <div key={sv.n} data-reveal data-hov className="hm-service grid [grid-template-columns:64px_1fr] gap-[clamp(20px,4vw,56px)] items-baseline py-[clamp(24px,3.5vh,38px)] border-t border-white/[.06]">
              <div className="mono text-[13px] text-[#5a5a60] pt-2">0{sv.n}</div>
              <div className="grid gap-2.5">
                <h3 className="hm-service-title">{sv.title}</h3>
                <p className="text-[#9B9BA1] text-[15px] leading-[1.55] max-w-[60ch] [text-wrap:pretty]">{sv.desc}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-white/[.06]" />
        </div>
      </div>
    </section>
  );
}

/* ===================== 06 CHARLAS ===================== */
export function Talks({ t }: { t: T["talks"] }) {
  return (
    <section id="charlas" data-section-el="charlas" className="relative hm-sec-lg hm-pad-x text-center">
      <div className="max-w-[1000px] mx-auto">
        <div data-reveal className="hm-eyebrow mb-4">06 — {t.eyebrow}</div>
        <h2 data-reveal className="text-[clamp(28px,4.6vw,54px)] font-semibold tracking-[-.035em] max-w-[18ch] mx-auto [text-wrap:balance]">{t.title}</h2>
        <div data-reveal className="flex flex-wrap gap-3 justify-center mt-12">
          {t.topics.map((topic, i) => (
            <span key={i} data-hov className="hm-pill-soft text-sm px-5 py-3 rounded-full border border-white/10 text-[#9B9BA1]">{topic}</span>
          ))}
        </div>
        <a data-reveal data-hov data-magnetic href="#contacto" className={`${GHOST_BTN} mt-11 px-[26px] py-3.5 rounded-full`}>{t.cta} <span className="mono">→</span></a>
      </div>
    </section>
  );
}

/* ===================== 07 BLOG ===================== */
export function Blog({ t }: { t: T["blog"] }) {
  return (
    <section id="blog" data-section-el="blog" className="relative hm-sec hm-pad-x">
      <div className={CONTAINER}>
        <div data-reveal className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="hm-eyebrow mb-4">07 — {t.eyebrow}</div>
            <h2 className="hm-h2">{t.title}</h2>
          </div>
          <a href={t.url} data-hov className="mono hm-link-mono text-[13px] text-[#9B9BA1]">{t.all} →</a>
        </div>
        <div className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
          {t.posts.map((post, i) => (
            <a key={i} href={post.href} data-reveal data-hov className="hm-blog flex flex-col rounded-[14px] overflow-hidden bg-[#101012]">
              <div className="h-40 relative overflow-hidden bg-[#0E0E10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={encodeURI(post.img)} alt={post.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,11,.1), rgba(10,10,11,.55))" }} />
                <div className="mono absolute right-3.5 top-3 text-[11px] text-[#d4d4d2]">{post.cat}</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold leading-tight tracking-[-.01em] [text-wrap:balance]">{post.title}</h3>
                <div className="mono mt-[18px] text-xs text-[#5a5a60]">{post.meta}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== 08 EDI ACADEMY ===================== */
export function Academy({ t }: { t: T["academy"] }) {
  return (
    <section id="academy" data-section-el="academy" className="relative hm-sec hm-pad-x">
      <div className={CONTAINER}>
        <div className="grid gap-11 items-end mb-[60px] [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div>
            <div data-reveal className="hm-eyebrow mb-4">08 — {t.eyebrow}</div>
            <h2 data-reveal className="hm-h2 [text-wrap:balance]">{t.titlePre} <span className="text-[#FAFAF9]">{t.titleAccent}</span></h2>
            <p data-reveal className="mt-[18px] text-[#9B9BA1] text-base max-w-[48ch] [text-wrap:pretty]">{t.lead}</p>
          </div>
          <div data-reveal className="flex gap-12 flex-wrap">
            {t.metrics.map((m, i) => (
              <div key={i}>
                <div data-count={m.count} className="text-[clamp(38px,5vw,60px)] font-semibold tracking-[-.03em] text-[#FAFAF9]">{m.n}</div>
                <div className="mono text-[11px] tracking-[.1em] text-[#5a5a60] mt-1.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))]">
          {t.cols.map((col, i) => (
            <div key={i} data-reveal data-hov className="hm-card-sm p-8 rounded-2xl bg-[#101012]">
              <div className="mono text-[11px] tracking-[.12em] text-[#6b6b70]">{col.label}</div>
              <h3 className="mt-4 text-[23px] font-semibold tracking-[-.02em]">{col.aud}</h3>
              <p className="mt-3 text-[#9B9BA1] text-[15px] leading-relaxed [text-wrap:pretty]">{col.desc}</p>
            </div>
          ))}
        </div>
        <a data-reveal data-hov data-magnetic href={t.url} target="_blank" rel="noopener noreferrer" className={`${SOLID_BTN} mt-10 px-[26px] py-3.5 rounded-[10px]`}>{t.cta} <span className="mono">→</span></a>
      </div>
    </section>
  );
}

/* ===================== 09 CONTACTO ===================== */
export function Contact({ t }: { t: T["contact"] }) {
  const { language } = useI18n();
  const field = "hm-field w-full mt-2 px-3.5 py-[13px] rounded-[10px] border border-white/10 bg-[#0A0A0B]/50 text-[#FAFAF9] text-[15px] outline-none cursor-text";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const messageLength = formData.message.trim().length;
    contactAnalytics.submit({
      language,
      formVariant: "home_minimal",
      messageLength,
    });

    const startedAt = performance.now();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        contactAnalytics.success({
          language,
          formVariant: "home_minimal",
          messageLength,
          durationMs: Math.round(performance.now() - startedAt),
        });
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        contactAnalytics.error({
          language,
          formVariant: "home_minimal",
          errorType: "server",
          statusCode: res.status,
        });
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      contactAnalytics.error({
        language,
        formVariant: "home_minimal",
        errorType: "network",
      });
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contacto" data-section-el="contacto" className="relative hm-sec-lg hm-pad-x">
      <div className="max-w-[780px] mx-auto text-center">
        <div data-reveal className="hm-eyebrow mb-4">09 — {t.eyebrow}</div>
        <h2 data-reveal className="hm-display [text-wrap:balance]">{t.titlePre} <span className="text-[#FAFAF9]">{t.titleGrad}</span></h2>
        <p data-reveal className="mt-[22px] text-[17px] text-[#9B9BA1] max-w-[46ch] mx-auto [text-wrap:pretty]">{t.lead}</p>
        <form
          data-reveal
          onSubmit={handleSubmit}
          className="mt-[46px] p-[34px] rounded-[18px] text-left bg-[#101012]/55 backdrop-blur-md border border-white/[.08]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="mono text-xs text-[#9B9BA1]">{t.form.name}</span>
              <input
                data-field
                data-hov
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={t.form.namePh}
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className={field}
              />
            </label>
            <label className="block">
              <span className="mono text-xs text-[#9B9BA1]">{t.form.email}</span>
              <input
                data-field
                data-hov
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t.form.emailPh}
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className={field}
              />
            </label>
          </div>
          <label className="block mt-4">
            <span className="mono text-xs text-[#9B9BA1]">{t.form.msg}</span>
            <textarea
              data-field
              data-hov
              name="message"
              rows={4}
              required
              placeholder={t.form.msgPh}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              className={`${field} resize-y`}
            />
          </label>
          <button
            type="submit"
            data-hov
            disabled={status === "sending"}
            className="hm-btn-solid w-full mt-5 p-4 border-none cursor-none rounded-[10px] font-semibold text-[15px] text-[#0A0A0B] bg-[#FAFAF9] disabled:opacity-60"
          >
            {status === "sending" ? t.form.sending : t.form.send}
          </button>
          {status === "success" && (
            <p className="mono mt-4 text-sm text-[#27C93F]" role="status">{t.form.success}</p>
          )}
          {status === "error" && (
            <p className="mono mt-4 text-sm text-[#FF5F56]" role="alert">{t.form.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
