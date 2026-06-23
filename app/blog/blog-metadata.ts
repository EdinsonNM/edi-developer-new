import type { Metadata } from "next";

const SITE_URL = "https://edi-developer.dev";

interface BlogMetadataInput {
  title: string;
  description: string;
  slug: string;
  /**
   * Override opcional de la imagen para compartir. Por defecto se usa la
   * versión optimizada generada por convención: `/blog/<slug>-og.jpg`
   * (1200px de ancho, JPG ligero < 300 KB para que el preview cargue en
   * todas las redes, incluido WhatsApp).
   */
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
  const ogImage = image ?? `/blog/${slug}-og.jpg`;

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
      images: [{ url: ogImage, alt: title }],
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
