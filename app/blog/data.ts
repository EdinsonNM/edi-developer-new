export interface BlogPost {
  slug: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  date: string;
  category: string;
  /** Cantidad máxima a mostrar en la sección de inicio (los más relevantes). */
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "buscar-trabajo-en-2026",
    titleEs:
      "Mucha experiencia, cero respuestas: lo que nadie te dice sobre buscar trabajo en 2026",
    titleEn:
      "Lots of experience, zero replies: what nobody tells you about job hunting in 2026",
    descriptionEs:
      "Reflexión sobre buscar trabajo en 2026: mercados cambiantes, procesos largos, inglés intermedio y la decisión de evolucionar con IA y proyectos como Gravion.",
    descriptionEn:
      "Reflection on job hunting in 2026: changing markets, long processes, intermediate English, and the decision to evolve with AI and projects like Gravion.",
    date: "2026-02",
    category: "Reflexión",
    featured: true,
  },
  {
    slug: "interfaces-generativas-llm",
    titleEs: "Interfaces que se generan solas: el futuro de la UX con LLMs",
    titleEn: "Interfaces that generate themselves: the future of UX with LLMs",
    descriptionEs:
      "Generative UI: cómo los LLMs están cambiando la UX. Investigación sobre widgets dinámicos, Widget Registry y oportunidades en Perú y Latinoamérica.",
    descriptionEn:
      "Generative UI: how LLMs are changing UX. Research on dynamic widgets, Widget Registry, and opportunities in Peru and Latin America.",
    date: "2025-01",
    category: "Investigación",
    featured: true,
  },
  {
    slug: "el-programador-aumentado",
    titleEs: "El Programador Aumentado",
    titleEn: "The Augmented Programmer",
    descriptionEs:
      "Deja atrás el vibe coding y adopta un desarrollo asistido por IA con intención, contexto y criterio profesional.",
    descriptionEn:
      "Move beyond vibe coding and adopt AI-assisted development with intention, context, and professional judgment.",
    date: "2024-12",
    category: "Libro",
    featured: true,
  },
  {
    slug: "fabrica-de-programadores",
    titleEs: "Fábrica de Programadores",
    titleEn: "Programmers Factory",
    descriptionEs:
      "Un cuento ilustrado que introduce a los niños al mundo de la programación de manera divertida, tierna y cercana.",
    descriptionEn:
      "An illustrated story that introduces children to the world of programming in a fun, tender, and approachable way.",
    date: "2024-11",
    category: "Cuento infantil",
    featured: false,
  },
];

/** Posts destacados para la sección de inicio (orden: más recientes primero). */
export const featuredBlogPosts = blogPosts
  .filter((p) => p.featured)
  .sort((a, b) => (b.date > a.date ? 1 : -1));
