"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";
import { Book3D } from "@/presentation/components/index/Book3D";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps } from "react";
const VIDEO_SRC = "/video-landing.mp4";

/** Misma portada que el producto de pago en FabricaProgramadoresSection */
const AUGMENTED_BOOK_COVER = "/cover.png";
const AUGMENTED_BOOK_COVER_WEBP = "/cover.png";

type HeroSlideCta = "apps" | "fabrica" | "academy";

type HeroSlide = {
  text: string;
  cta: HeroSlideCta;
  titleLead: string;
  titleAccent: string;
};

function heroAccentGradientForCta(cta: HeroSlideCta): string {
  switch (cta) {
    case "fabrica":
      return "from-emerald-600 via-teal-600 to-cyan-600";
    case "academy":
      return "from-sky-600 via-blue-600 to-indigo-600";
    default:
      return "from-violet-600 via-blue-600 to-cyan-500";
  }
}

function scrollToSection(selector: string) {
  const element = document.querySelector(selector);
  if (!element) return;
  const offsetTop =
    element.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
  (element as HTMLElement).focus();
}

/** CTA con borde animado (Magic UI) cuando el slide marca prioridad */
function HeroCtaWithShine({
  active,
  shineColor,
  className,
  children,
  ...anchorProps
}: {
  active: boolean;
  shineColor: string | string[];
} & ComponentProps<"a">) {
  return (
    <div
      className={cn(
        "relative inline-flex max-w-full rounded-full",
        active ? "p-[2px]" : "p-0",
      )}
    >
      {active ? (
        <ShineBorder
          borderWidth={2}
          duration={9}
          shineColor={shineColor}
          className="rounded-full"
        />
      ) : null}
      <a className={cn("relative z-10", className)} {...anchorProps}>
        {children}
      </a>
    </div>
  );
}

/** Resalta fragmentos entre *asteriscos* (p. ej. título del libro). */
function HeroDescriptionRich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em
              key={i}
              className="font-semibold not-italic text-slate-900"
            >
              {part.slice(1, -1)}
            </em>
          );
        }
        return part ? <Fragment key={i}>{part}</Fragment> : null;
      })}
    </>
  );
}

function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    const p = el.play();
    if (p !== undefined) p.catch(() => {});
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-white to-slate-50" />
    );
  }

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transform-[translateZ(0)] scale-[1.12]"
          src={VIDEO_SRC}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
        />
      </div>
      {/* Halftone / punto sobre el video */}
      <div
        className="absolute inset-0 z-1 pointer-events-none mix-blend-multiply opacity-[0.42]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(15, 23, 42, 0.22) 2.25px, transparent 2.65px)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />
      {/* Viñeta: bordes fundidos a blanco */}
      <div
        className="absolute inset-0 z-2 pointer-events-none bg-[radial-gradient(ellipse_95%_85%_at_50%_45%,transparent_18%,rgba(255,255,255,0.45)_52%,#ffffff_88%,#ffffff_100%)]"
        aria-hidden
      />
      {/* Refuerzo suave en esquinas (viñeta vintage) */}
      <div
        className="absolute inset-0 z-3 pointer-events-none bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_40%,rgba(255,255,255,0.25)_100%)]"
        aria-hidden
      />
      {/* Degradado izquierdo: oculta el video y mejora lectura del texto alineado a la izquierda */}
      <div
        className="absolute inset-0 z-4 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.88)_18%,rgba(255,255,255,0.45)_42%,transparent_68%)]"
        aria-hidden
      />
    </>
  );
}

const HERO_DESCRIPTION_ROTATE_MS = 10_000;

export function HeroSection() {
  const { t } = useI18n();
  const [descIndex, setDescIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const developerDesc = t.heroDescriptionDeveloper?.trim() ?? "";
  const academyDesc = t.heroDescriptionAcademy?.trim() ?? "";

  const slides = useMemo((): HeroSlide[] => {
    const list: HeroSlide[] = [
      {
        text: t.heroDescription,
        cta: "apps",
        titleLead: t.heroTitleLead,
        titleAccent: t.heroTitleAccent,
      },
    ];
    if (developerDesc) {
      list.push({
        text: developerDesc,
        cta: "fabrica",
        titleLead: t.heroTitleLeadFabrica,
        titleAccent: t.heroTitleAccentFabrica,
      });
    }
    if (academyDesc) {
      list.push({
        text: academyDesc,
        cta: "academy",
        titleLead: t.heroTitleLeadAcademy,
        titleAccent: t.heroTitleAccentAcademy,
      });
    }
    return list;
  }, [
    t.heroDescription,
    t.heroTitleLead,
    t.heroTitleAccent,
    t.heroTitleLeadFabrica,
    t.heroTitleAccentFabrica,
    t.heroTitleLeadAcademy,
    t.heroTitleAccentAcademy,
    developerDesc,
    academyDesc,
  ]);

  const hasRotatingDescription = slides.length > 1;
  const showFabricaCta = slides.some((s) => s.cta === "fabrica");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setDescIndex((i) => Math.min(i, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    if (!hasRotatingDescription || reduceMotion) return;
    const id = window.setInterval(() => {
      setDescIndex((i) => (i + 1) % slides.length);
    }, HERO_DESCRIPTION_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [hasRotatingDescription, reduceMotion, slides.length]);

  const activeDescIndex = reduceMotion ? 0 : descIndex;
  const activeCta = slides[activeDescIndex]?.cta ?? "apps";

  const showAugmentedBook = showFabricaCta && activeCta === "fabrica";
  const bookAlt = `${t.augmentedProductName} — ${t.augmentedProductTagline}`;

  const descBaseClass =
    "max-w-2xl text-base leading-relaxed text-slate-700 text-center sm:text-lg lg:text-left [text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_22px_rgba(255,255,255,0.7)]";

  const ctaTransition =
    "transition-all duration-700 ease-in-out motion-reduce:transition-none";
  const primaryCtaActiveExtras =
    "shadow-xl shadow-violet-500/25 motion-safe:shadow-violet-500/35";
  const secondaryCtaActiveExtras =
    "shadow-xl shadow-emerald-600/20 motion-safe:shadow-emerald-600/30";
  const academyCtaActiveExtras =
    "shadow-xl shadow-sky-500/25 motion-safe:shadow-sky-500/35";

  return (
    <main
      id="inicio"
      className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-16 pt-20 text-center lg:text-left sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-white opacity-40 pointer-events-none">
        <HeroVideoBackdrop />
      </div>

      {/* Contenido del Hero: centrado en viewport (márgenes izq/der simétricos); libro al borde derecho del bloque */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left xl:gap-12">
        <div className="flex min-w-0 flex-1 flex-col items-center text-center lg:items-start lg:text-left">
        {hasRotatingDescription ? (
          <h1 className="animate-slide-up mb-5 grid w-full max-w-2xl min-h-[6.5rem] text-center text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 xs:text-[1.85rem] sm:mb-6 sm:min-h-[9rem] sm:text-5xl md:min-h-[8.5rem] md:text-6xl lg:text-left lg:text-7xl [grid-template-areas:'hero-h1']">
            {slides.map((slide, i) => (
              <div
                key={`${slide.cta}-h1-${i}`}
                className={`col-start-1 row-start-1 m-0 [grid-area:hero-h1] transition-all duration-700 ease-in-out motion-reduce:transition-none ${
                  activeDescIndex === i
                    ? "z-10 translate-y-0 opacity-100"
                    : "pointer-events-none z-0 translate-y-1.5 opacity-0 motion-reduce:translate-y-0"
                }`}
                aria-hidden={activeDescIndex !== i}
              >
                <span className="[text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_28px_rgba(255,255,255,0.75),0_2px_12px_rgba(255,255,255,0.45)]">
                  {slide.titleLead}
                </span>
                <br />
                <span
                  className={cn(
                    "bg-linear-to-r bg-clip-text text-transparent [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.95))_drop-shadow(0_4px_22px_rgba(255,255,255,0.88))]",
                    heroAccentGradientForCta(slide.cta),
                  )}
                >
                  {slide.titleAccent}
                </span>
                {i === 0 && t.heroSubtitle ? (
                  <>
                    {" "}
                    <br />
                    <span className="mt-1 block text-xl text-slate-600 sm:text-2xl md:text-[40px] [text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.65)]">
                      {t.heroSubtitle}
                    </span>
                  </>
                ) : null}
              </div>
            ))}
          </h1>
        ) : (
          <h1 className="mb-5 max-w-2xl animate-slide-up text-center text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 xs:text-[1.85rem] sm:mb-6 sm:text-5xl md:text-6xl lg:text-left lg:text-7xl">
            <span className="[text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_28px_rgba(255,255,255,0.75),0_2px_12px_rgba(255,255,255,0.45)]">
              {t.heroTitleLead}
            </span>
            <br />
            <span className="bg-linear-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.95))_drop-shadow(0_4px_22px_rgba(255,255,255,0.88))]">
              {t.heroTitleAccent}
            </span>
            {t.heroSubtitle ? (
              <>
                {" "}
                <br />
                <span className="mt-1 block text-xl text-slate-600 sm:text-2xl md:text-[40px] [text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.65)]">
                  {t.heroSubtitle}
                </span>
              </>
            ) : null}
          </h1>
        )}

        {hasRotatingDescription ? (
          <div
            className={`mb-10 grid w-full max-w-2xl animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards] [grid-template-areas:'hero-desc'] ${descBaseClass}`}
            aria-live={reduceMotion ? undefined : "polite"}
            aria-atomic="true"
          >
            {slides.map((slide, i) => (
              <p
                key={`${slide.cta}-${i}`}
                className={`col-start-1 row-start-1 m-0 [grid-area:hero-desc] transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                  activeDescIndex === i
                    ? "z-10 opacity-100"
                    : "z-0 opacity-0 pointer-events-none"
                }`}
                aria-hidden={activeDescIndex !== i}
              >
                <HeroDescriptionRich text={slide.text} />
              </p>
            ))}
          </div>
        ) : (
          <p
            className={`mb-10 animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards] ${descBaseClass}`}
          >
            <HeroDescriptionRich text={t.heroDescription} />
          </p>
        )}

        {/* Un solo CTA acorde al slide activo (rotación) o solo apps si hay un único slide */}
        <div
          className={cn(
            "mb-14 flex w-full min-h-[3.25rem] flex-col flex-wrap items-center justify-center gap-3 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] sm:mb-20 lg:justify-start",
            !hasRotatingDescription && "sm:flex-row sm:w-auto",
            hasRotatingDescription && "sm:w-auto",
          )}
        >
          {hasRotatingDescription ? (
            <>
              {activeCta === "apps" ? (
                <HeroCtaWithShine
                  active
                  shineColor={["#a855f7", "#6366f1", "#22d3ee", "#a855f7"]}
                  href="#apps"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#apps");
                  }}
                  className={`flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-base font-medium text-white hover:bg-slate-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${ctaTransition} ${primaryCtaActiveExtras} shadow-lg shadow-slate-900/20`}
                  aria-current="true"
                  aria-label={t.heroCtaPrimary}
                >
                  <span>{t.heroCtaPrimary}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </HeroCtaWithShine>
              ) : null}
              {activeCta === "fabrica" && showFabricaCta ? (
                <HeroCtaWithShine
                  active
                  shineColor={["#34d399", "#10b981", "#059669", "#34d399"]}
                  href="#fabrica-programadores"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#fabrica-programadores");
                  }}
                  className={`flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-medium text-slate-900 hover:bg-gray-100 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${ctaTransition} ${secondaryCtaActiveExtras}`}
                  aria-current="true"
                  aria-label={t.heroCtaSecondary}
                >
                  {t.heroCtaSecondary}
                </HeroCtaWithShine>
              ) : null}
              {activeCta === "academy" ? (
                <HeroCtaWithShine
                  active
                  shineColor={["#0ea5e9", "#6366f1", "#4f46e5", "#0ea5e9"]}
                  href="#edi-academy"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#edi-academy");
                  }}
                  className={`flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-8 py-3.5 text-base font-medium text-slate-900 hover:bg-sky-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${ctaTransition} ${academyCtaActiveExtras}`}
                  aria-current="true"
                  aria-label={t.goToEdiAcademy}
                >
                  <span>{t.goToEdiAcademy}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </HeroCtaWithShine>
              ) : null}
            </>
          ) : (
            <HeroCtaWithShine
              active
              shineColor={["#a855f7", "#6366f1", "#22d3ee", "#a855f7"]}
              href="#apps"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#apps");
              }}
              className={`flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-base font-medium text-white hover:bg-slate-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${ctaTransition} ${primaryCtaActiveExtras} shadow-lg shadow-slate-900/20 sm:w-auto`}
              aria-label={t.heroCtaPrimary}
            >
              <span>{t.heroCtaPrimary}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </HeroCtaWithShine>
          )}
        </div>
        </div>

        {/* Libro 3D escritorio: columna derecha del bloque centrado (sin translate que rompa simetría) */}
        {showFabricaCta ? (
          <div
            className={cn(
              "hidden shrink-0 items-center justify-end transition-all duration-700 ease-in-out motion-reduce:duration-300 lg:flex lg:self-center",
              showAugmentedBook
                ? "w-[min(40vw,310px)] max-w-[310px] opacity-100"
                : "pointer-events-none w-0 max-w-0 overflow-hidden opacity-0",
            )}
            aria-hidden={!showAugmentedBook}
          >
            <div className="w-full max-w-[270px]">
              <Book3D
                coverImage={AUGMENTED_BOOK_COVER}
                coverImageWebp={AUGMENTED_BOOK_COVER_WEBP}
                alt={bookAlt}
                className="max-h-[310px] w-full drop-shadow-md"
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
