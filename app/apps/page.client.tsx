"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Monitor, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/presentation/utils/use-i18n";
import { cn } from "@/lib/utils";
import { InternalLayout } from "@/presentation/components/internal/InternalLayout";

function AppBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "live" | "free" | "comingSoon" | "experimental" | "default";
}) {
  const styles: Record<string, string> = {
    live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    free: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    comingSoon: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    experimental: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    default: "bg-white/[.06] text-[#9B9BA1] border-white/[.12]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[variant] ?? styles.default
      )}
    >
      {children}
    </span>
  );
}

export function AppsPageClient() {
  const { t } = useI18n();
  const [slaimImageError, setSlaimImageError] = useState(false);
  const [emotionalAiImageError, setEmotionalAiImageError] = useState(false);

  return (
    <InternalLayout>
      <main className="mx-auto w-full max-w-4xl px-6 py-16 text-foreground md:px-10">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-[#FAFAF9] md:text-5xl">
            {t.appsSectionTitle}
          </h1>
          <p className="mt-3 text-lg text-[#9B9BA1]">{t.appsSectionSubtitle}</p>
        </div>

        <div className="space-y-8">
          {/* Slaim */}
          <Card className="overflow-hidden border-white/[.08]">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
              <div className="relative aspect-video md:aspect-auto md:min-h-[240px] bg-linear-to-br from-white/[.04] to-white/[.01] flex items-center justify-center p-6">
                {!slaimImageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/apps/slaim.png"
                    alt={t.slaimTitle}
                    className="w-full h-full object-cover rounded-lg"
                    onError={() => setSlaimImageError(true)}
                  />
                ) : (
                  <div className="text-[#6b6b70] flex flex-col items-center gap-2">
                    <Monitor className="w-14 h-14" aria-hidden />
                    <span className="text-sm font-medium">{t.slaimTitle}</span>
                  </div>
                )}
              </div>
              <CardContent className="flex flex-col justify-center p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <AppBadge variant="live">{t.badgeLive}</AppBadge>
                  <AppBadge variant="free">{t.badgeFree}</AppBadge>
                </div>
                <p className="text-sm font-semibold text-emerald-300 mb-1">{t.slaimTitle}</p>
                <h2 className="text-2xl font-bold text-[#FAFAF9] mb-2">{t.slaimTagline}</h2>
                <p className="text-[#9B9BA1] mb-4">{t.slaimDescription}</p>
                <ul className="list-none space-y-2 mb-6 text-[#9B9BA1]">
                  {t.slaimBullets.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-emerald-400 shrink-0" aria-hidden>•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="rounded-full w-fit">
                  <Link href={t.slaimHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" aria-label={t.slaimCta}>
                    {t.slaimCta}
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>

          {/* Emotional AI */}
          <Card id="emotional-ai" className="overflow-hidden border-white/[.08] scroll-mt-24">
            <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
              <CardContent className="flex flex-col justify-center p-8 order-2 md:order-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <AppBadge variant="live">{t.badgeLive}</AppBadge>
                  <AppBadge variant="experimental">{t.badgeExperimental}</AppBadge>
                </div>
                <h2 className="text-2xl font-bold text-[#FAFAF9] mb-2">{t.emotionalAiTitle}</h2>
                <p className="text-[#9B9BA1] mb-6">{t.emotionalAiDescription}</p>
                <Button asChild size="lg" className="rounded-full w-fit">
                  <a href={t.emotionalAiHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" aria-label={t.emotionalAiCta}>
                    {t.emotionalAiCta}
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
              </CardContent>
              <div className="relative aspect-video md:aspect-auto md:min-h-[240px] bg-white/[.03] flex items-center justify-center p-6 order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/[.08]">
                {!emotionalAiImageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/apps/emotional-ai.png"
                    alt={t.emotionalAiTitle}
                    className="w-full h-full object-contain max-h-[280px] rounded-lg"
                    onError={() => setEmotionalAiImageError(true)}
                  />
                ) : (
                  <div className="text-[#6b6b70] flex flex-col items-center gap-2">
                    <Monitor className="w-14 h-14" aria-hidden />
                    <span className="text-sm font-medium">{t.emotionalAiTitle}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Placeholder cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-white/[.08] border-dashed bg-white/[.02]">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
                <div className="mb-4">
                  <AppBadge variant="comingSoon">{t.badgeComingSoon}</AppBadge>
                </div>
                <h3 className="font-semibold text-[#FAFAF9] mb-2">{t.placeholderAppTitle}</h3>
                <p className="text-sm text-[#9B9BA1]">{t.placeholderAppDesc}</p>
              </CardContent>
            </Card>
            <Card className="border-white/[.08] border-dashed bg-white/[.02]">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
                <Sparkles className="h-10 w-10 text-[#6b6b70] mb-4" aria-hidden />
                <h3 className="font-semibold text-[#FAFAF9] mb-2">{t.moreToolsComing}</h3>
                <p className="text-sm text-[#9B9BA1]">{t.placeholderAppDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </InternalLayout>
  );
}
