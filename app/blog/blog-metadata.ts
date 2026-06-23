import type { Metadata } from "next";

const SITE_URL = "https://edi-developer.dev";
/** Imagen OG por defecto cuando un blog aún no tiene la suya. */
const DEFAULT_OG_IMAGE = "/brand/og.jpg?v=2026";

interface BlogMetadataInput {
  title: string;
  description: string;
  slug: string;
  /** Ruta de la imagen para compartir (Open Graph / Twitter). Ej: "/blog/mi-post.png" */
  image?: string;
}

/**
 * Construye los metadatos de un post del blog, incluyendo la imagen que se
 * muestra al compartir en redes (Open Graph y Twitter Card).
 */
export function buildBlogMetadata({
  title,
  description,
  slug,
  image,
}: BlogMetadataInput): Metadata {
  const url = `${SITE_URL}/blog/${slug}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Edi Developer",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
