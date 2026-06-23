"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";
import { cn } from "@/lib/utils";

const SITE_URL = "https://edi-developer.dev";

/**
 * Botones para compartir un artículo del blog. Usa la Web Share API nativa
 * cuando está disponible (móvil) y, además, ofrece accesos directos a redes
 * y "copiar enlace" como alternativa universal.
 */
export function ShareButtons({
  slug,
  title,
  variant = "footer",
  className,
}: {
  slug: string;
  title: string;
  variant?: "header" | "footer";
  className?: string;
}) {
  const { language } = useI18n();
  const es = language === "es";
  const [copied, setCopied] = useState(false);

  const url = `${SITE_URL}/blog/${slug}`;
  const eUrl = encodeURIComponent(url);
  const eText = encodeURIComponent(title);

  const networks = [
    { name: "X", href: `https://twitter.com/intent/tweet?text=${eText}&url=${eUrl}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${eUrl}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${eText}%20${eUrl}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${eUrl}` },
  ];

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* el usuario canceló — sin acción */
      }
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible — sin acción */
    }
  };

  const itemClass =
    "internal-mono inline-flex items-center gap-2 rounded-full border border-white/[.12] px-3.5 py-2 text-[13px] text-[#9B9BA1] transition-colors hover:border-white/[.28] hover:text-[#FAFAF9]";

  const compactClass =
    "internal-mono inline-flex items-center gap-1.5 rounded-full border border-white/[.12] px-3 py-1.5 text-[12px] text-[#9B9BA1] transition-colors hover:border-white/[.28] hover:text-[#FAFAF9]";

  const buttons = (
    <>
      <button
        type="button"
        onClick={nativeShare}
        className={variant === "header" ? compactClass : `${itemClass} sm:hidden`}
        aria-label={es ? "Compartir" : "Share"}
      >
        <Share2 className="h-3.5 w-3.5" aria-hidden />
        {es ? "Compartir" : "Share"}
      </button>

      {networks.map((n) => (
        <a
          key={n.name}
          href={n.href}
          target="_blank"
          rel="noopener noreferrer"
          className={variant === "header" ? compactClass : itemClass}
          aria-label={es ? `Compartir en ${n.name}` : `Share on ${n.name}`}
        >
          {n.name}
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        className={variant === "header" ? compactClass : itemClass}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
        ) : (
          <Link2 className="h-3.5 w-3.5" aria-hidden />
        )}
        {copied
          ? es
            ? "Enlace copiado"
            : "Link copied"
          : es
            ? "Copiar enlace"
            : "Copy link"}
      </button>
    </>
  );

  if (variant === "header") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {buttons}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3 border-t border-white/[.08] pt-7", className)}>
      <span className="internal-mono text-[11px] tracking-[.14em] text-[#5a5a60]">
        {es ? "// COMPARTIR" : "// SHARE"}
      </span>
      <div className="flex flex-wrap items-center gap-2.5">{buttons}</div>
    </div>
  );
}
