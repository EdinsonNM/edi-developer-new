"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/presentation/utils/use-i18n";
import "./internal.css";

/**
 * Shell oscuro para páginas internas, alineado al diseño del landing:
 * fondo #0A0A0B, tipografía Space Grotesk, grano/viñeta sutiles, navbar
 * con wordmark + volver + toggle ES/EN, y footer mínimo. Las páginas usan
 * tokens shadcn (bg-card, text-muted-foreground…) que aquí se remapean a la
 * paleta del landing, así heredan el look sin reescribir su markup.
 */
export function InternalLayout({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useI18n();
  const pathname = usePathname();
  const es = language === "es";

  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
  const backHref = isBlogPost ? "/blog" : "/";
  const backLabel = isBlogPost ? "Blog" : es ? "Inicio" : "Home";

  return (
    <div className="internal-dark">
      {/* fondo: personaje con el zorro + velo oscuro para legibilidad */}
      <div className="fixed inset-0 -z-[3] bg-[#0A0A0B] pointer-events-none" />
      <div
        className="fixed inset-0 -z-[2] bg-cover bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/develoer-internal.webp')", backgroundPosition: "center", opacity: 0.5 }}
      />
      <div
        className="fixed inset-0 -z-[1] pointer-events-none"
        style={{ background: "radial-gradient(120% 120% at 62% 28%, rgba(10,10,11,.6), rgba(10,10,11,.9))" }}
      />

      {/* grano + viñeta (sutiles, como en el landing) */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[.04] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(130% 90% at 50% 0%, transparent 55%, rgba(0,0,0,.5) 100%)" }}
      />

      {/* navbar */}
      <nav
        className="sticky top-0 z-[58] flex items-center justify-between py-[18px] px-[clamp(20px,5vw,56px)] backdrop-blur-[12px]"
        style={{ background: "linear-gradient(180deg,rgba(10,10,11,.82),rgba(10,10,11,.35))" }}
      >
        <Link href="/" className="flex items-center gap-[11px] font-semibold tracking-[-.01em] text-base">
          <span className="h-[9px] w-[9px] rounded-[2px] bg-[#FAFAF9]" />
          <span>edi<span className="text-[#6b6b70]">-developer</span><span className="internal-mono text-[#9B9BA1]">.dev</span></span>
        </Link>
        <div className="flex items-center gap-5">
          <Link href={backHref} className="internal-nav-link internal-mono flex items-center gap-2 text-[13px] text-[#9B9BA1]">
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Link>
          <div className="internal-mono flex items-center rounded-full overflow-hidden text-xs border border-white/10">
            <button onClick={() => setLanguage("es")} className={`px-[11px] py-1.5 transition-colors ${es ? "bg-[#FAFAF9] text-[#0A0A0B]" : "bg-transparent text-[#9B9BA1]"}`}>ES</button>
            <button onClick={() => setLanguage("en")} className={`px-[11px] py-1.5 transition-colors ${!es ? "bg-[#FAFAF9] text-[#0A0A0B]" : "bg-transparent text-[#9B9BA1]"}`}>EN</button>
          </div>
        </div>
      </nav>

      <div className="relative z-[2]">{children}</div>

      {/* footer mínimo */}
      <footer className="relative z-[2] mt-20">
        <div className="h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)" }} />
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,56px)] py-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="h-[9px] w-[9px] rounded-[2px] bg-[#FAFAF9]" />
            <span className="tracking-[-.01em]">edi<span className="text-[#6b6b70]">-developer</span><span className="internal-mono text-[#9B9BA1]">.dev</span></span>
          </Link>
          <div className="internal-mono flex items-center gap-5 text-[13px] text-[#9B9BA1]">
            <a href="https://github.com/edinsonnm" target="_blank" rel="noopener noreferrer" className="internal-nav-link">GitHub ↗</a>
            <a href="https://linkedin.com/in/edinsonnm" target="_blank" rel="noopener noreferrer" className="internal-nav-link">LinkedIn ↗</a>
          </div>
          <span className="internal-mono text-xs text-[#5a5a60]">© 2026 Edinson Nuñez More</span>
        </div>
      </footer>
    </div>
  );
}
