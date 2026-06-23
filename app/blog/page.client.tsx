"use client";

import Link from "next/link";
import { blogPosts, type BlogPost } from "./data";
import { useI18n } from "@/presentation/utils/use-i18n";
import { InternalLayout } from "@/presentation/components/internal/InternalLayout";

const FALLBACK_IMAGE = "/brand/og.jpg?v=2026";

/** "2026-06" -> "JUN 2026" / "JUN 2026" (mono, mayúsculas). */
function formatDate(date: string, es: boolean): string {
  const [year, month] = date.split("-");
  const months = es
    ? ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
    : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const m = month ? months[parseInt(month, 10) - 1] : "";
  return [m, year].filter(Boolean).join(" ");
}

export function BlogPageClient() {
  const { language } = useI18n();
  const es = language === "es";
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  const title = (p: BlogPost) => (es ? p.titleEs : p.titleEn);
  const desc = (p: BlogPost) => (es ? p.descriptionEs : p.descriptionEn);
  const readMore = es ? "Leer artículo" : "Read article";

  return (
    <InternalLayout>
    <main className="mx-auto w-full max-w-[1180px] px-[clamp(20px,5vw,56px)] py-[clamp(48px,9vh,110px)]">
      {/* Encabezado */}
      <header className="mb-[clamp(40px,7vh,80px)]">
        <div className="internal-mono mb-4 text-xs tracking-[.14em] text-[#9B9BA1]">
          {"// BLOG"}
        </div>
        <h1 className="text-[clamp(34px,6vw,72px)] font-semibold leading-[.98] tracking-[-.045em] text-[#FAFAF9] [text-wrap:balance]">
          {es ? "Ideas, reflexiones" : "Ideas, reflections"}
          <br />
          <span className="text-[#6b6b70]">
            {es ? "y experimentos con IA" : "and experiments with AI"}
          </span>
        </h1>
        <p className="mt-6 max-w-[56ch] text-base leading-[1.7] text-[#9B9BA1] [text-wrap:pretty]">
          {es
            ? "Artículos sobre IA, desarrollo de software, UX e innovación — y notas más personales sobre el camino de crear."
            : "Articles on AI, software development, UX and innovation — plus more personal notes on the craft of building."}
        </p>
        <div className="internal-mono mt-6 text-xs tracking-[.1em] text-[#5a5a60]">
          {String(sorted.length).padStart(2, "0")} {es ? "ARTÍCULOS" : "ARTICLES"}
        </div>
      </header>

      {/* Artículo destacado */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="hm-blog group mb-8 grid overflow-hidden rounded-[20px] border border-white/[.08] bg-[#101012] md:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#16161a] md:aspect-auto md:min-h-[340px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(featured.image ?? FALLBACK_IMAGE)}
              alt={title(featured)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101012]/70 via-transparent to-transparent md:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center p-[clamp(24px,3.5vw,44px)]">
            <div className="internal-mono mb-5 flex items-center gap-3 text-[11px] tracking-[.1em] text-[#9B9BA1]">
              <span className="rounded-full border border-white/[.14] px-2.5 py-1 uppercase">
                {featured.category}
              </span>
              <span className="text-[#5a5a60]">{formatDate(featured.date, es)}</span>
            </div>
            <h2 className="text-[clamp(24px,3vw,38px)] font-semibold leading-[1.05] tracking-[-.03em] text-[#FAFAF9] transition-colors group-hover:text-white [text-wrap:balance]">
              {title(featured)}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[#9B9BA1] [text-wrap:pretty]">
              {desc(featured)}
            </p>
            <span className="internal-mono mt-7 inline-flex items-center gap-2 text-[13px] text-[#FAFAF9]">
              {readMore}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      )}

      {/* Resto de artículos */}
      <div className="grid gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr))]">
        {rest.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="hm-blog group flex flex-col overflow-hidden rounded-[18px] border border-white/[.08] bg-[#101012]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#16161a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(post.image ?? FALLBACK_IMAGE)}
                alt={title(post)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="internal-mono absolute right-4 top-3 text-[34px] font-semibold leading-none text-white/[.10]">
                {String(i + 2).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-[26px]">
              <div className="internal-mono mb-3 flex items-center gap-3 text-[11px] tracking-[.1em] text-[#9B9BA1]">
                <span className="rounded-full border border-white/[.14] px-2.5 py-1 uppercase">
                  {post.category}
                </span>
                <span className="text-[#5a5a60]">{formatDate(post.date, es)}</span>
              </div>
              <h2 className="text-[20px] font-semibold leading-tight tracking-[-.02em] text-[#FAFAF9] transition-colors group-hover:text-white [text-wrap:balance]">
                {title(post)}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#9B9BA1] line-clamp-3 [text-wrap:pretty]">
                {desc(post)}
              </p>
              <span className="internal-mono mt-auto pt-5 inline-flex items-center gap-2 text-[13px] text-[#FAFAF9]">
                {readMore}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
    </InternalLayout>
  );
}
