import { useMemo } from "react";
import { useI18n } from "@/presentation/utils/use-i18n";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { blogPosts } from "@/app/blog/data";

export type Lang = "es" | "en";

/** Etiquetas de categoría (ES/EN) para las cards de blog del landing. */
const BLOG_CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  Reflexión: { es: "REFLEXIÓN", en: "REFLECTION" },
  Investigación: { es: "INVESTIGACIÓN", en: "RESEARCH" },
  Libro: { es: "LIBRO", en: "BOOK" },
  "Cuento infantil": { es: "CUENTO", en: "STORY" },
};

/** Los 3 blogs más recientes, derivados de la fuente única (app/blog/data). */
function latestBlogPosts(es: boolean) {
  return [...blogPosts]
    .sort((a, b) => (b.date > a.date ? 1 : -1))
    .slice(0, 3)
    .map((p) => {
      const label =
        BLOG_CATEGORY_LABELS[p.category]?.[es ? "es" : "en"] ??
        p.category.toUpperCase();
      return {
        cat: `// ${label}`,
        href: `/blog/${p.slug}`,
        meta: p.date.split("-")[0],
        img: p.image ?? "/brand/og.jpg?v=2026",
        title: es ? p.titleEs : p.titleEn,
      };
    });
}

export interface SectionRef {
  id: string;
  num: string;
  label: string;
  href: string;
}

/**
 * Contenido del landing (ES/EN) co-localizado y tipado.
 * El idioma activo se toma del sistema i18n global (useI18n) para que el
 * toggle del navbar sea consistente y persistente en toda la app.
 */
export function buildHomeContent(lang: Lang) {
  const es = lang === "es";

  const t = {
    contactMe: es ? "Contáctame" : "Contact me",
    hero: {
      eyebrow: "// FRONTEND · IA · 3D",
      line1: es ? "Construyo" : "I build",
      line2: es ? "productos con" : "products with",
      accent: es ? "inteligencia artificial" : "artificial intelligence",
      lead: es
        ? "Especialista en frontend, gráficos 3D e IA aplicada. Más de 14 años creando productos y soluciones para personas y marcas globales."
        : "Frontend specialist, 3D graphics and applied AI. Over 14 years creating products and solutions for people and global brands.",
      cta1: es ? "Ver mis productos" : "See my products",
      cta2: es ? "Trabajemos juntos" : "Let's work together",
      readout: es
        ? [
            { k: "EXPERIENCIA", v: "14+ años" },
            { k: "FOCO", v: "Frontend · IA · 3D" },
            { k: "PRODUCTOS", v: "Apps en vivo" },
            { k: "BASE", v: "Lima, Perú" },
          ]
        : [
            { k: "EXPERIENCE", v: "14+ years" },
            { k: "FOCUS", v: "Frontend · AI · 3D" },
            { k: "PRODUCTS", v: "Live apps" },
            { k: "BASED IN", v: "Lima, Peru" },
          ],
      scroll: "SCROLL",
    },
    products: {
      eyebrow: es ? "PRODUCTOS · IA" : "PRODUCTS · AI",
      title: es ? "Productos que estoy construyendo con IA" : "Products I'm building with AI",
      moreComing: es ? "// MÁS EN CAMINO" : "// MORE COMING",
      moreComingSub: es ? "Nuevas herramientas y experimentos en desarrollo." : "New tools and experiments in the works.",
      items: [
        {
          n: 1, name: "Khipu", url: "https://khipu-landing-production.up.railway.app/es", tag: "AI · INFRAESTRUCTURA",
          badges: [es ? "En vivo" : "Live", es ? "Empresas" : "Enterprise"],
          tagline: es ? "Infraestructura de IA para empresas peruanas." : "AI infrastructure for Peruvian companies.",
          desc: es
            ? "Un solo gateway compatible con OpenAI para rutear entre OpenAI, Anthropic, Gemini, Groq y proveedores locales — con contratos, soporte y facturación en Perú."
            : "A single OpenAI-compatible gateway to route across OpenAI, Anthropic, Gemini, Groq and local providers — with contracts, support and billing in Peru.",
          link: es ? "Visitar Khipu" : "Visit Khipu",
        },
        {
          n: 2, name: "Slaim", url: "https://slaim.vercel.app", tag: "AI · PRESENTACIONES",
          badges: [es ? "En vivo" : "Live", es ? "Gratis" : "Free"],
          tagline: es ? "De idea a presentación lista en minutos." : "From idea to a finished deck in minutes.",
          desc: es
            ? "Genera contenido, estructura y notas para tus presentaciones automáticamente usando IA."
            : "Generates content, structure and speaker notes for your presentations automatically using AI.",
          link: es ? "Abrir Slaim" : "Open Slaim",
        },
        {
          n: 3, name: "Emotional AI", url: "https://emotional-ai.app", tag: "AI · ASISTENTE",
          badges: [es ? "En vivo" : "Live", "Experimental"],
          tagline: es ? "Tu negocio con rostro y voz." : "Your business with a face and a voice.",
          desc: es
            ? "Consultas y cuestionarios con un asistente que se siente cercano. Conecta MCP y responde con lo que ya tienes en sistemas internos."
            : "Queries and quizzes with an assistant that feels close. Connects MCP and answers with what you already have in internal systems.",
          link: es ? "Conocer Emotional AI" : "Meet Emotional AI",
        },
        {
          n: 4, name: "Zypher", url: "https://app-zypher.netlify.app", tag: "AI · EDUCACIÓN",
          badges: [es ? "En vivo" : "Live"],
          tagline: es ? "Agenda escolar inteligente para padres y colegios." : "A smart school agenda for parents and schools.",
          desc: es
            ? "Organiza tareas, comunicados y el día a día escolar en un solo lugar, potenciado con IA."
            : "Organize tasks, announcements and daily school life in one place, powered by AI.",
          link: es ? "Abrir Zypher" : "Open Zypher",
        },
        {
          n: 5, name: "Yaqu", url: "https://yaqu-app-frontend-production.up.railway.app/", tag: "AI · AGRICULTURA",
          badges: [es ? "En vivo" : "Live", es ? "Juntas de usuarios" : "Water user boards"],
          tagline: es ? "Gestión de riego agrícola para juntas de usuarios." : "Agricultural irrigation management for water user boards.",
          desc: es
            ? "Software para que las juntas de usuarios planifiquen y controlen el riego de cultivos, optimizando el uso del agua en el campo."
            : "Software for water user boards to plan and control crop irrigation, optimizing water use in the field.",
          link: es ? "Abrir Yaqu" : "Open Yaqu",
        },
      ],
    },
    resources: {
      eyebrow: es ? "RECURSOS" : "RESOURCES",
      title: es ? "Recursos y productos para aprender y construir con IA" : "Resources and products to learn and build with AI",
      items: [
        {
          name: es ? "El Programador Aumentado" : "The Augmented Programmer",
          tag: es ? "Producto" : "Product", kind: es ? "LIBRO" : "BOOK",
          cover: "/cover.png", href: "/blog/el-programador-aumentado",
          desc: es
            ? "Cómo desarrollar software con IA sin perder el control: delegación con criterio, revisión de resultados y control de arquitectura."
            : "How to develop software with AI without losing control: delegating with judgment, reviewing results and owning the architecture.",
          cta: es ? "Ver libro" : "View book",
        },
        {
          name: es ? "Fábrica de Programadores" : "Programmer Factory",
          tag: es ? "Gratis" : "Free", kind: es ? "CUENTO" : "STORY",
          cover: "/cuentos/Zorrito en la fábrica de programadores.webp", href: "/blog/fabrica-de-programadores",
          desc: es
            ? "Un cuento ilustrado que acerca la programación a los niños con humor y ternura. Léelo en la web o descarga el PDF sin coste."
            : "An illustrated story that brings programming closer to kids with humor and warmth. Read online or download the free PDF.",
          cta: es ? "Leer cuento" : "Read story",
        },
      ],
    },
    about: {
      eyebrow: es ? "SOBRE MÍ" : "ABOUT",
      titlePre: es ? "No solo desarrollo:" : "Not just code:",
      titleGrad: es ? "construyo producto" : "I build product",
      p1: es
        ? "Soy Edinson Nuñez. Combino frontend, IA aplicada y visión de producto para crear cosas que la gente usa de verdad — no solo demos."
        : "I'm Edinson Nuñez. I blend frontend, applied AI and product vision to make things people actually use — not just demos.",
      p2: es
        ? "Mi diferencia: código que escala, ideas que enseñan y un ecosistema en crecimiento de apps, contenido y comunidad alrededor de la IA."
        : "My edge: code that scales, ideas that teach, and a growing ecosystem of apps, content and community around AI.",
      stack: ["React", "Angular", "NestJS", "Node", "Supabase", "Three.js", "WebGL", "LLMs"],
      terminal: {
        title: "ask-edi · ai",
        comment: es ? "pregúntale a la IA sobre mí" : "ask the AI about me",
        chips: es
          ? ["¿Qué stack usa?", "¿Hace mentorías?", "¿Proyectos con 3D?"]
          : ["What stack?", "Does he mentor?", "3D projects?"],
        placeholder: es ? "escribe tu pregunta…" : "type your question…",
        aria: es ? "Pregúntale a la IA sobre Edi" : "Ask the AI about Edi",
        sendAria: es ? "Enviar pregunta" : "Send question",
        thinking: es ? "pensando" : "thinking",
        noResponse: es ? "Sin respuesta." : "No response.",
        connError: es ? "Error de conexión. Intenta de nuevo." : "Connection error. Try again.",
      },
    },
    services: {
      eyebrow: es ? "QUÉ HAGO" : "WHAT I DO",
      title: es ? "Cómo puedo ayudarte" : "How I can help you",
      lead: es
        ? "Combino desarrollo, IA aplicada y producto para construir herramientas y experiencias reales."
        : "I blend development, applied AI and product to build real tools and experiences.",
      items: [
        { n: 1, title: es ? "Soluciones con IA" : "AI Solutions", desc: es ? "Apps inteligentes, asistentes conversacionales, agentes, análisis de datos y automatización." : "Smart apps, conversational assistants, agents, data analysis and automation." },
        { n: 2, title: es ? "Arquitectura & Desarrollo" : "Architecture & Development", desc: es ? "Sistemas escalables con React, Angular, NestJS, Node, Supabase y arquitecturas limpias." : "Scalable systems with React, Angular, NestJS, Node, Supabase and clean architectures." },
        { n: 3, title: es ? "Experiencias 3D & Visuales" : "3D & Visual Experiences", desc: es ? "React Three Fiber, WebGL, animaciones, mundos interactivos y visualizaciones técnicas." : "React Three Fiber, WebGL, animation, interactive worlds and technical visualizations." },
        { n: 4, title: es ? "Educación & Workshops" : "Education & Workshops", desc: es ? "Charlas, mentoría y formación en IA y programación moderna para estudiantes y equipos." : "Talks, mentoring and training in AI and modern programming for students and teams." },
        { n: 5, title: es ? "Producto & Innovación" : "Product & Innovation", desc: es ? "Diseño de experiencias, prototipos funcionales, estrategia tecnológica y visión técnica." : "Experience design, working prototypes, tech strategy and technical vision." },
      ],
    },
    talks: {
      eyebrow: es ? "CHARLAS · WORKSHOPS" : "TALKS · WORKSHOPS",
      title: es ? "Comparto lo que aprendo en charlas y talleres" : "I share what I learn in talks and workshops",
      cta: es ? "Invítame a dar una charla" : "Invite me to speak",
      topics: es
        ? ["IA para desarrolladores", "Storytelling técnico", "Ingeniería de software moderna", "3D con React Three Fiber", "Innovación educativa", "Tecnología con propósito"]
        : ["AI for developers", "Technical storytelling", "Modern software engineering", "3D with React Three Fiber", "Educational innovation", "Technology with purpose"],
    },
    blog: {
      eyebrow: "BLOG",
      title: es ? "Notas y artículos" : "Notes and articles",
      all: es ? "Ver todos" : "View all",
      url: "/blog",
      posts: latestBlogPosts(es),
    },
    academy: {
      eyebrow: "EDI ACADEMY",
      titlePre: es ? "Formación especializada en" : "Specialized training in",
      titleAccent: "IA",
      lead: es
        ? "Rutas prácticas de IA para distintos perfiles: del aula al código y a los equipos que quieren adoptar IA con criterio."
        : "Practical AI tracks for different profiles: from the classroom to code to teams adopting AI with judgment.",
      cta: es ? "Explorar Edi Academy" : "Explore Edi Academy",
      url: "https://edi-academy.lovable.app/",
      metrics: [
        { n: "14+", count: "14", label: es ? "AÑOS DE EXPERIENCIA" : "YEARS OF EXPERIENCE" },
        { n: "100%", count: "100", label: es ? "PRÁCTICO" : "HANDS-ON" },
        { n: "IA", count: "", label: es ? "ASISTENTE" : "ASSISTANT" },
      ],
      cols: [
        { label: es ? "EDUCADORES" : "EDUCATORS", aud: es ? "Docentes" : "Teachers", desc: es ? "Actualiza tu metodología: diseña cursos, evalúa estudiantes y crea contenido con IA generativa." : "Modernize your method: design courses, assess students and create content with generative AI." },
        { label: es ? "PROGRAMADORES" : "DEVELOPERS", aud: es ? "Desarrolladores" : "Developers", desc: es ? "Domina Cursor, VS Code + Copilot y técnicas de prompting para código." : "Master Cursor, VS Code + Copilot and prompting techniques for code." },
        { label: es ? "CORPORATIVO" : "CORPORATE", aud: es ? "Empresas" : "Companies", desc: es ? "Capacitación para equipos. Optimiza flujos de trabajo con IA, con criterio." : "Team training. Optimize workflows with AI, with judgment." },
      ],
    },
    contact: {
      eyebrow: es ? "CONTACTO" : "CONTACT",
      titlePre: es ? "¿Tienes una idea?" : "Got an idea?",
      titleGrad: es ? "Trabajemos juntos" : "Let's work together",
      lead: es
        ? "Cuéntame sobre tu proyecto, colaboración o charla usando el formulario."
        : "Tell me about your project, collaboration or talk using the form below.",
      form: {
        name: es ? "Nombre" : "Name", namePh: es ? "Tu nombre" : "Your name",
        email: "Email", emailPh: es ? "tu@email.com" : "you@email.com",
        msg: es ? "Mensaje" : "Message", msgPh: es ? "Cuéntame sobre tu proyecto o idea…" : "Tell me about your project or idea…",
        send: es ? "Enviar mensaje" : "Send message",
        sending: es ? "Enviando…" : "Sending…",
        success: es ? "¡Mensaje enviado! Te responderé pronto." : "Message sent! I'll get back to you soon.",
        error: es
          ? "No se pudo enviar. Intenta de nuevo o escríbeme desde el enlace del pie de página."
          : "Could not send. Try again or use the email link in the footer.",
      },
    },
    footer: {
      tag: es ? "Construyendo futuro con tecnología y propósito." : "Building the future with technology and purpose.",
      nav: es ? "NAVEGACIÓN" : "NAVIGATION",
      contact: es ? "CONTACTO" : "CONTACT",
      made: es ? "Hecho con código y café · Lima, PE" : "Made with code and coffee · Lima, PE",
      email: CONTACT_EMAIL,
      github: "https://github.com/edinsonnm",
      linkedin: "https://linkedin.com/in/edinsonnm",
    },
  };

  const sections: SectionRef[] = (
    [
      ["inicio", "01", es ? "Inicio" : "Home"],
      ["productos", "02", es ? "Productos" : "Products"],
      ["recursos", "03", es ? "Recursos" : "Resources"],
      ["sobre", "04", es ? "Sobre mí" : "About"],
      ["servicios", "05", es ? "Qué hago" : "What I do"],
      ["charlas", "06", es ? "Charlas" : "Talks"],
      ["blog", "07", "Blog"],
      ["academy", "08", "Academy"],
      ["contacto", "09", es ? "Contacto" : "Contact"],
    ] as const
  ).map(([id, num, label]) => ({ id, num, label, href: "#" + id }));

  return { t, sections };
}

export type HomeContent = ReturnType<typeof buildHomeContent>;

/** Hook: contenido localizado + control de idioma desde el i18n global. */
export function useHomeContent() {
  const { language, setLanguage } = useI18n();
  const lang: Lang = language === "en" ? "en" : "es";
  const content = useMemo(() => buildHomeContent(lang), [lang]);
  return { lang, setLanguage, ...content };
}
