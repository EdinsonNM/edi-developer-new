export interface BlogPost {
  slug: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  date: string;
  category: string;
  /** Imagen de portada / para compartir (Open Graph). */
  image?: string;
  /** Cantidad máxima a mostrar en la sección de inicio (los más relevantes). */
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ingenieria-con-intencion",
    titleEs: "Ingeniería con intención",
    titleEn: "Engineering with intention",
    descriptionEs:
      "Resolver un problema es solo el punto de partida. Una reflexión sobre construir software pensando en la intención y en cómo una experiencia hace sentir a las personas.",
    descriptionEn:
      "Solving a problem is just the starting point. A reflection on building software with intention and on how an experience makes people feel.",
    date: "2026-06",
    category: "Reflexión",
    image: "/blog/ingenieria-con-intencion.png",
    featured: true,
  },
  {
    slug: "ya-no-alcanzan-las-horas",
    titleEs:
      "La extraña sensación de que ya no alcanzan las horas para todas las ideas",
    titleEn:
      "The strange feeling that there aren't enough hours for all the ideas",
    descriptionEs:
      "Una reflexión sobre crear con IA no como producto ni objetivo, sino como compañera de exploración: pasar de '¿cómo construyo esto?' a '¿qué quiero que sienta quien lo use?'.",
    descriptionEn:
      "A reflection on creating with AI not as a product or a goal, but as a companion for exploration: moving from 'how do I build this?' to 'what do I want the person using it to feel?'.",
    date: "2026-06",
    category: "Reflexión",
    image: "/blog/ya-no-alcanzan-las-horas.png",
    featured: true,
  },
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
    image: "/blog/mucha-experiencia-cero-respuestas.png",
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
    image: "/blog/interfaces-que-se-geenran-solas.png",
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
    image: "/cover.png",
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
    image: "/cuentos/Zorrito en la fábrica de programadores.webp",
    featured: false,
  },
];

/** Posts destacados para la sección de inicio (orden: más recientes primero). */
export const featuredBlogPosts = blogPosts
  .filter((p) => p.featured)
  .sort((a, b) => b.date.localeCompare(a.date));
