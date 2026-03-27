"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

// Definir los tipos de traducción
type Language = "es" | "en";

interface Translations {
  // Navbar
  inicio: string;
  recursosDesarrolladores: string;
  sobreMi: string;
  miPodcast: string;
  saas: string;
  charlasYTalleres: string;
  ediAcademy: string;

  // Info Search Page
  saludoAsistente: string;
  descripcionAsistente: string;
  ejemplosPreguntas: string;
  ejemploTimeline: string;
  ejemploHabilidades: string;
  ejemploProyectos: string;
  ejemploExperiencia: string;
  escribeTuPregunta: string;
  escribiendo: string;

  // Timeline instructions
  scrollHorizontal: string;
  ctrlZoom: string;
  hoverDetalles: string;

  // Error messages
  errorCargarDatos: string;
  problemaGrafico: string;

  // Sidebar
  menu: string;
  navegacion: string;
  cerrarMenu: string;
  idiomaLanguage: string;
  abrirMenu: string;

  // Home page
  helloImEdinson: string;
  softwareEngineerTransforms: string;
  yearsBuildingSolutions: string;
  whatWantToKnow: string;
  scheduleOnCalCom: string;

  // Home placeholders
  placeholder1: string;
  placeholder2: string;
  placeholder3: string;
  placeholder4: string;

  // Chat button
  chatWithEdinson: string;
  askMeAnything: string;

  // Developer resources
  recursosTitulo: string;
  recursosIntro: string;
  publicaciones: string;
  ejemplos: string;
  presentaciones: string;
  demosYProyectos: string;
  podcast: string;
  tiktok: string;
  historias: string;

  // Index page - Navigation
  blog: string;
  queHago: string;
  proyectos: string;
  porQueTrabajarConmigo: string;
  charlas: string;
  contacto: string;
  downloadCV: string;

  // Index page - Hero Section
  heroTitleLead: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  /** Titulares solo para 2.ª y 3.ª variante del hero (la 1.ª usa heroTitleLead / heroTitleAccent) */
  heroTitleLeadFabrica: string;
  heroTitleAccentFabrica: string;
  heroTitleLeadAcademy: string;
  heroTitleAccentAcademy: string;
  /** Segunda variante del párrafo (rotación): compra / libro; usa *título* para resaltar */
  heroDescriptionDeveloper: string;
  /** Tercera variante (rotación): Edi Academy; usa *Edi Academy* para resaltar */
  heroDescriptionAcademy: string;
  heroDescription: string;
  contactMe: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  contenido: string;
  apps: string;

  // Index page - About Section
  aboutTitle: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutName: string;
  aboutYears: string;
  aboutStat1: string;
  aboutStat2: string;
  aboutStat3: string;

  // Index page - What I Do Section
  whatIDoTitle: string;
  whatIDoSubtitle: string;
  aiSolutions: string;
  aiSolutionsDesc: string;
  webArchitecture: string;
  webArchitectureDesc: string;
  threeDExperiences: string;
  threeDExperiencesDesc: string;
  educationWorkshops: string;
  educationWorkshopsDesc: string;
  productInnovation: string;
  productInnovationDesc: string;

  // Index page - Apps Section
  appsSectionTitle: string;
  appsSectionSubtitle: string;
  slaimTitle: string;
  slaimTagline: string;
  slaimDescription: string;
  slaimBullets: string[];
  slaimCta: string;
  slaimHref: string;
  emotionalAiTitle: string;
  emotionalAiDescription: string;
  emotionalAiCta: string;
  emotionalAiHref: string;
  badgeLive: string;
  badgeFree: string;
  badgeComingSoon: string;
  badgeExperimental: string;
  moreToolsComing: string;
  placeholderAppTitle: string;
  placeholderAppDesc: string;

  // Index page - Featured Projects Section
  featuredProjectsTitle: string;
  featuredProjectsSubtitle: string;
  neokidsTitle: string;
  neokidsSubtitle: string;
  neokidsDesc: string;
  costproTitle: string;
  costproSubtitle: string;
  costproDesc: string;
  zypherTitle: string;
  zypherSubtitle: string;
  zypherDesc: string;
  yaquTitle: string;
  yaquSubtitle: string;
  yaquDesc: string;
  badgeLiveApp: string;
  badgeFreeTool: string;
  badgeExperiment: string;
  badgeContent: string;
  badgeDemo: string;
  neokidsCta: string;
  costproCta: string;
  zypherCta: string;
  yaquCta: string;

  // Index page - Why Work With Me Section
  whyWorkWithMeTitle: string;
  whyWorkWithMeSubtitle: string;
  yearsExperience: string;
  yearsExperienceDesc: string;
  completeVision: string;
  completeVisionDesc: string;
  clearCommunication: string;
  clearCommunicationDesc: string;
  qualityDelivery: string;
  qualityDeliveryDesc: string;
  humanApproach: string;
  humanApproachDesc: string;

  // Index page - Talks Section
  talksTitle: string;
  talksSubtitle: string;
  topicsITeach: string;
  aiForDevelopers: string;
  technicalStorytelling: string;
  modernSoftwareEngineering: string;
  threeDWithReact: string;
  educationalInnovation: string;
  technologyWithPurpose: string;
  inviteMeToTalk: string;

  // Index page — Recursos y productos (cuento + libro)
  productsSectionTitle: string;
  productsSectionSubtitle: string;
  fabricaProductName: string;
  fabricaProductTagline: string;
  fabricaProductDescription: string;
  augmentedProductName: string;
  augmentedProductTagline: string;
  augmentedProductDescription: string;
  badgeProductFree: string;
  badgeProductPaid: string;
  ctaReadStory: string;
  ctaDownloadFree: string;
  ctaViewBook: string;
  ctaBuyNow: string;

  // Index page - Presentations Section
  presentationsTitle: string;
  presentationsSubtitle: string;
  presentationsSubtitleBold: string;
  viewAllPresentations: string;

  // Index page - Blog Section
  blogSectionTitle: string;
  blogSectionSubtitle: string;
  viewAllPosts: string;

  // Index page - Edi Academy Section
  ediAcademyTitle: string;
  ediAcademyTitleHighlight: string;
  ediAcademyDescription: string;
  ediAcademyProfile1Label: string;
  ediAcademyProfile1Title: string;
  ediAcademyProfile1Desc: string;
  ediAcademyProfile2Label: string;
  ediAcademyProfile2Title: string;
  ediAcademyProfile2Desc: string;
  ediAcademyProfile3Label: string;
  ediAcademyProfile3Title: string;
  ediAcademyProfile3Desc: string;
  ediAcademyMetric1Value: string;
  ediAcademyMetric1Label: string;
  ediAcademyMetric2Value: string;
  ediAcademyMetric2Label: string;
  ediAcademyMetric3Value: string;
  ediAcademyMetric3Label: string;
  ediAcademyButton: string;
  ediAcademyButtonLabel: string;
  goToEdiAcademy: string;

  // Index page - Contact Section
  letsWorkTogether: string;
  contactSubtitle: string;
  contactTitle: string;
  contactDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendButton: string;
  sending: string;
  messageSentSuccess: string;
  messageError: string;

  // Index page - Footer Section
  footerTagline: string;
  footerNavTitle: string;
  footerAppsTitle: string;
  footerContactTitle: string;
}

const translations: Record<Language, Translations> = {
  es: {
    // Navbar
    inicio: "Inicio",
    recursosDesarrolladores: "Recursos para desarrolladores",
    sobreMi: "Sobre mí",
    miPodcast: "Mi Podcast",
    saas: "SaaS",
    charlasYTalleres: "Charlas y talleres",
    ediAcademy: "Edi Academy",

    // Info Search Page
    saludoAsistente: "👋 ¡Hola! Soy el Asistente de Información de Edinson",
    descripcionAsistente:
      "Haz preguntas y explora visualizaciones interactivas sobre Edinson. Descubre datos y respuestas de forma visual y sencilla.",
    ejemplosPreguntas: "💡 Ejemplos de preguntas que puedes hacer:",
    ejemploTimeline: '"Muéstrame su timeline profesional"',
    ejemploHabilidades: '"¿Cuáles son sus habilidades técnicas?"',
    ejemploProyectos: '"Información sobre sus proyectos"',
    ejemploExperiencia: '"Gráfico de su experiencia por años"',
    escribeTuPregunta: "Escribe tu pregunta aquí...",
    escribiendo: "Escribiendo",

    // Timeline instructions
    scrollHorizontal: "💡 Usa scroll horizontal para navegar",
    ctrlZoom: "🔍 Ctrl + rueda del mouse para zoom",
    hoverDetalles: "ℹ️ Hover sobre los puntos para más detalles",

    // Error messages
    errorCargarDatos: "Error al cargar datos",
    problemaGrafico: "Hubo un problema al obtener la información del gráfico.",

    // Sidebar
    menu: "Menú",
    navegacion: "Navegación",
    cerrarMenu: "Cerrar menú",
    idiomaLanguage: "Idioma / Language",
    abrirMenu: "Abrir menú",

    // Home page
    helloImEdinson: "Hola, soy Edinson",
    softwareEngineerTransforms:
      "Diseño productos digitales que cautivan a tus usuarios y generan resultados",
    yearsBuildingSolutions:
      "Especialista en Frontend, gráficos 3D e IA aplicada. Más de 14 años creando soluciones para marcas globales.",
    whatWantToKnow: "¿Qué quieres saber?",
    scheduleOnCalCom: "O agenda una reunión en cal.com",

    // Home placeholders
    placeholder1: "Proyectos, charlas, tecnologías.",
    placeholder2: "Explora mis trabajos.",
    placeholder3: "Experiencia y habilidades.",
    placeholder4: "Agenda una reunión.",

    // Chat button
    chatWithEdinson: "Pregúntale a la IA sobre mí",
    askMeAnything: "Pregúntame lo que quieras",

    // Developer resources
    recursosTitulo: "Recursos para Devs",
    recursosIntro:
      "Explora mis publicaciones, ejemplos de código y presentaciones. Todo categorizado para que encuentres rápido lo que necesitas.",
    publicaciones: "Publicaciones",
    ejemplos: "Ejemplos",
    presentaciones: "Presentaciones",
    demosYProyectos: "Demos y Proyectos",
    podcast: "Podcast",
    tiktok: "TikTok",
    historias: "Historias",

    // Index page - Navigation
    blog: "Blog",
    queHago: "Qué hago",
    proyectos: "Proyectos",
    porQueTrabajarConmigo: "Por qué trabajar conmigo",
    charlas: "Charlas",
    contacto: "Contacto",
    downloadCV: "Ver CV interactivo",

    // Index page - Hero Section
    heroTitleLead: "Construyo productos y soluciones con",
    heroTitleAccent: "inteligencia artificial",
    heroSubtitle: "",
    heroTitleLeadFabrica: "El Programador Aumentado",
    heroTitleAccentFabrica: "IA práctica para devs",
    heroTitleLeadAcademy: "Edi Academy",
    heroTitleAccentAcademy: "Formación práctica en IA para tu futuro",
    heroDescriptionDeveloper:
      "Llévate *El Programador Aumentado*: la guía práctica para integrar IA en tu trabajo como dev. Compra con un clic en Fábrica de Programadores.",
    heroDescriptionAcademy:
      "*Edi Academy*: cursos y rutas de IA aplicada para docentes, desarrolladores y equipos — pensados para llevar lo aprendido al día a día.",
    heroDescription:
      "Conoce mis productos: apps y herramientas con IA listas para usar y resolver problemas de verdad.",
    contactMe: "Contáctame",
    heroCtaPrimary: "Ver apps",
    heroCtaSecondary: "Fábrica de Programadores",
    contenido: "Contenido",
    apps: "Apps",

    // Index page - About Section
    aboutTitle: "Sobre mí",
    aboutDescription1:
      "Soy {name}. No solo desarrollo: construyo productos, herramientas y contenido. Combino frontend, IA aplicada y visión de producto para crear cosas que la gente usa.",
    aboutDescription2:
      "Mi diferencia: código que escala, ideas que enseñan y un ecosistema en crecimiento — apps, contenido y comunidad alrededor de la IA.",
    aboutName: "Edinson Nuñez More",
    aboutYears: "14 años",
    aboutStat1: "+14 años construyendo productos",
    aboutStat2: "Experiencia en frontend, UX y arquitectura",
    aboutStat3: "Foco en IA aplicada y herramientas reales",

    // Index page - What I Do Section
    whatIDoTitle: "Qué hago",
    whatIDoSubtitle:
      "Combino desarrollo, IA aplicada y producto para construir herramientas y experiencias reales.",
    aiSolutions: "Soluciones con IA",
    aiSolutionsDesc:
      "Aplicaciones inteligentes, asistentes conversacionales, agentes, análisis de datos y automatización.",
    webArchitecture: "Arquitectura & Desarrollo Web",
    webArchitectureDesc:
      "Sistemas escalables con React, Angular, NestJS, Node, Supabase y arquitecturas limpias.",
    threeDExperiences: "Experiencias 3D & Visuales",
    threeDExperiencesDesc:
      "React Three Fiber, WebGL, animaciones, mundos interactivos y visualizaciones técnicas.",
    educationWorkshops: "Educación & Workshops",
    educationWorkshopsDesc:
      "Charlas, mentoría y formación en IA, programación moderna y tecnología para estudiantes y equipos.",
    productInnovation: "Producto & Innovación",
    productInnovationDesc:
      "Diseño de experiencias, prototipos funcionales, estrategia tecnológica y visión técnica.",

    // Index page - Apps Section
    appsSectionTitle: "Productos que estoy construyendo con IA",
    appsSectionSubtitle:
      "Apps y experimentos donde transformo ideas en herramientas reales como Slaim y asistentes inteligentes como Emotional AI.",
    slaimTitle: "Slaim",
    slaimTagline: "De idea a presentación lista en minutos.",
    slaimDescription:
      "Genera contenido, estructura y notas para tus presentaciones automáticamente usando IA.",
    slaimBullets: [
      "Genera slides a partir de una idea",
      "Crea notas de presentación automáticamente",
      "Ahorra horas de trabajo manual",
    ],
    slaimCta: "Abrir Slaim",
    slaimHref: "https://slaim.vercel.app",
    emotionalAiTitle: "Emotional AI",
    emotionalAiDescription:
      "Consultas, dudas y cuestionarios con un asistente que se siente cercano, no como un chat anónimo. Tu negocio con rostro y voz; conecta MCP y responde con lo que ya tienes en sistemas internos.",
    emotionalAiCta: "Conocer Emotional AI",
    emotionalAiHref: "https://emotional-ai.app",
    badgeLive: "En vivo",
    badgeFree: "Gratis",
    badgeComingSoon: "Próximamente",
    badgeExperimental: "Experimental",
    moreToolsComing: "Más herramientas en camino",
    placeholderAppTitle: "Próximamente",
    placeholderAppDesc: "Nuevas herramientas y experimentos en desarrollo.",

    // Index page - Featured Projects Section
    featuredProjectsTitle: "Proyectos Destacados",
    featuredProjectsSubtitle:
      "Apps, demos y proyectos donde aplico frontend, IA y producto.",
    neokidsTitle: "NeoKids",
    neokidsSubtitle:
      "Asistente inteligente para apoyar a niños y jóvenes en la educación",
    neokidsDesc:
      "IA educativa que guía a estudiantes con herramientas personalizadas para alcanzar sus metas de aprendizaje.",
    costproTitle: "CostPro",
    costproSubtitle: "Software de presupuestos",
    costproDesc:
      "Potente herramienta de costos y presupuestos para cualquier proyecto. Precisión y control en cada etapa.",
    zypherTitle: "Zypher",
    zypherSubtitle: "Agenda escolar inteligente",
    zypherDesc:
      "La plataforma que une colegios, familias y estudiantes. Comunicación fluida y seguimiento en tiempo real.",
    yaquTitle: "Yaqu",
    yaquSubtitle: "Gestión moderna de agua",
    yaquDesc:
      "Transforma la gestión del agua con mapas interactivos, pagos digitales e inteligencia artificial.",
    badgeLiveApp: "App en vivo",
    badgeFreeTool: "Herramienta gratis",
    badgeExperiment: "Experimento",
    badgeContent: "Contenido",
    badgeDemo: "Demo",
    neokidsCta: "Explorar proyecto",
    costproCta: "Ver demo",
    zypherCta: "Explorar proyecto",
    yaquCta: "Ver proyecto",

    // Index page - Why Work With Me Section
    whyWorkWithMeTitle: "Por qué trabajar conmigo",
    whyWorkWithMeSubtitle:
      "Valores y capacidades que marcan la diferencia en cada proyecto.",
    yearsExperience: "14+ años de experiencia",
    yearsExperienceDesc:
      "Construyendo software en compañías, startups y proyectos sociales.",
    completeVision: "Visión completa",
    completeVisionDesc:
      "Desde arquitectura hasta producto, UI/UX e inteligencia artificial.",
    clearCommunication: "Comunicación clara",
    clearCommunicationDesc:
      "Explico conceptos complejos de forma simple. Trabajo bien con equipos técnicos y no técnicos.",
    qualityDelivery: "Entrega con calidad",
    qualityDeliveryDesc:
      "Código limpio, buenas prácticas, testing, documentación y enfoque escalable.",
    humanApproach: "Enfoque humano",
    humanApproachDesc:
      "Busco impacto. Creo tecnología que abra oportunidades reales.",

    // Index page - Talks Section
    talksTitle: "Charlas y Workshops",
    talksSubtitle:
      "Comparto conocimiento y experiencias sobre tecnología e innovación.",
    topicsITeach: "Temas que imparto",
    aiForDevelopers: "IA para desarrolladores",
    technicalStorytelling: "Storytelling técnico",
    modernSoftwareEngineering: "Ingeniería de software moderna",
    threeDWithReact: "3D con React Three Fiber",
    educationalInnovation: "Innovación educativa",
    technologyWithPurpose: "Cómo crear tecnología con propósito",
    inviteMeToTalk: "Invítame a dar una charla",

    // Index page — Recursos y productos
    productsSectionTitle:
      "Recursos y productos para aprender y construir con IA",
    productsSectionSubtitle:
      "Un cuento gratuito para familias y un libro para desarrolladores que quieren velocidad con criterio.",
    fabricaProductName: "Fábrica de Programadores",
    fabricaProductTagline:
      "Un cuento para despertar la curiosidad por la tecnología",
    fabricaProductDescription:
      "Cuento ilustrado que acerca la programación a los niños con humor y ternura. Léelo en la web o descarga el PDF sin coste.",
    augmentedProductName: "El Programador Aumentado",
    augmentedProductTagline:
      "Cómo desarrollar software con IA sin perder el control",
    augmentedProductDescription:
      "Aprende a usar IA para desarrollar más rápido sin sacrificar calidad: delegación con criterio, revisión de resultados y control de arquitectura.",
    badgeProductFree: "Gratis",
    badgeProductPaid: "Producto",
    ctaReadStory: "Leer cuento",
    ctaDownloadFree: "Descargar gratis",
    ctaViewBook: "Ver libro",
    ctaBuyNow: "Comprar ahora",

    // Index page - Presentations Section
    presentationsTitle: "Presentaciones y Materiales",
    presentationsSubtitle:
      "Comparto materiales de charlas y presentaciones sobre {bold} y otros temas técnicos que he dictado en diferentes eventos y conferencias.",
    presentationsSubtitleBold: "IA, desarrollo de software, arquitectura",
    viewAllPresentations: "Ver todas las presentaciones",

    // Index page - Blog Section
    blogSectionTitle: "Blog",
    blogSectionSubtitle:
      "Artículos y reflexiones sobre IA, desarrollo de software, UX e innovación.",
    viewAllPosts: "Ver todos los artículos",

    // Index page - Edi Academy Section
    ediAcademyTitle: "Formación especializada en",
    ediAcademyTitleHighlight: "IA",
    ediAcademyDescription:
      "Rutas prácticas de IA para distintos perfiles: del aula al código y a los equipos que quieren adoptar IA con criterio.",
    ediAcademyProfile1Label: "EDUCADORES",
    ediAcademyProfile1Title: "Docentes",
    ediAcademyProfile1Desc:
      "Actualiza tu metodología de enseñanza. Aprende a diseñar cursos, evaluar estudiantes y crear contenido con IA generativa.",
    ediAcademyProfile2Label: "PROGRAMADORES",
    ediAcademyProfile2Title: "Desarrolladores",
    ediAcademyProfile2Desc:
      "Domina Cursor, VS Code + Copilot y técnicas de prompting para código.",
    ediAcademyProfile3Label: "CORPORATIVO",
    ediAcademyProfile3Title: "Empresas",
    ediAcademyProfile3Desc:
      "Capacitación para equipos. Optimiza flujos de trabajo con IA.",
    ediAcademyMetric1Value: "Modular",
    ediAcademyMetric1Label: "CONTENIDO",
    ediAcademyMetric2Value: "100%",
    ediAcademyMetric2Label: "PRÁCTICO",
    ediAcademyMetric3Value: "IA",
    ediAcademyMetric3Label: "ASISTENTE",
    ediAcademyButton: "Explorar Edi Academy",
    ediAcademyButtonLabel: "Ir a Edi Academy",
    goToEdiAcademy: "Ir a Edi Academy",

    // Index page - Contact Section
    letsWorkTogether: "Trabajemos juntos",
    contactSubtitle:
      "Completa el formulario o escríbeme directamente para proyectos, colaboraciones o charlas.",
    contactTitle: "Contacto",
    contactDescription:
      "Estoy abierto a nuevas oportunidades y proyectos interesantes.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntame sobre tu proyecto o idea...",
    sendButton: "Enviar",
    sending: "Enviando...",
    messageSentSuccess: "¡Mensaje enviado con éxito! Te responderé pronto.",
    messageError:
      "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.",

    // Index page - Footer Section
    footerTagline: "Construyendo futuro con tecnología y propósito.",
    footerNavTitle: "Navegación",
    footerAppsTitle: "Apps",
    footerContactTitle: "Contacto",
  },
  en: {
    // Navbar
    inicio: "Home",
    recursosDesarrolladores: "Developer Resources",
    sobreMi: "About Me",
    miPodcast: "My Podcast",
    saas: "SaaS",
    charlasYTalleres: "Talks & Workshops",
    ediAcademy: "Edi Academy",

    // Info Search Page
    saludoAsistente: "👋 Hello! I'm Edinson's Information Assistant",
    descripcionAsistente:
      "Ask questions and explore interactive visualizations about Edinson. Discover data and answers in a visual and simple way.",
    ejemplosPreguntas: "💡 Examples of questions you can ask:",
    ejemploTimeline: '"Show me his professional timeline"',
    ejemploHabilidades: '"What are his technical skills?"',
    ejemploProyectos: '"Information about his projects"',
    ejemploExperiencia: '"Chart of his experience by years"',
    escribeTuPregunta: "Write your question here...",
    escribiendo: "Writing",

    // Timeline instructions
    scrollHorizontal: "💡 Use horizontal scroll to navigate",
    ctrlZoom: "🔍 Ctrl + mouse wheel to zoom",
    hoverDetalles: "ℹ️ Hover over points for more details",

    // Error messages
    errorCargarDatos: "Error loading data",
    problemaGrafico: "There was a problem getting the chart information.",

    // Sidebar
    menu: "Menu",
    navegacion: "Navigation",
    cerrarMenu: "Close menu",
    idiomaLanguage: "Language / Idioma",
    abrirMenu: "Open menu",

    // Home page
    helloImEdinson: "Hello, I'm Edinson",
    softwareEngineerTransforms:
      "I design digital products that captivate your users and deliver results",
    yearsBuildingSolutions:
      "Frontend specialist, 3D graphics and applied AI. Over 14 years creating solutions for global brands.",
    whatWantToKnow: "What do you want to know?",
    scheduleOnCalCom: "Or schedule a meeting on cal.com",

    // Home placeholders
    placeholder1: "Projects, talks, technologies.",
    placeholder2: "Explore my work.",
    placeholder3: "Experience and skills.",
    placeholder4: "Schedule a meeting.",

    // Chat button
    chatWithEdinson: "Ask the AI about me",
    askMeAnything: "Ask me anything",

    // Developer resources
    recursosTitulo: "Developer Resources",
    recursosIntro:
      "Explore my publications, code examples and talks. Everything categorized so you can quickly find what you need.",
    publicaciones: "Publications",
    ejemplos: "Examples",
    presentaciones: "Talks",
    demosYProyectos: "Demos & Projects",
    podcast: "Podcast",
    tiktok: "TikTok",
    historias: "Stories",

    // Index page - Navigation
    blog: "Blog",
    queHago: "What I Do",
    proyectos: "Projects",
    porQueTrabajarConmigo: "Why Work With Me",
    charlas: "Talks",
    contacto: "Contact",
    downloadCV: "View interactive CV",

    // Index page - Hero Section
    heroTitleLead: "I build products and solutions with",
    heroTitleAccent: "artificial intelligence",
    heroSubtitle: "",
    heroTitleLeadFabrica: "The Augmented Programmer",
    heroTitleAccentFabrica: "Practical AI for devs",
    heroTitleLeadAcademy: "Edi Academy",
    heroTitleAccentAcademy: "Hands-on AI training for your future",
    heroDescriptionDeveloper:
      "Get *The Augmented Programmer*: a practical playbook for weaving AI into your daily dev work. Purchase in one step from Programmers Factory.",
    heroDescriptionAcademy:
      "*Edi Academy*: applied AI courses and learning paths for educators, developers, and teams — built to use what you learn on the job.",
    heroDescription:
      "Explore my products — AI-powered apps and tools you can try today, built for real use cases.",
    contactMe: "Contact Me",
    heroCtaPrimary: "View apps",
    heroCtaSecondary: "Programmers Factory",
    contenido: "Content",
    apps: "Apps",

    // Index page - About Section
    aboutTitle: "About Me",
    aboutDescription1:
      "I'm {name}. I don't just code: I build products, tools, and content. I combine frontend, applied AI, and product vision to create things people actually use.",
    aboutDescription2:
      "What sets me apart: code that scales, ideas that teach, and a growing ecosystem — apps, content, and community around AI.",
    aboutName: "Edinson Nuñez More",
    aboutYears: "14 years",
    aboutStat1: "+14 years building products",
    aboutStat2: "Experience in frontend, UX, and architecture",
    aboutStat3: "Focus on applied AI and real tools",

    // Index page - What I Do Section
    whatIDoTitle: "What I Do",
    whatIDoSubtitle:
      "I combine development, applied AI, and product to build real tools and experiences.",
    aiSolutions: "AI Solutions",
    aiSolutionsDesc:
      "Intelligent applications, conversational assistants, agents, data analysis, and automation.",
    webArchitecture: "Web Architecture & Development",
    webArchitectureDesc:
      "Scalable systems with React, Angular, NestJS, Node, Supabase, and clean architectures.",
    threeDExperiences: "3D & Visual Experiences",
    threeDExperiencesDesc:
      "React Three Fiber, WebGL, animations, interactive worlds, and technical visualizations.",
    educationWorkshops: "Education & Workshops",
    educationWorkshopsDesc:
      "Talks, mentoring, and training in AI, modern programming, and technology for students and teams.",
    productInnovation: "Product & Innovation",
    productInnovationDesc:
      "Experience design, functional prototypes, technology strategy, and technical vision.",

    // Index page - Apps Section
    appsSectionTitle: "Products I'm building with AI",
    appsSectionSubtitle:
      "Apps and experiments where I turn ideas into real tools like Slaim and intelligent assistants like Emotional AI.",
    slaimTitle: "Slaim",
    slaimTagline: "From idea to ready presentation in minutes.",
    slaimDescription:
      "Generate content, structure, and notes for your presentations automatically using AI.",
    slaimBullets: [
      "Generate slides from an idea",
      "Create presentation notes automatically",
      "Save hours of manual work",
    ],
    slaimCta: "Open Slaim",
    slaimHref: "https://slaim.vercel.app",
    emotionalAiTitle: "Emotional AI",
    emotionalAiDescription:
      "Questions, doubts, and surveys with an assistant that feels human—not like an anonymous chat. Your business with face and voice; connect MCP and answer with what you already have in internal systems.",
    emotionalAiCta: "Explore Emotional AI",
    emotionalAiHref: "https://emotional-ai.app",
    badgeLive: "Live",
    badgeFree: "Free",
    badgeComingSoon: "Coming Soon",
    badgeExperimental: "Experimental",
    moreToolsComing: "More tools on the way",
    placeholderAppTitle: "Coming Soon",
    placeholderAppDesc: "New tools and experiments in development.",

    // Index page - Featured Projects Section
    featuredProjectsTitle: "Featured Projects",
    featuredProjectsSubtitle:
      "Apps, demos, and projects where I apply frontend, AI, and product.",
    neokidsTitle: "NeoKids",
    neokidsSubtitle:
      "Intelligent assistant to support children and youth in education",
    neokidsDesc:
      "Educational AI that guides students with personalized tools to achieve their learning goals.",
    costproTitle: "CostPro",
    costproSubtitle: "Budgeting software",
    costproDesc:
      "Powerful cost and budgeting tool for any project. Precision and control at every stage.",
    zypherTitle: "Zypher",
    zypherSubtitle: "Smart school agenda",
    zypherDesc:
      "The platform that connects schools, families, and students. Smooth communication and real-time tracking.",
    yaquTitle: "Yaqu",
    yaquSubtitle: "Modern water management",
    yaquDesc:
      "Transforms water management with interactive maps, digital payments, and artificial intelligence.",
    badgeLiveApp: "Live App",
    badgeFreeTool: "Free Tool",
    badgeExperiment: "Experiment",
    badgeContent: "Content",
    badgeDemo: "Demo",
    neokidsCta: "Explore project",
    costproCta: "View demo",
    zypherCta: "Explore project",
    yaquCta: "View project",

    // Index page - Why Work With Me Section
    whyWorkWithMeTitle: "Why Work With Me",
    whyWorkWithMeSubtitle:
      "Values and capabilities that make a difference in every project.",
    yearsExperience: "14+ years of experience",
    yearsExperienceDesc:
      "Building software in companies, startups, and social projects.",
    completeVision: "Complete vision",
    completeVisionDesc:
      "From architecture to product, UI/UX, and artificial intelligence.",
    clearCommunication: "Clear communication",
    clearCommunicationDesc:
      "I explain complex concepts simply. I work well with technical and non-technical teams.",
    qualityDelivery: "Quality delivery",
    qualityDeliveryDesc:
      "Clean code, best practices, testing, documentation, and scalable approach.",
    humanApproach: "Human approach",
    humanApproachDesc:
      "I seek impact. I create technology that opens real opportunities.",

    // Index page - Talks Section
    talksTitle: "Talks & Workshops",
    talksSubtitle:
      "I share knowledge and experiences about technology and innovation.",
    topicsITeach: "Topics I teach",
    aiForDevelopers: "AI for developers",
    technicalStorytelling: "Technical storytelling",
    modernSoftwareEngineering: "Modern software engineering",
    threeDWithReact: "3D with React Three Fiber",
    educationalInnovation: "Educational innovation",
    technologyWithPurpose: "How to create technology with purpose",
    inviteMeToTalk: "Invite me to give a talk",

    // Index page — Resources & products
    productsSectionTitle: "Resources and products to learn and build with AI",
    productsSectionSubtitle:
      "A free story for families and a book for developers who want speed with judgment.",
    fabricaProductName: "Programmers Factory",
    fabricaProductTagline: "A story to spark curiosity about technology",
    fabricaProductDescription:
      "An illustrated story that introduces kids to code with warmth and playfulness. Read it on the web or download the PDF free.",
    augmentedProductName: "The Augmented Programmer",
    augmentedProductTagline:
      "How to build software with AI without losing control",
    augmentedProductDescription:
      "Learn to use AI to ship faster without sacrificing quality: delegate with judgment, validate output, and keep architectural control.",
    badgeProductFree: "Free",
    badgeProductPaid: "Product",
    ctaReadStory: "Read the story",
    ctaDownloadFree: "Download free",
    ctaViewBook: "View the book",
    ctaBuyNow: "Buy now",

    // Index page - Presentations Section
    presentationsTitle: "Presentations & Materials",
    presentationsSubtitle:
      "I share materials from talks and presentations about {bold} and other technical topics I've delivered at various events and conferences.",
    presentationsSubtitleBold: "AI, software development, architecture",
    viewAllPresentations: "View all presentations",

    // Index page - Blog Section
    blogSectionTitle: "Blog",
    blogSectionSubtitle:
      "Articles and thoughts on AI, software development, UX, and innovation.",
    viewAllPosts: "View all posts",

    // Index page - Edi Academy Section
    ediAcademyTitle: "Specialized training in",
    ediAcademyTitleHighlight: "AI",
    ediAcademyDescription:
      "Practical AI learning paths for different profiles — from the classroom to code and teams adopting AI with judgment.",
    ediAcademyProfile1Label: "EDUCATORS",
    ediAcademyProfile1Title: "Teachers",
    ediAcademyProfile1Desc:
      "Update your teaching methodology. Learn to design courses, evaluate students, and create content with generative AI.",
    ediAcademyProfile2Label: "PROGRAMMERS",
    ediAcademyProfile2Title: "Developers",
    ediAcademyProfile2Desc:
      "Master Cursor, VS Code + Copilot and code prompting techniques.",
    ediAcademyProfile3Label: "CORPORATE",
    ediAcademyProfile3Title: "Companies",
    ediAcademyProfile3Desc: "Training for teams. Optimize workflows with AI.",
    ediAcademyMetric1Value: "Modular",
    ediAcademyMetric1Label: "CONTENT",
    ediAcademyMetric2Value: "100%",
    ediAcademyMetric2Label: "PRACTICAL",
    ediAcademyMetric3Value: "AI",
    ediAcademyMetric3Label: "ASSISTANT",
    ediAcademyButton: "Explore Edi Academy",
    ediAcademyButtonLabel: "Go to Edi Academy",
    goToEdiAcademy: "Go to Edi Academy",

    // Index page - Contact Section
    letsWorkTogether: "Let's Work Together",
    contactSubtitle:
      "Complete the form or write to me directly for projects, collaborations, or talks.",
    contactTitle: "Contact",
    contactDescription:
      "I'm open to new opportunities and interesting projects.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project or idea...",
    sendButton: "Send",
    sending: "Sending...",
    messageSentSuccess: "Message sent successfully! I'll respond soon.",
    messageError: "There was an error sending the message. Please try again.",

    // Index page - Footer Section
    footerTagline: "Building the future with technology and purpose.",
    footerNavTitle: "Navigation",
    footerAppsTitle: "Apps",
    footerContactTitle: "Contact",
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    // Obtener idioma del localStorage
    const storedLanguage = localStorage.getItem("language") as Language;
    if (
      storedLanguage &&
      (storedLanguage === "es" || storedLanguage === "en")
    ) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = translations[language];

  // Memoizar el valor del contexto para evitar re-renders innecesarios
  const contextValue = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language, handleSetLanguage, t],
  );

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
