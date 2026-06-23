import Image from "next/image";
import { getBlogPostImage } from "@/app/blog/data";
import { ShareButtons } from "./ShareButtons";

type BlogPostHeaderProps = {
  slug: string;
  title: string;
  category: string;
  image?: string;
};

export function BlogPostHeader({ slug, title, category, image }: BlogPostHeaderProps) {
  const cover = encodeURI(getBlogPostImage(slug, image));

  return (
    <header className="mb-10">
      <div className="relative -mx-6 min-h-[min(88vw,420px)] overflow-hidden rounded-[16px] border border-white/[.08] bg-[#101012] md:-mx-10 md:min-h-[440px] md:rounded-[20px]">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 896px"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,11,.35) 0%, rgba(10,10,11,.2) 35%, rgba(10,10,11,.82) 72%, rgba(10,10,11,.96) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-[clamp(20px,4vw,36px)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9B9BA1]">
            Blog · {category}
          </p>
          <h1 className="mt-2 max-w-[min(100%,42rem)] text-[clamp(28px,5vw,48px)] font-bold leading-[1.05] tracking-[-.02em] text-[#FAFAF9] [text-wrap:balance]">
            {title}
          </h1>
          <ShareButtons slug={slug} title={title} variant="header" className="mt-5" />
        </div>
      </div>
    </header>
  );
}
