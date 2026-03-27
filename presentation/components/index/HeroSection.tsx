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
};

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
      { text: t.heroDescription, cta: "apps" },
    ];
    if (developerDesc) {
      list.push({ text: developerDesc, cta: "fabrica" });
    }
    if (academyDesc) {
      list.push({ text: academyDesc, cta: "academy" });
    }
    return list;
  }, [t.heroDescription, developerDesc, academyDesc]);

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

  const primaryCtaActive = hasRotatingDescription && activeCta === "apps";
  const secondaryCtaActive = hasRotatingDescription && activeCta === "fabrica";

  const showAugmentedBook = showFabricaCta && activeCta === "fabrica";
  const bookAlt = `${t.augmentedProductName} — ${t.augmentedProductTagline}`;

  const descBaseClass =
    "max-w-2xl text-lg leading-relaxed text-slate-700 text-left [text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_22px_rgba(255,255,255,0.7)]";

  const ctaTransition =
    "transition-all duration-700 ease-in-out motion-reduce:transition-none";
  const primaryCtaActiveExtras =
    "shadow-xl shadow-violet-500/25 motion-safe:shadow-violet-500/35";
  const secondaryCtaActiveExtras =
    "shadow-xl shadow-emerald-600/20 motion-safe:shadow-emerald-600/30";
  const ctaDimmedClasses =
    "opacity-[0.72] scale-[0.98] shadow-md motion-reduce:opacity-90 motion-reduce:scale-100";

  return (
    <main
      id="inicio"
      className="relative z-10 flex h-screen flex-col items-center justify-center px-4 pt-20 text-left sm:px-8 lg:px-12"
    >
      <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-white opacity-40 pointer-events-none">
        <HeroVideoBackdrop />
      </div>

      {/* Contenido del Hero: centrado en viewport (márgenes izq/der simétricos); libro al borde derecho del bloque */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-stretch text-left lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-12">
        <div className="flex min-w-0 flex-1 flex-col items-start text-left">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-7xl md:text-6xl mb-6 animate-slide-up text-left">
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
              <span className="text-[40px] text-slate-600 [text-shadow:0_1px_2px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.65)]">
                {t.heroSubtitle}
              </span>
            </>
          ) : null}
        </h1>

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

        {showAugmentedBook ? (
          <div className="mb-8 flex w-full justify-center lg:hidden">
            <div className="w-[210px] sm:w-[230px]">
              <Book3D
                coverImage={AUGMENTED_BOOK_COVER}
                coverImageWebp={AUGMENTED_BOOK_COVER_WEBP}
                alt={bookAlt}
                className="mx-auto max-h-[270px] drop-shadow-md"
              />
            </div>
          </div>
        ) : null}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-4 mb-20 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] w-full sm:w-auto">
          <HeroCtaWithShine
            active={primaryCtaActive}
            shineColor={["#a855f7", "#6366f1", "#22d3ee", "#a855f7"]}
            href="#apps"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#apps");
            }}
            className={`flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-base font-medium text-white hover:bg-slate-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${ctaTransition} ${
              primaryCtaActive ? primaryCtaActiveExtras : ""
            } ${
              hasRotatingDescription && !primaryCtaActive
                ? ctaDimmedClasses
                : ""
            } shadow-lg shadow-slate-900/20`}
            aria-current={primaryCtaActive ? "true" : undefined}
            aria-label={t.heroCtaPrimary}
          >
            <span>{t.heroCtaPrimary}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </HeroCtaWithShine>
          {showFabricaCta ? (
            <HeroCtaWithShine
              active={secondaryCtaActive}
              shineColor={["#34d399", "#10b981", "#059669", "#34d399"]}
              href="#fabrica-programadores"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#fabrica-programadores");
              }}
              className={`flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-slate-900 border border-slate-200 hover:bg-slate-50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${ctaTransition} ${
                secondaryCtaActive ? secondaryCtaActiveExtras : ""
              } ${
                hasRotatingDescription && !secondaryCtaActive
                  ? ctaDimmedClasses
                  : ""
              } border-gray-300 hover:bg-gray-100`}
              aria-current={secondaryCtaActive ? "true" : undefined}
              aria-label={t.heroCtaSecondary}
            >
              {t.heroCtaSecondary}
            </HeroCtaWithShine>
          ) : null}
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
