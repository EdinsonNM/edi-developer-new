import type { Metadata } from "next";
import { BlogPageClient } from "./page.client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos y reflexiones sobre IA, desarrollo de software, UX e innovación.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
