import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InternalLayout } from "@/presentation/components/internal/InternalLayout";
import { ShareButtons } from "@/presentation/components/blog/ShareButtons";
import { buildBlogMetadata } from "../blog-metadata";

export const metadata: Metadata = buildBlogMetadata({
  slug: "ingenieria-con-intencion",
  title: "Ingeniería con intención",
  description:
    "Resolver un problema es solo el punto de partida. Una reflexión sobre construir software pensando en la intención y en cómo una experiencia hace sentir a las personas.",
  image: "/blog/ingenieria-con-intencion.png",
});

export default function IngenieriaConIntencionBlogPage() {
  return (
    <InternalLayout>
      <main className="mx-auto flex w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Blog · Reflexión
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          Ingeniería con intención
        </h1>

        <article className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Durante mucho tiempo pensé que un buen producto era aquel que
            resolvía un problema.
          </p>
          <p>Con los años aprendí que eso solo es el punto de partida.</p>
          <p>
            Porque resolver un problema no garantiza que una persona disfrute
            usarlo.
          </p>
          <p>No garantiza que confíe en él.</p>
          <p>No garantiza que quiera volver.</p>
          <p>Y mucho menos que lo recuerde.</p>

          <hr className="border-border" />

          <p>
            Como ingenieros, dedicamos gran parte de nuestro tiempo a responder
            preguntas técnicas.
          </p>
          <p>¿Cómo hacemos que sea más rápido?</p>
          <p>¿Cómo escalamos esta arquitectura?</p>
          <p>¿Cómo reducimos la complejidad?</p>
          <p>¿Cómo hacemos el código más mantenible?</p>
          <p>Son preguntas necesarias.</p>
          <p>Pero hace algún tiempo empecé a preguntarme si eran suficientes.</p>

          <hr className="border-border" />

          <p>
            ¿Qué pasa con las preguntas que no aparecen en un documento de
            requisitos?
          </p>
          <p>
            ¿Qué queremos que sienta una persona la primera vez que entra a
            nuestra aplicación?
          </p>
          <p>¿Qué queremos transmitir con esa animación?</p>
          <p>¿Por qué elegimos una palabra y no otra?</p>
          <p>¿Por qué un personaje?</p>
          <p>¿Por qué ese color?</p>
          <p>¿Por qué ese silencio antes de mostrar un mensaje importante?</p>
          <p>Son decisiones pequeñas.</p>
          <p>Tan pequeñas que muchas veces parecen irrelevantes.</p>
          <p>
            Sin embargo, suelen ser las que terminan definiendo la experiencia.
          </p>

          <hr className="border-border" />

          <p>
            La ingeniería siempre me enseñó a construir sistemas que
            funcionaran.
          </p>
          <p>
            La inteligencia artificial, curiosamente, empezó a empujarme hacia
            otro lugar.
          </p>
          <p>No porque escribiera código por mí.</p>
          <p>
            Sino porque eliminó muchas de las barreras que existían entre
            imaginar una idea y poder verla.
          </p>
          <p>De repente podía probar.</p>
          <p>Equivocarme.</p>
          <p>Descartar.</p>
          <p>Volver a intentar.</p>
          <p>
            Y, en medio de ese proceso, descubrí que muchas de las preguntas que
            más me interesaban ya no eran técnicas.
          </p>
          <p>Eran humanas.</p>

          <hr className="border-border" />

          <p>
            Me encontré pensando menos en funcionalidades y más en intención.
          </p>
          <p>¿Cómo hacer que una interfaz transmita calma?</p>
          <p>
            ¿Cómo lograr que una ilustración represente una idea y no solo
            decore una pantalla?
          </p>
          <p>
            ¿Cómo hacer que un usuario sienta que alguien pensó en él mientras
            diseñaba esa experiencia?
          </p>
          <p>Ninguna de esas preguntas tiene una respuesta correcta.</p>
          <p>Y quizá por eso me parecen tan interesantes.</p>

          <hr className="border-border" />

          <p>
            Creo que estamos entrando en una etapa donde construir software
            dejará de ser el mayor desafío.
          </p>
          <p>
            Las herramientas seguirán reduciendo el tiempo necesario para
            desarrollar funcionalidades.
          </p>
          <p>Los modelos seguirán escribiendo código.</p>
          <p>Los agentes serán cada vez más capaces.</p>
          <p>
            Eso hará que la diferencia entre un producto y otro ya no dependa
            únicamente de la tecnología.
          </p>
          <p>Dependerá de la intención detrás de ella.</p>

          <hr className="border-border" />

          <p>La intención no aparece en un backlog.</p>
          <p>No puede estimarse en puntos de historia.</p>
          <p>No se despliega en producción.</p>
          <p>Pero está presente en cada decisión.</p>
          <p>En la palabra que decides cambiar.</p>
          <p>En una transición que hace más natural una interacción.</p>
          <p>En un personaje que representa la personalidad de una marca.</p>
          <p>En un mensaje de error que tranquiliza en lugar de frustrar.</p>
          <p>
            En esos detalles que nadie suele pedir, pero que todos terminan
            recordando.
          </p>

          <hr className="border-border" />

          <p>Tal vez eso sea, para mí, la ingeniería con intención.</p>
          <p>No dejar de pensar como ingeniero.</p>
          <p>Sino ampliar el alcance de las preguntas que hacemos.</p>
          <p>
            Seguir preocupándonos por la arquitectura, el rendimiento y la
            calidad del código.
          </p>
          <p>
            Pero sin olvidar que, al otro lado de cada pantalla, siempre hay una
            persona.
          </p>
          <p>
            Y que la mejor tecnología no es necesariamente la que más impresiona.
          </p>
          <p>
            Es la que consigue que alguien se sienta comprendido, acompañado o
            inspirado, sin darse cuenta de todo el trabajo que hubo detrás.
          </p>
          <p>Porque al final, las personas olvidan los frameworks.</p>
          <p>Olvidan las versiones.</p>
          <p>Olvidan incluso muchas funcionalidades.</p>
          <p>
            Pero rara vez olvidan cómo una experiencia las hizo sentir.
          </p>
          <p>
            Y quizá esa sea la responsabilidad más bonita que tenemos como
            ingenieros.
          </p>
        </article>

        <div className="mt-12">
          <ShareButtons
            slug="ingenieria-con-intencion"
            title="Ingeniería con intención"
          />
        </div>

        <div className="mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </main>
    </InternalLayout>
  );
}
