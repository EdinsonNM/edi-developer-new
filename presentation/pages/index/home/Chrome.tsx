"use client";

import type { RefObject } from "react";
import type { HomeContent, Lang, SectionRef } from "./content";

type T = HomeContent["t"];

/* ===================== Fondo: video scrubbed + velo + grano + cursor ===================== */
export function Backdrop({
  videoRef,
  dotRef,
  ringRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  dotRef: RefObject<HTMLDivElement | null>;
  ringRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <div className="fixed inset-0 -z-[3] bg-[#0A0A0B] pointer-events-none" />
      <video
        ref={videoRef}
        src="/videos/video-developer-scrub.mp4"
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 -z-[2] h-full w-full object-cover pointer-events-none"
      />
      <div
        className="fixed inset-0 -z-[1] pointer-events-none"
        style={{ background: "radial-gradient(120% 120% at 50% 30%, rgba(10,10,11,.42), rgba(10,10,11,.72))" }}
      />

      {/* cursor custom */}
      <div ref={ringRef} className="obs-ring" />
      <div ref={dotRef} className="obs-dot" />

      {/* grano + viñeta */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[.04] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      <div
        className="fixed inset-0 z-[59] pointer-events-none"
        style={{ background: "radial-gradient(130% 100% at 50% 28%, transparent 60%, rgba(0,0,0,.55) 100%)" }}
      />
    </>
  );
}

/* ===================== Índice lateral 01–09 ===================== */
export function SideIndex({ sections }: { sections: SectionRef[] }) {
  return (
    <div className="side-index fixed left-[26px] top-1/2 -translate-y-1/2 z-[55] flex flex-col gap-[18px]">
      {sections.map((s) => (
        <a key={s.id} href={s.href} data-idx={s.id} data-hov className="hm-idx mono flex items-center gap-2.5 text-[11px] tracking-[.05em] text-[#46464c]">
          <span data-idx-bar={s.id} className="hm-idx-bar h-px w-4 bg-[#2c2c30]" />
          {s.num}
        </a>
      ))}
    </div>
  );
}

/* ===================== Navbar ===================== */
export function Navbar({
  lang,
  setLanguage,
  clockRef,
}: {
  lang: Lang;
  setLanguage: (l: Lang) => void;
  clockRef: RefObject<HTMLSpanElement | null>;
}) {
  const langBtn = (code: Lang) =>
    `hm-nav-btn px-[11px] py-1.5 border-none cursor-none ${lang === code ? "bg-[#FAFAF9] text-[#0A0A0B]" : "bg-transparent text-[#9B9BA1]"}`;

  return (
    <nav
      className="fixed top-0 inset-x-0 z-[58] flex items-center justify-between py-[18px] hm-pad-x backdrop-blur-[12px]"
      style={{ background: "linear-gradient(180deg,rgba(10,10,11,.82),rgba(10,10,11,0))" }}
    >
      <a href="#inicio" data-hov className="flex items-center gap-[11px] font-semibold tracking-[-.01em] text-base">
        <span className="h-[9px] w-[9px] rounded-[2px] bg-[#FAFAF9]" />
        <span>edi<span className="text-[#6b6b70]">-developer</span><span className="mono text-[#9B9BA1]">.dev</span></span>
      </a>
      <div className="flex items-center gap-5">
        <span ref={clockRef} className="mono hidden text-xs text-[#5a5a60] tracking-[.05em]">--:--:-- LIM</span>
        <div className="mono flex items-center rounded-full overflow-hidden text-xs border border-white/10">
          <button data-hov onClick={() => setLanguage("es")} className={langBtn("es")}>ES</button>
          <button data-hov onClick={() => setLanguage("en")} className={langBtn("en")}>EN</button>
        </div>
      </div>
    </nav>
  );
}

/* ===================== Footer ===================== */
export function Footer({ t, sections }: { t: T; sections: SectionRef[] }) {
  return (
    <footer className="relative">
      <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)" }} />
      <div className="hm-pad-x pt-[clamp(54px,9vh,90px)] pb-10 max-w-[1280px] mx-auto grid gap-11 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        <div>
          <div className="flex items-center gap-2.5 font-semibold text-lg">
            <span className="h-[9px] w-[9px] rounded-[2px] bg-[#FAFAF9]" />
            <span className="tracking-[-.01em]">edi<span className="text-[#6b6b70]">-developer</span><span className="mono text-[#9B9BA1]">.dev</span></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#9B9BA1] max-w-[280px] [text-wrap:pretty]">{t.footer.tag}</p>
          <div className="flex gap-3 mt-[22px]">
            <a href={t.footer.github} target="_blank" rel="noopener noreferrer" data-hov className="mono hm-pill text-[13px] px-[15px] py-[9px] rounded-[9px] border border-white/10 text-[#9B9BA1]">GitHub ↗</a>
            <a href={t.footer.linkedin} target="_blank" rel="noopener noreferrer" data-hov className="mono hm-pill text-[13px] px-[15px] py-[9px] rounded-[9px] border border-white/10 text-[#9B9BA1]">LinkedIn ↗</a>
          </div>
        </div>
        <div>
          <div className="mono text-xs text-[#5a5a60] tracking-[.08em]">{t.footer.nav}</div>
          <div className="flex flex-col gap-[11px] mt-[18px]">
            {sections.map((s) => (
              <a key={s.id} href={s.href} data-hov className="hm-link-mono text-sm text-[#d4d4d2]">{s.label}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="mono text-xs text-[#5a5a60] tracking-[.08em]">{t.footer.contact}</div>
          <a href={`mailto:${t.footer.email}`} data-hov className="hm-link-mono block mt-[18px] text-sm text-[#d4d4d2]">{t.footer.email}</a>
          <a href="#contacto" data-hov data-magnetic className="inline-flex mt-5 px-5 py-[11px] rounded-[10px] text-sm font-semibold text-[#0A0A0B] bg-[#FAFAF9]">{t.contactMe}</a>
        </div>
      </div>
      <div className="mono hm-pad-x py-6 border-t border-white/[.06] text-xs text-[#5a5a60] flex justify-between flex-wrap gap-2.5">
        <span>© 2026 Edinson Nuñez More</span>
        <span>{t.footer.made}</span>
      </div>
    </footer>
  );
}
