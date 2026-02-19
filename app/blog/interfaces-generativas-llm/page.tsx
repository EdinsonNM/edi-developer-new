import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Interfaces que se generan solas: el futuro de la UX con LLMs",
  description:
    "Generative UI: cómo los Large Language Models están cambiando el diseño de interfaces. Investigación, stack tecnológica y oportunidades en Perú y Latinoamérica.",
};

const TAGS = [
  "GenerativeUI",
  "LLM",
  "InteligenciaArtificial",
  "UXResearch",
  "WidgetRegistry",
  "PerúTech",
  "Tesis",
];

export default function InterfacesGenerativasLlmBlogPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-16 text-foreground md:px-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <section className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Blog · Investigación
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground md:text-5xl">
            Interfaces que se generan solas: el futuro de la UX con Large
            Language Models
          </h1>

          <article className="mt-8 space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p>
              ¿Qué pasa si en lugar de pedirle datos a una app, la app te
              construye exactamente la interfaz que necesitas en ese momento?
              Durante años diseñamos interfaces como si los usuarios fueran
              todos iguales: misma barra de navegación, mismo dashboard, misma
              grilla de resultados. Con la irrupción de los Large Language
              Models (LLMs), esa premisa está siendo cuestionada desde la raíz.
              La pregunta ya no es <em>¿cómo organizo mejor la información?</em>
              , sino{" "}
              <em>
                ¿por qué no dejo que la interfaz se construya sola según lo que
                el usuario necesita ahora mismo?
              </em>
            </p>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                El problema con las interfaces estáticas
              </h2>
              <p>
                Imagina que le preguntas a tu app del clima:{" "}
                <strong>
                  ¿Cómo estará el tiempo mañana en Arequipa para salir a correr?
                </strong>{" "}
                La app responde con una pantalla llena de datos meteorológicos:
                temperatura, humedad, presión barométrica, velocidad del viento,
                índice UV. Toda esa información está ahí, pero tú solo querías
                saber si llueve y a qué hora.
              </p>
              <p>
                Las interfaces tradicionales son estáticas por diseño. Un equipo
                de producto decide qué información mostrar y en qué formato,
                semanas o meses antes de que el usuario haga su consulta. Ese
                desfase entre lo que el diseñador anticipó y lo que el usuario
                necesita en un momento específico es uno de los problemas más
                persistentes del diseño de producto.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[520px] border-collapse text-base">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-3 text-left font-semibold text-foreground w-28">
                        {" "}
                      </th>
                      <th className="p-3 text-left font-semibold text-foreground">
                        Interfaz tradicional
                      </th>
                      <th className="p-3 text-left font-semibold text-foreground">
                        Generative UI
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr]:border-b [&_tr]:border-border last:[&_tr]:border-0">
                    <tr>
                      <td className="p-3 font-medium text-foreground">Flujo</td>
                      <td className="p-3">
                        El usuario consulta → la app devuelve una pantalla
                        prediseñada para todos los casos posibles
                      </td>
                      <td className="p-3">
                        El usuario consulta → el sistema genera en tiempo real
                        un widget visual específico para esa consulta
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Filtrado
                      </td>
                      <td className="p-3">
                        El usuario filtra mentalmente lo relevante
                      </td>
                      <td className="p-3">
                        El sistema solo muestra lo relevante
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Adaptación
                      </td>
                      <td className="p-3">Fija, igual para todos</td>
                      <td className="p-3">
                        Dinámica, única para cada consulta
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                ¿Qué es Generative UI?
              </h2>
              <p>
                <strong>Generative UI</strong> (o Interfaz Generativa) es un
                paradigma donde los componentes visuales de una aplicación no
                son prediseñados, sino generados dinámicamente por un LLM en
                respuesta a la intención del usuario. En lugar de renderizar
                pantallas fijas, el sistema produce código de interfaz
                —típicamente React/JSX— que se ejecuta en tiempo real en el
                navegador.
              </p>
              <p>
                El concepto no es puramente teórico. Vercel ya experimenta con
                esto en su SDK <em>AI SDK UI</em>; Anthropic ha impulsado el{" "}
                <em>Model Context Protocol (MCP)</em> como estándar para
                conectar LLMs a herramientas y APIs externas; y varios
                laboratorios de investigación exploran cómo hacer que estas
                interfaces sean confiables, rápidas y evaluables.
              </p>
              <blockquote className="border-l-4 border-primary/60 bg-muted/30 pl-5 pr-4 py-3 italic text-foreground/90 rounded-r-lg">
                La interfaz del futuro no se diseña de antemano, se sintetiza en
                el momento en que el usuario la necesita.
              </blockquote>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Cómo funciona por dentro
              </h2>
              <p>
                El pipeline de un sistema de Generative UI tiene varios
                componentes que trabajan en cadena:
              </p>
              <ul className="list-none space-y-3 pl-0">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    ①
                  </span>
                  <span>
                    <strong className="text-foreground">
                      Consulta del usuario
                    </strong>{" "}
                    — &quot;Ponme la canción más escuchada de Bad Bunny esta
                    semana&quot;
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    ②
                  </span>
                  <span>
                    <strong className="text-foreground">Widget Registry</strong>{" "}
                    — El sistema busca en su índice si ya existe un widget
                    similar generado anteriormente. Si la similitud semántica es
                    alta, lo reutiliza directamente sin llamar al LLM.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    ③
                  </span>
                  <span>
                    <strong className="text-foreground">Motor LLM</strong> — Si
                    no hay un widget adecuado, el LLM genera código JSX nuevo
                    conectado a la API de Spotify, tomando como contexto el
                    esquema del conector y plantillas previas.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    ④
                  </span>
                  <span>
                    <strong className="text-foreground">
                      Renderizado seguro
                    </strong>{" "}
                    — El JSX se ejecuta en un sandbox (Sandpack) en el
                    navegador. El usuario ve e interactúa con el widget sin
                    riesgo de ejecución de código arbitrario.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    ⑤
                  </span>
                  <span>
                    <strong className="text-foreground">
                      Aprendizaje continuo
                    </strong>{" "}
                    — El widget generado se indexa automáticamente en el
                    Registry para ser reutilizado en consultas futuras
                    similares, reduciendo latencia y costo de API.
                  </span>
                </li>
              </ul>
              <p>
                El componente más innovador de esta arquitectura es el{" "}
                <strong className="text-foreground">Widget Registry</strong>: un
                índice vectorial semántico (construido sobre FAISS) que almacena
                los widgets generados previamente junto con una representación
                vectorial de su descripción. El sistema entonces decide entre
                tres modos:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>REUTILIZAR</strong> (similitud ≥ 0.85): devuelve el
                  widget existente sin llamar al LLM. Latencia ~5ms.
                </li>
                <li>
                  <strong>ADAPTAR</strong> (similitud entre 0.60 y 0.85): ajusta
                  parámetros de un widget existente con una llamada corta al
                  LLM. Latencia ~1.5-2.5s.
                </li>
                <li>
                  <strong>SINTETIZAR</strong> (similitud &lt; 0.60): genera el
                  widget desde cero. Latencia ~3-6s.
                </li>
              </ul>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                La stack tecnológica
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[480px] border-collapse text-base">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-3 text-left font-semibold text-foreground">
                        Componente
                      </th>
                      <th className="p-3 text-left font-semibold text-foreground">
                        Tecnología
                      </th>
                      <th className="p-3 text-left font-semibold text-foreground">
                        Por qué
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr]:border-b [&_tr]:border-border last:[&_tr]:border-0">
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Motor LLM
                      </td>
                      <td className="p-3">Claude 3.5 Haiku / Sonnet</td>
                      <td className="p-3">
                        Excelente generación de código JSX, 200k tokens de
                        contexto, ~$0.001/consulta
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Widget Registry
                      </td>
                      <td className="p-3">FAISS + Sentence-Transformers</td>
                      <td className="p-3">
                        Búsqueda vectorial en memoria, sub-milisegundo, sin
                        servidor externo
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Conectores de API
                      </td>
                      <td className="p-3">Model Context Protocol (MCP)</td>
                      <td className="p-3">
                        Estándar abierto para describir herramientas y APIs al
                        LLM de forma estructurada
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        APIs integradas
                      </td>
                      <td className="p-3">
                        Spotify, OpenWeatherMap, Google Maps
                      </td>
                      <td className="p-3">
                        Casos de uso representativos: música, clima, ubicación
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Backend
                      </td>
                      <td className="p-3">FastAPI + Python</td>
                      <td className="p-3">
                        Async nativo, ecosistema Python para FAISS y ML
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">
                        Renderizado JSX
                      </td>
                      <td className="p-3">React + Sandpack</td>
                      <td className="p-3">
                        Sandbox seguro en el navegador, compilación incremental
                        &lt;400ms
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                ¿Dónde estamos en el Perú y Latinoamérica?
              </h2>
              <p>
                Mientras que los grandes laboratorios de EE.UU. y Europa ya
                tienen equipos completos investigando Generative UI, en el
                contexto peruano —y latinoamericano en general— hay una{" "}
                <strong className="text-foreground">
                  brecha enorme entre la adopción de herramientas de IA y la
                  producción de investigación original
                </strong>{" "}
                sobre ellas.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">
                Escasa investigación local en HCI + IA
              </h3>
              <p>
                La mayoría de papers sobre interfaces generativas provienen de
                labs en Stanford, MIT, UCL y CMU. Las universidades peruanas
                tienen muy poca producción en esta intersección específica de
                HCI e IA generativa. Publicar en este espacio hoy equivale a
                escribir en territorio prácticamente virgen a nivel regional.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">
                Usuarios hispanohablantes sin representación
              </h3>
              <p>
                Los benchmarks y estudios de usabilidad de sistemas de
                Generative UI se hacen casi exclusivamente con usuarios
                angloparlantes. El comportamiento de usuarios en español —con
                sus particularidades de formulación de consultas y expectativas
                culturales— está prácticamente sin estudiar.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">
                Ecosistema de producto digital en crecimiento
              </h3>
              <p>
                El ecosistema peruano de startups tech está madurando (Culqui,
                Rextie, Prestamype, entre otras). Estas empresas necesitan
                interfaces más inteligentes pero no tienen referentes locales de
                investigación en los que apoyarse.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">
                Vacío en metodología de evaluación
              </h3>
              <p>
                No existe una metodología validada localmente para medir la
                efectividad de sistemas de Generative UI. Cualquier empresa que
                quiera adoptar esta tecnología parte desde cero sin benchmarks
                de referencia ni criterios de éxito claros.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">
                Latencia y conectividad como factor real
              </h3>
              <p>
                En mercados como el peruano, donde la conectividad todavía es
                desigual entre Lima y el interior del país, la optimización de
                latencia mediante reutilización de widgets no es un lujo
                académico: es una ventaja funcional real.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">
                APIs de servicios locales sin explorar
              </h3>
              <p>
                Yape, Tunki, apps de transporte urbano, sistemas de información
                de municipalidades: existe una cantidad enorme de servicios
                locales que aún no han sido conectados a interfaces
                conversacionales generativas.
              </p>

              <blockquote className="border-l-4 border-primary/60 bg-muted/30 pl-5 pr-4 py-3 rounded-r-lg">
                <strong className="text-foreground">
                  La oportunidad concreta:
                </strong>{" "}
                el primer grupo o persona que establezca metodología, benchmarks
                y evidencia empírica sobre Generative UI en contexto
                hispanohablante definirá el lenguaje en el que se habla del tema
                durante los próximos años.
              </blockquote>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Lo que estoy investigando
              </h2>
              <p>
                Actualmente desarrollo mi tesis sobre la generación dinámica de
                widgets mediante LLMs, combinando un motor de síntesis basado en
                Claude API con un Widget Registry semántico y conectores MCP
                para Spotify, OpenWeatherMap y Google Maps.
              </p>
              <p>
                El estudio controlado con <strong>n=30 participantes</strong>{" "}
                busca responder cuatro preguntas concretas:
              </p>
              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  ¿Los widgets generados dinámicamente mejoran la tasa de
                  completitud de tareas respecto a respuestas en texto plano?{" "}
                  <em>(hipótesis: ≥ 75% TCR)</em>
                </li>
                <li>
                  ¿Los usuarios prefieren la interfaz generativa sobre la
                  textual?{" "}
                  <em>(hipótesis: ≥ 65% win rate en preferencia pairwise)</em>
                </li>
                <li>
                  ¿El Widget Registry reduce efectivamente la latencia del
                  sistema? <em>(hipótesis: reducción ≥ 40%)</em>
                </li>
                <li>
                  ¿Los widgets alcanzan un estándar de calidad UX aceptable
                  según evaluadores expertos?{" "}
                  <em>(hipótesis: ≥ 7.0/10 en escala UICrit)</em>
                </li>
              </ol>
              <p>
                El diseño experimental usa un esquema within-subjects con
                contrabalanceo y corrección de Bonferroni (α ajustado = 0.0125
                por hipótesis) para controlar el error de tipo I en
                comparaciones múltiples.
              </p>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                ¿Qué viene después?
              </h2>
              <p>
                Si los resultados confirman las hipótesis, las implicaciones son
                amplias para el contexto local:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong className="text-foreground">Banca digital</strong> —
                  Interfaces que generan vistas personalizadas de estados de
                  cuenta, alertas y simulaciones de crédito según la consulta
                  específica de cada usuario.
                </li>
                <li>
                  <strong className="text-foreground">Salud</strong> — Widgets
                  de seguimiento de síntomas o recordatorios de medicación
                  generados dinámicamente según el perfil del paciente.
                </li>
                <li>
                  <strong className="text-foreground">Educación</strong> —
                  Ejercicios interactivos generados on-demand según el nivel y
                  los errores recientes del estudiante.
                </li>
                <li>
                  <strong className="text-foreground">Gobierno digital</strong>{" "}
                  — Interfaces conversacionales para trámites que generen
                  exactamente los formularios y pasos necesarios para la
                  situación particular de cada ciudadano.
                </li>
                <li>
                  <strong className="text-foreground">E-commerce</strong> —
                  Páginas de producto que se adaptan en tiempo real a la
                  intención de búsqueda.
                </li>
              </ul>
              <p>
                El desafío pendiente sigue siendo triple: reducir el costo de
                API de los LLMs a niveles sostenibles para productos locales,
                garantizar consistencia de calidad en los widgets generados, y
                construir la confianza del usuario en interfaces que cambian con
                cada consulta.
              </p>
            </section>

            <hr className="border-border" />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Conclusión</h2>
              <p>
                Las interfaces generativas no son ciencia ficción ni hype
                pasajero. Son la consecuencia lógica de tener modelos de
                lenguaje capaces de escribir código en milisegundos, combinados
                con arquitecturas de recuperación semántica que hacen al sistema
                cada vez más eficiente con el uso.
              </p>
              <p>
                Para el ecosistema peruano, el momento es ahora. No porque la
                tecnología sea perfecta —no lo es— sino porque las ventanas de
                oportunidad para establecer referencia local en una tecnología
                emergente son estrechas.
              </p>
              <p>
                Compartiré los resultados del estudio aquí cuando estén
                disponibles. Si estás trabajando en interfaces conversacionales,
                IA generativa aplicada a producto, o simplemente te genera
                curiosidad el tema desde nuestro contexto, escríbeme.
              </p>
            </section>
          </article>

          <div className="mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Detalles del artículo
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="h-4 w-4 shrink-0 text-primary" />
                <span>Edinson Nuñez More</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0 text-primary" />
                <span>Febrero 2026 · Lima, Perú</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>8 min de lectura</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Tag className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs font-medium">Temas</span>
              </div>
              <p className="text-xs text-muted-foreground">
                IA · UX Research · LLMs · Generative UI
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
