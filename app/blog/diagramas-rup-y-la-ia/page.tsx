import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InternalLayout } from "@/presentation/components/internal/InternalLayout";
import { BlogPostHeader } from "@/presentation/components/blog/BlogPostHeader";
import { buildBlogMetadata } from "../blog-metadata";

export const metadata: Metadata = buildBlogMetadata({
  slug: "diagramas-rup-y-la-ia",
  title: "¿Y si los diagramas RUP no estaban muertos, sino esperando a la IA?",
  description:
    "Durante años los diagramas RUP y UML quedaron en el olvido por lo costoso de mantenerlos. Una reflexión sobre cómo la IA puede convertirlos en documentación viva: el puente entre la intención humana y la construcción de software con Gravion.",
  image: "/blog/diagramas-rup-y-la-ia-cover.jpg",
});

export default function DiagramasRupYLaIaBlogPage() {
  return (
    <InternalLayout>
      <main className="mx-auto flex w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
        <BlogPostHeader
          slug="diagramas-rup-y-la-ia"
          title="¿Y si los diagramas RUP no estaban muertos, sino esperando a la IA?"
          category="Reflexión"
        />

        <article className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Durante años, en la universidad, muchos ingenieros de software
            aprendimos sobre casos de uso, diagramas de clases, secuencia,
            componentes, actividades y otros artefactos asociados a RUP y UML.
          </p>
          <p>
            Nos explicaban que estos diagramas servían para entender mejor el
            sistema antes de construirlo. Ayudaban a ordenar requerimientos,
            visualizar actores, flujos, responsabilidades y relaciones entre
            partes del software. En teoría, eran una base sólida para
            desarrollar aplicaciones bien pensadas.
          </p>
          <p>Pero luego llegó la realidad.</p>
          <div className="space-y-1">
            <p>Los requerimientos cambiaban.</p>
            <p>El cliente modificaba prioridades.</p>
            <p>El equipo encontraba nuevas restricciones técnicas.</p>
            <p>El negocio evolucionaba más rápido que la documentación.</p>
          </div>
          <p>
            Y mantener esos diagramas actualizados se volvía costoso. Muchas
            veces terminaban siendo capturas congeladas de una idea antigua,
            documentos que existían en una carpeta pero que ya no representaban
            el sistema real.
          </p>
          <p>
            Con la aceleración del desarrollo moderno, metodologías ágiles,
            despliegues continuos y ciclos cada vez más cortos, estos artefactos
            fueron quedando de lado. No porque no fueran útiles, sino porque
            mantenerlos vivos requería demasiado esfuerzo manual.
          </p>

          <hr className="border-border" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Pero la IA cambia el contexto
            </h2>
            <p>Hoy estamos entrando en una etapa distinta.</p>
            <p>
              La inteligencia artificial está transformando la forma en que
              diseñamos, construimos y mantenemos software. Y en este nuevo
              escenario, los diagramas vuelven a tener una importancia enorme.
            </p>
            <p>¿Por qué?</p>
            <p>
              Porque un diagrama bien estructurado no es solo documentación
              visual. Es contexto. Es intención. Es arquitectura comunicada de
              forma explícita.
            </p>
            <p>Para una IA que ayuda a construir software, ese contexto es oro.</p>
            <p>Un diagrama de casos de uso puede decirle a la IA:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Quiénes interactúan con el sistema.</li>
              <li>Qué funcionalidades existen.</li>
              <li>Qué relaciones hay entre procesos.</li>
              <li>Qué comportamiento se espera.</li>
              <li>Qué partes del sistema deben mantenerse coherentes.</li>
            </ul>
          </section>

          <figure className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src="/blog/diagramas-rup-casos-de-uso.jpg"
                alt="Diagrama de casos de uso en Gravion: los actores Cliente y Usuario conectados a casos de uso UC-001 a UC-010."
                width={1296}
                height={1007}
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground/80">
              Un diagrama de casos de uso en Gravion: actores, funcionalidades y
              relaciones expresadas de forma explícita.
            </figcaption>
          </figure>

          <p>
            Antes, el problema era que los diagramas envejecían rápido. Ahora,
            la IA puede ayudarnos a actualizarlos, interpretarlos y conectarlos
            con el código real.
          </p>
          <p>Eso convierte la documentación en algo vivo.</p>

          <hr className="border-border" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              De documentación estática a documentación viva
            </h2>
            <p>
              La gran oportunidad no está en volver al pasado ni en usar RUP como
              se usaba hace 20 años.
            </p>
            <p>
              La oportunidad está en reinterpretar estos diagramas para el
              desarrollo moderno.
            </p>
            <p>
              Imagina un sistema donde los casos de uso no son solo dibujos en
              una herramienta, sino una fuente de verdad que alimenta a agentes
              de IA, asistentes de desarrollo, generadores de código,
              validadores de arquitectura y documentación automática.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Si cambia un requerimiento, la IA puede ayudar a detectar qué
                diagramas se ven afectados.
              </li>
              <li>
                Si cambia el código, puede sugerir qué parte del modelo debe
                actualizarse.
              </li>
              <li>
                Si entra un nuevo desarrollador, puede entender el sistema desde
                sus flujos principales.
              </li>
              <li>
                Si se construye una nueva funcionalidad, puede partir desde una
                intención claramente modelada.
              </li>
            </ul>
            <p>Eso es lo que estamos explorando con Gravion.</p>
          </section>

          <hr className="border-border" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Gravion: traer los diagramas RUP a la era de la IA
            </h2>
            <p>
              Gravion nace con una idea simple pero potente: modernizar la
              gestión del desarrollo de software usando como base visual y
              conceptual los diagramas RUP, pero adaptados a una nueva realidad
              donde la IA participa activamente en el proceso de construcción.
            </p>
          </section>

          <figure className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src="/blog/diagramas-rup-gravion.jpg"
                alt="Pantalla de bienvenida de Gravion: «Gravion reúne tu flujo de trabajo donde estés»."
                width={1212}
                height={962}
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground/80">
              Gravion: mapas vivos del sistema, compartidos entre humanos e
              inteligencia artificial.
            </figcaption>
          </figure>

          <p>
            No se trata de crear diagramas por cumplir una formalidad académica.
          </p>
          <p>Se trata de crear mapas vivos del sistema.</p>
          <p>
            Mapas que ayuden a humanos y a inteligencia artificial a compartir
            una misma comprensión del producto.
          </p>
          <p>
            Porque si la IA va a escribir código, modificar módulos, sugerir
            arquitectura o mantener funcionalidades, necesita algo más que
            prompts sueltos. Necesita contexto estructurado. Necesita entender el
            “por qué” detrás del software.
          </p>
          <p>Y ahí los diagramas vuelven a brillar.</p>

          <hr className="border-border" />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              La pregunta importante
            </h2>
            <p>
              Durante años dejamos de lado muchos artefactos de análisis porque
              eran difíciles de mantener.
            </p>
            <p>
              Pero si ahora tenemos IA capaz de ayudarnos a crearlos, leerlos,
              actualizarlos y conectarlos con el código, quizá el problema nunca
              fueron los diagramas.
            </p>
            <p>
              Quizá el problema era que no teníamos una forma eficiente de
              mantenerlos vivos.
            </p>
            <p>
              Hoy, con IA, los diagramas RUP pueden pasar de ser documentación
              olvidada a convertirse en una interfaz entre la intención humana y
              la construcción automática de software.
            </p>
            <p>Y eso abre una pregunta interesante:</p>
            <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-700">
              ¿Estamos frente al regreso de los diagramas de software, pero esta
              vez como lenguaje de comunicación entre humanos, equipos e
              inteligencia artificial?
            </blockquote>
          </section>
        </article>

        <div className="mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">Volver al blog</Link>
          </Button>
        </div>
      </main>
    </InternalLayout>
  );
}
