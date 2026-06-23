import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InternalLayout } from "@/presentation/components/internal/InternalLayout";
import { ShareButtons } from "@/presentation/components/blog/ShareButtons";
import { buildBlogMetadata } from "../blog-metadata";

export const metadata: Metadata = buildBlogMetadata({
  slug: "ya-no-alcanzan-las-horas",
  title:
    "La extraña sensación de que ya no alcanzan las horas para todas las ideas",
  description:
    "Una reflexión sobre crear con IA no como producto ni objetivo, sino como compañera de exploración: pasar de '¿cómo construyo esto?' a '¿qué quiero que sienta quien lo use?'.",
});

export default function YaNoAlcanzanLasHorasBlogPage() {
  return (
    <InternalLayout>
      <main className="mx-auto flex w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Blog · Reflexión
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          La extraña sensación de que ya no alcanzan las horas para todas las
          ideas
        </h1>

        <article className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>Hay algo curioso que llevo tiempo observando.</p>
          <p>Cada vez veo a más personas experimentando con inteligencia artificial.</p>
          <p>
            No solo desarrolladores. También diseñadores, escritores,
            ilustradores, emprendedores… personas que, de una u otra forma,
            disfrutan creando.
          </p>
          <p>Desde fuera parece que todos están haciendo cosas completamente distintas.</p>
          <p>Unos construyen agentes.</p>
          <p>Otros crean aplicaciones.</p>
          <p>Hay quienes generan imágenes.</p>
          <p>Quienes escriben.</p>
          <p>Quienes diseñan experiencias.</p>
          <p>Quienes mezclan todo lo anterior.</p>
          <p>
            Y, sin embargo, tengo la sensación de que muchos estamos buscando
            exactamente lo mismo.
          </p>
          <p>Aunque todavía no sepamos ponerle nombre.</p>

          <hr className="border-border" />

          <p>Durante mucho tiempo pensé que estaba aprendiendo a usar nuevas herramientas.</p>
          <p>Después creí que estaba aprendiendo a construir más rápido.</p>
          <p>Hoy ya no estoy tan seguro.</p>
          <p>
            Si alguien revisara mis conversaciones de los últimos meses
            probablemente pensaría que pertenecen a personas distintas.
          </p>
          <p>Un día estoy hablando de arquitectura de software.</p>
          <p>
            Al siguiente, imaginando cómo un agente puede convertirse en parte
            de un producto.
          </p>
          <p>
            Después aparecen preguntas sobre interfaces, experiencia de usuario
            o narrativa.
          </p>
          <p>
            Más tarde termino diseñando un personaje, explorando una identidad
            visual o intentando descubrir cómo una ilustración puede transmitir
            una idea mejor que un párrafo entero.
          </p>
          <p>Durante un tiempo pensé que estaba saltando de un tema a otro.</p>
          <p>Ahora creo que todas esas conversaciones respondían a la misma búsqueda.</p>

          <hr className="border-border" />

          <p>No estaba intentando aprender más sobre inteligencia artificial.</p>
          <p>Estaba intentando descubrir una nueva forma de crear.</p>
          <p>Una donde la IA no fuera el producto.</p>
          <p>Ni el objetivo.</p>
          <p>Sino un compañero de exploración.</p>
          <p>Una herramienta para probar ideas antes de descartarlas.</p>
          <p>Para visualizar aquello que solo existía en la imaginación.</p>
          <p>Para conectar disciplinas que antes parecían lejanas entre sí.</p>
          <p>Para pasar de una idea a una emoción sin que el camino fuera tan largo.</p>

          <hr className="border-border" />

          <p>Y fue entonces cuando empecé a hacerme una pregunta diferente.</p>
          <p>No ¿cómo puedo construir esto?</p>
          <p>Sino...</p>
          <p>¿Qué quiero que sienta la persona que lo use?</p>
          <p>Esa pregunta cambió muchas cosas.</p>
          <p>Porque una aplicación puede resolver un problema.</p>
          <p>Pero también puede transmitir calma.</p>
          <p>Puede despertar curiosidad.</p>
          <p>Puede inspirar confianza.</p>
          <p>Puede hacer sonreír.</p>
          <p>
            Puede hacer que alguien sienta que ese producto fue pensado para él.
          </p>
          <p>Y casi nunca recordamos esas cosas cuando hablamos de tecnología.</p>

          <hr className="border-border" />

          <p>Creo que ahí hay una oportunidad enorme.</p>
          <p>
            Estamos dedicando mucho tiempo a descubrir cómo hacer que la IA
            genere código, imágenes o texto.
          </p>
          <p>Pero quizá la conversación más interesante sea otra.</p>
          <p>
            ¿Cómo usamos toda esa capacidad para construir productos con más
            intención?
          </p>
          <p>¿Cómo hacemos que una interfaz refleje una idea?</p>
          <p>Que una animación tenga un propósito.</p>
          <p>Que un personaje represente una filosofía.</p>
          <p>
            Que una experiencia digital transmita algo que el usuario no pueda
            explicar con palabras, pero sí pueda sentir.
          </p>
          <p>
            Porque al final, eso es lo que recordamos de las cosas que realmente
            nos marcan.
          </p>
          <p>No todos sus detalles.</p>
          <p>Sino cómo nos hicieron sentir.</p>

          <hr className="border-border" />

          <p>No sé si esa es la respuesta.</p>
          <p>De hecho, creo que sigo buscándola.</p>
          <p>Y sospecho que muchos también.</p>
          <p>Tal vez por eso seguimos abriendo un nuevo chat.</p>
          <p>Probando otra idea.</p>
          <p>Descartándola.</p>
          <p>Empezando una más.</p>
          <p>No porque la anterior estuviera mal.</p>
          <p>Sino porque intuimos que todavía hay algo más.</p>
          <p>Algo que aún no sabemos nombrar.</p>
          <p>
            Quizá el verdadero potencial de la inteligencia artificial no esté
            en ayudarnos a construir más rápido.
          </p>
          <p>
            Quizá esté en permitirnos dedicar más tiempo a aquello que nadie
            ve...
          </p>
          <p>...pero todos sienten.</p>
        </article>

        <div className="mt-12">
          <ShareButtons
            slug="ya-no-alcanzan-las-horas"
            title="La extraña sensación de que ya no alcanzan las horas para todas las ideas"
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
