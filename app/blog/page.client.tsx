"use client";

import Link from "next/link";
import { blogPosts } from "./data";
import { useI18n } from "@/presentation/utils/use-i18n";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogPageClient() {
  const { language } = useI18n();
  const sorted = [...blogPosts].sort((a, b) => (b.date > a.date ? 1 : -1));

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16 text-foreground md:px-10">
      <div className="mb-12">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "es" ? "Volver al inicio" : "Back to home"}
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {language === "es" ? "Blog" : "Blog"}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {language === "es"
            ? "Artículos y reflexiones sobre IA, desarrollo de software, UX e innovación."
            : "Articles and thoughts on AI, software development, UX, and innovation."}
        </p>
      </div>

      <ul className="space-y-6 list-none">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-muted/30"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {post.category}
              </p>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors md:text-2xl">
                {language === "es" ? post.titleEs : post.titleEn}
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">
                {language === "es" ? post.descriptionEs : post.descriptionEn}
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                {language === "es" ? "Leer más" : "Read more"}
                <BookOpen className="ml-1.5 h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
