# Interfaces que se generan solas: el futuro de la UX con Large Language Models

**Edinson Nuñez More** · Lima, Perú - Febrero 2026 · *8 min de lectura*

*Inteligencia Artificial · UX Research · LLMs · Generative UI*

---

¿Qué pasa si en lugar de pedirle datos a una app, la app te construye exactamente la interfaz que necesitas en ese momento? Durante años diseñamos interfaces como si los usuarios fueran todos iguales: misma barra de navegación, mismo dashboard, misma grilla de resultados. Con la irrupción de los Large Language Models (LLMs), esa premisa está siendo cuestionada desde la raíz. La pregunta ya no es *"¿cómo organizo mejor la información?"*, sino *"¿por qué no dejo que la interfaz se construya sola según lo que el usuario necesita ahora mismo?"*

---

## El problema con las interfaces estáticas

Imagina que le preguntas a tu app del clima: **"¿Cómo estará el tiempo mañana en Arequipa para salir a correr?"**. La app responde con una pantalla llena de datos meteorológicos: temperatura, humedad, presión barométrica, velocidad del viento, índice UV. Toda esa información está ahí, pero tú solo querías saber si llueve y a qué hora.

Las interfaces tradicionales son estáticas por diseño. Un equipo de producto decide qué información mostrar y en qué formato, semanas o meses antes de que el usuario haga su consulta. Ese desfase entre lo que el diseñador anticipó y lo que el usuario necesita en un momento específico es uno de los problemas más persistentes del diseño de producto.

|                | Interfaz tradicional                                         | Generative UI                                                |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Flujo**      | El usuario consulta → la app devuelve una pantalla prediseñada para todos los casos posibles | El usuario consulta → el sistema genera en tiempo real un widget visual específico para esa consulta |
| **Filtrado**   | El usuario filtra mentalmente lo relevante                   | El sistema solo muestra lo relevante                         |
| **Adaptación** | Fija, igual para todos                                       | Dinámica, única para cada consulta                           |

---

## ¿Qué es Generative UI?

**Generative UI** (o Interfaz Generativa) es un paradigma donde los componentes visuales de una aplicación no son prediseñados, sino generados dinámicamente por un LLM en respuesta a la intención del usuario. En lugar de renderizar pantallas fijas, el sistema produce código de interfaz —típicamente React/JSX— que se ejecuta en tiempo real en el navegador.

El concepto no es puramente teórico. Vercel ya experimenta con esto en su SDK *AI SDK UI*; Anthropic ha impulsado el *Model Context Protocol (MCP)* como estándar para conectar LLMs a herramientas y APIs externas; y varios laboratorios de investigación exploran cómo hacer que estas interfaces sean confiables, rápidas y evaluables.

> *"La interfaz del futuro no se diseña de antemano, se sintetiza en el momento en que el usuario la necesita."*

---

## Cómo funciona por dentro

El pipeline de un sistema de Generative UI tiene varios componentes que trabajan en cadena:

**① Consulta del usuario** — "Ponme la canción más escuchada de Bad Bunny esta semana"

**② Widget Registry** — El sistema busca en su índice si ya existe un widget similar generado anteriormente. Si la similitud semántica es alta, lo reutiliza directamente sin llamar al LLM.

**③ Motor LLM** — Si no hay un widget adecuado, el LLM genera código JSX nuevo conectado a la API de Spotify, tomando como contexto el esquema del conector y plantillas previas.

**④ Renderizado seguro** — El JSX se ejecuta en un sandbox (Sandpack) en el navegador. El usuario ve e interactúa con el widget sin riesgo de ejecución de código arbitrario.

**⑤ Aprendizaje continuo** — El widget generado se indexa automáticamente en el Registry para ser reutilizado en consultas futuras similares, reduciendo latencia y costo de API.

El componente más innovador de esta arquitectura es el **Widget Registry**: un índice vectorial semántico (construido sobre FAISS) que almacena los widgets generados previamente junto con una representación vectorial de su descripción. El sistema entonces decide entre tres modos:

- **REUTILIZAR** (similitud ≥ 0.85): devuelve el widget existente sin llamar al LLM. Latencia ~5ms.
- **ADAPTAR** (similitud entre 0.60 y 0.85): ajusta parámetros de un widget existente con una llamada corta al LLM. Latencia ~1.5-2.5s.
- **SINTETIZAR** (similitud < 0.60): genera el widget desde cero. Latencia ~3-6s.

---

## La stack tecnológica

| Componente        | Tecnología                           | Por qué                                                      |
| ----------------- | ------------------------------------ | ------------------------------------------------------------ |
| Motor LLM         | Claude 3.5 Haiku / Sonnet            | Excelente generación de código JSX, 200k tokens de contexto, ~$0.001/consulta |
| Widget Registry   | FAISS + Sentence-Transformers        | Búsqueda vectorial en memoria, sub-milisegundo, sin servidor externo |
| Conectores de API | Model Context Protocol (MCP)         | Estándar abierto para describir herramientas y APIs al LLM de forma estructurada |
| APIs integradas   | Spotify, OpenWeatherMap, Google Maps | Casos de uso representativos: música, clima, ubicación       |
| Backend           | FastAPI + Python                     | Async nativo, ecosistema Python para FAISS y ML              |
| Renderizado JSX   | React + Sandpack                     | Sandbox seguro en el navegador, compilación incremental <400ms |

---

## ¿Dónde estamos en el Perú y Latinoamérica?

Aquí es donde la conversación se pone especialmente interesante. Mientras que los grandes laboratorios de EE.UU. y Europa ya tienen equipos completos investigando Generative UI, en el contexto peruano —y latinoamericano en general— hay una **brecha enorme entre la adopción de herramientas de IA y la producción de investigación original** sobre ellas.

### Escasa investigación local en HCI + IA

La mayoría de papers sobre interfaces generativas provienen de labs en Stanford, MIT, UCL y CMU. Las universidades peruanas tienen muy poca producción en esta intersección específica de HCI e IA generativa. Publicar en este espacio hoy equivale a escribir en territorio prácticamente virgen a nivel regional.

### Usuarios hispanohablantes sin representación

Los benchmarks y estudios de usabilidad de sistemas de Generative UI se hacen casi exclusivamente con usuarios angloparlantes. El comportamiento de usuarios en español —con sus particularidades de formulación de consultas y expectativas culturales— está prácticamente sin estudiar. ¿Los usuarios peruanos formulan sus consultas de forma más descriptiva o más directa? ¿Confían de la misma manera en interfaces que "se generan solas"? No lo sabemos porque nadie lo ha medido.

### Ecosistema de producto digital en crecimiento

El ecosistema peruano de startups tech está madurando (Culqui, Rextie, Prestamype, entre otras). Estas empresas necesitan interfaces más inteligentes pero no tienen referentes locales de investigación en los que apoyarse para tomar decisiones informadas sobre adoptar estas tecnologías.

### Vacío en metodología de evaluación

No existe una metodología validada localmente para medir la efectividad de sistemas de Generative UI. Eso significa que cualquier empresa que quiera adoptar esta tecnología parte desde cero sin benchmarks de referencia ni criterios de éxito claros.

### Latencia y conectividad como factor real

En mercados como el peruano, donde la conectividad todavía es desigual entre Lima y el interior del país, la optimización de latencia mediante reutilización de widgets no es un lujo académico: es una ventaja funcional real. Un sistema que responde en 5ms reutilizando un widget existente versus uno que espera 5 segundos a una API llama la diferencia entre una experiencia útil y una frustrante, especialmente en conexiones móviles 3G.

### APIs de servicios locales sin explorar

Yape, Tunki, apps de transporte urbano, sistemas de información de municipalidades: existe una cantidad enorme de servicios locales que aún no han sido conectados a interfaces conversacionales generativas. Quien construya los primeros conectores MCP para servicios financieros y gubernamentales peruanos tendrá una ventaja de años.

> **La oportunidad concreta:** el primer grupo o persona que establezca metodología, benchmarks y evidencia empírica sobre Generative UI en contexto hispanohablante definirá el lenguaje en el que se habla del tema durante los próximos años. Esta es una de esas ventanas de oportunidad que se abren brevemente cuando una tecnología está madura para investigarse pero aún no lo está masivamente.

---

## Lo que estoy investigando

Actualmente desarrollo mi tesis sobre la generación dinámica de widgets mediante LLMs, combinando un motor de síntesis basado en Claude API con un Widget Registry semántico y conectores MCP para Spotify, OpenWeatherMap y Google Maps.

El estudio controlado con **n=30 participantes** busca responder cuatro preguntas concretas:

1. ¿Los widgets generados dinámicamente mejoran la tasa de completitud de tareas respecto a respuestas en texto plano? *(hipótesis: ≥ 75% TCR)*
2. ¿Los usuarios prefieren la interfaz generativa sobre la textual? *(hipótesis: ≥ 65% win rate en preferencia pairwise)*
3. ¿El Widget Registry reduce efectivamente la latencia del sistema? *(hipótesis: reducción ≥ 40%)*
4. ¿Los widgets alcanzan un estándar de calidad UX aceptable según evaluadores expertos? *(hipótesis: ≥ 7.0/10 en escala UICrit)*

El diseño experimental usa un esquema within-subjects con contrabalanceo y corrección de Bonferroni (α ajustado = 0.0125 por hipótesis) para controlar el error de tipo I en comparaciones múltiples.

---

## ¿Qué viene después?

Si los resultados confirman las hipótesis, las implicaciones son amplias para el contexto local:

**Banca digital** — Interfaces que generan vistas personalizadas de estados de cuenta, alertas y simulaciones de crédito según la consulta específica de cada usuario, en lugar de dashboards genéricos que muestran todo a todos.

**Salud** — Widgets de seguimiento de síntomas o recordatorios de medicación generados dinámicamente según el perfil del paciente, sin que el usuario tenga que navegar estructuras de menú complejas.

**Educación** — Ejercicios interactivos generados on-demand según el nivel y los errores recientes del estudiante, con interfaces que se adaptan al ritmo de aprendizaje individual.

**Gobierno digital** — Interfaces conversacionales para trámites que generen exactamente los formularios y pasos necesarios para la situación particular de cada ciudadano.

**E-commerce** — Páginas de producto que se adaptan en tiempo real a la intención de búsqueda: comparadores, calculadoras de cuotas, mapas de tiendas cercanas, todo generado según lo que el usuario pregunta.

El desafío pendiente sigue siendo triple: reducir el costo de API de los LLMs a niveles sostenibles para productos locales, garantizar consistencia de calidad en los widgets generados, y construir la confianza del usuario en interfaces que cambian con cada consulta. Resolver estos tres problemas es donde está el trabajo duro de la investigación y la ingeniería durante los próximos años.

---

## Conclusión

Las interfaces generativas no son ciencia ficción ni hype pasajero. Son la consecuencia lógica de tener modelos de lenguaje capaces de escribir código en milisegundos, combinados con arquitecturas de recuperación semántica que hacen al sistema cada vez más eficiente con el uso.

Para el ecosistema peruano, el momento es ahora. No porque la tecnología sea perfecta —no lo es— sino porque las ventanas de oportunidad para establecer referencia local en una tecnología emergente son estrechas. Quien investiga, documenta y publica primero define el lenguaje en el que se habla del tema durante los próximos años.

Compartiré los resultados del estudio aquí cuando estén disponibles. Si estás trabajando en interfaces conversacionales, IA generativa aplicada a producto, o simplemente te genera curiosidad el tema desde nuestro contexto, escríbeme.

---

*Tags: #GenerativeUI #LLM #InteligenciaArtificial #UXResearch #WidgetRegistry #PerúTech #Tesis*