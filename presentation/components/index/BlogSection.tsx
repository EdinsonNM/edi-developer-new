"use client";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/presentation/utils/use-i18n";
import { featuredBlogPosts } from "@/app/blog/data";

export function BlogSection() {
  const { t, language } = useI18n();
  const posts = featuredBlogPosts.slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="relative z-10 py-24 px-4 md:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            {t.blogSectionTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t.blogSectionSubtitle}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-md hover:border-slate-300"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {post.category}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {language === "es" ? post.titleEs : post.titleEn}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {language === "es" ? post.descriptionEs : post.descriptionEn}
              </p>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100"
              >
                <Link href={`/blog/${post.slug}`}>
                  {language === "es" ? "Leer más" : "Read more"}
                  <BookOpen className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-base"
          >
            <Link href="/blog">{t.viewAllPosts}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
