"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/presentation/utils/use-i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const SLAIM_VIDEO_SRC = "/apps/slaim.mp4";
const SLAIM_VIDEO_POSTER = "/apps/slaim-apps.jpg";
const EMOTIONAL_AI_VIDEO_SRC = "/apps/emotional-ai.mp4";
const EMOTIONAL_AI_VIDEO_POSTER = "/apps/emotional-ai.png";

function AppVideoBackdrop({
  videoSrc,
  posterSrc,
}: {
  videoSrc: string;
  posterSrc: string;
}) {
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
      <div className="absolute inset-0">
        <img
          src={posterSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
      />
    </div>
  );
}

export function AppsSection() {
  const { t, language } = useI18n();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const snapCount = carouselApi?.scrollSnapList().length ?? 2;

  const onCarouselSelect = useCallback((api: CarouselApi | undefined) => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const handler = () => onCarouselSelect(carouselApi);
    onCarouselSelect(carouselApi);
    carouselApi.on("select", handler);
    return () => {
      carouselApi.off("select", handler);
    };
  }, [carouselApi, onCarouselSelect]);

  const goToLabel =
    language === "es" ? "Ir a la aplicación" : "Go to app";

  return (
    <section
      id="apps"
      className="relative z-10 py-28 px-4 md:px-6 overflow-hidden"
      aria-labelledby="apps-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50/40 to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/4 rounded-full blur-3xl" />
        <div className="absolute top-[70%] right-0 w-[500px] h-[400px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h2
            id="apps-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl max-w-2xl mx-auto mb-4"
          >
            {t.appsSectionTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.appsSectionSubtitle}
          </p>
        </header>

        <div className="relative mx-auto max-w-5xl">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {/* Slaim — video de fondo */}
              <CarouselItem className="pl-2 md:pl-4 basis-full">
                <div
                  className="relative overflow-hidden rounded-2xl min-h-[480px] md:min-h-[500px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_50px_-12px_rgba(0,0,0,0.35)]"
                  aria-label={`${t.slaimTitle}: ${t.slaimTagline}`}
                >
                  <AppVideoBackdrop
                    videoSrc={SLAIM_VIDEO_SRC}
                    posterSrc={SLAIM_VIDEO_POSTER}
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/55 to-slate-950/25 md:bg-linear-to-r md:from-slate-950/92 md:via-slate-950/45 md:to-slate-950/10 pointer-events-none"
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-col justify-end md:justify-center min-h-[480px] md:min-h-[500px] p-8 md:p-10 lg:p-12 md:grid md:grid-cols-2 md:gap-10 md:items-center">
                    <div className="space-y-5 text-center md:text-left max-w-lg mx-auto md:mx-0 md:max-w-none">
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="inline-flex items-center rounded-full bg-white/15 text-emerald-100 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium">
                          {t.badgeLive}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/10 text-slate-100 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs font-medium">
                          {t.badgeFree}
                        </span>
                      </div>
                      <p className="text-sm font-semibold tracking-wide text-emerald-200/90">
                        {t.slaimTitle}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                        {t.slaimTagline}
                      </h3>
                      <p className="text-lg text-slate-200/95 leading-relaxed">
                        {t.slaimDescription}
                      </p>
                      <ul className="text-base text-slate-200/95 space-y-2 text-left list-none pl-0 mx-auto md:mx-0 max-w-lg">
                        {t.slaimBullets.map((line) => (
                          <li key={line} className="flex gap-2.5">
                            <span
                              className="text-emerald-300 shrink-0 select-none"
                              aria-hidden
                            >
                              •
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href={t.slaimHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-emerald-300 font-semibold hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg px-1 md:-ml-1 transition-colors"
                          aria-label={t.slaimCta}
                        >
                          {t.slaimCta}
                          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="hidden md:block" aria-hidden />
                  </div>
                </div>
              </CarouselItem>

              {/* Emotional AI — video de fondo */}
              <CarouselItem
                className="pl-2 md:pl-4 basis-full"
                id="emotional-ai"
              >
                <div
                  className="relative overflow-hidden rounded-2xl min-h-[420px] md:min-h-[440px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_50px_-12px_rgba(0,0,0,0.35)] scroll-mt-28"
                  aria-label={t.emotionalAiTitle}
                >
                  <AppVideoBackdrop
                    videoSrc={EMOTIONAL_AI_VIDEO_SRC}
                    posterSrc={EMOTIONAL_AI_VIDEO_POSTER}
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-violet-950/95 via-violet-950/60 to-violet-950/30 md:bg-linear-to-r md:from-violet-950/92 md:via-violet-950/48 md:to-violet-950/12 pointer-events-none"
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-col justify-end md:justify-center min-h-[420px] md:min-h-[440px] p-8 md:p-10 lg:p-12 md:grid md:grid-cols-2 md:gap-10 md:items-center">
                    <div className="space-y-5 text-center md:text-left max-w-lg mx-auto md:mx-0 md:max-w-none">
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="inline-flex items-center rounded-full bg-white/15 text-violet-100 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium">
                          {t.badgeLive}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/10 text-violet-50/95 backdrop-blur-sm border border-white/15 px-3 py-1 text-xs font-medium">
                          {t.badgeExperimental}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                        {t.emotionalAiTitle}
                      </h3>
                      <p className="text-lg text-violet-50/95 leading-relaxed">
                        {t.emotionalAiDescription}
                      </p>
                      <div>
                        <Link
                          href={t.emotionalAiHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-violet-200 font-semibold hover:text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-400/80 focus:ring-offset-2 focus:ring-offset-violet-950 rounded-lg px-1 md:-ml-1 transition-colors"
                          aria-label={t.emotionalAiCta}
                        >
                          {t.emotionalAiCta}
                          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                        </Link>
                      </div>
                    </div>
                    <div className="hidden md:block" aria-hidden />
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* Indicadores */}
          <div
            className="flex justify-center gap-2 mt-10"
            role="tablist"
            aria-label={
              language === "es" ? "Seleccionar aplicación" : "Select app"
            }
          >
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={currentSlide === i}
                aria-label={`${goToLabel} ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
                  currentSlide === i
                    ? "w-8 bg-slate-800"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                )}
                onClick={() => carouselApi?.scrollTo(i)}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-slate-200/60">
          <p className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden />
            <span>{t.moreToolsComing}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
