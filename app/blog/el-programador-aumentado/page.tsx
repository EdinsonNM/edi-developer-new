import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "El Programador Aumentado",
  description:
    "Cómo pasar del vibe coding al desarrollo asistido por IA con intención, contexto y criterio profesional.",
};

export default function ElProgramadorAumentadoBlogPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-16 text-foreground md:px-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
        <section className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Blog · Libro
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            No necesitas aprender más herramientas. Necesitas aprender a
            trabajar mejor.
          </h1>

          <article className="mt-8 space-y-8 text-lg leading-relaxed text-muted-foreground">
        <p>
          Vivimos en una época curiosa para quienes construimos software.
        </p>

        <div className="space-y-1">
          <p>Nunca fue tan fácil generar código.</p>
          <p>Nunca fue tan rápido avanzar.</p>
          <p>Nunca fue tan accesible empezar algo nuevo.</p>
        </div>

        <p>Y, sin embargo, nunca fue tan fácil sentirse perdido.</p>

        <p>
          Muchos desarrolladores hoy producen más que nunca… pero entienden
          menos de lo que construyen. La inteligencia artificial escribe
          funciones, propone arquitecturas, genera tests, refactoriza y
          documenta. Todo parece avanzar.
        </p>

        <p>Pero aparece una pregunta incómoda:</p>

        <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-700">
          ¿Estoy mejorando como profesional… o solo soy más rápido usando
          herramientas?
        </blockquote>

        <p>Ahí empieza el verdadero problema.</p>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El mito de la productividad
          </h2>
          <p>
            La narrativa dominante dice que la IA te hará más productivo. Y es
            cierto.
          </p>
          <p>Pero la productividad sin criterio es peligrosa.</p>
          <p>Puedes generar:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>más código</li>
            <li>más features</li>
            <li>más soluciones</li>
          </ul>
          <p>sin necesariamente construir:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>mejores sistemas</li>
            <li>mejor arquitectura</li>
            <li>mejor entendimiento</li>
          </ul>
          <p>
            El software no falla cuando falta velocidad. Falla cuando falta
            comprensión.
          </p>
          <p>Y eso no lo resuelve ninguna herramienta.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El momento en que algo cambia
          </h2>
          <p>Muchos desarrolladores ya pasaron por esto sin darse cuenta:</p>
          <ol className="list-decimal space-y-1 pl-6">
            <li>Empiezan usando IA para probar cosas.</li>
            <li>Luego la usan para resolver tareas repetitivas.</li>
            <li>Después empiezan a delegar partes completas.</li>
            <li>Finalmente… empiezan a depender.</li>
          </ol>
          <p>Y en ese punto aparece una sensación extraña:</p>
          <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-700">
            Avanzo mucho… pero no sé exactamente cuánto estoy entendiendo.
          </blockquote>
          <p>Ese es el punto de inflexión profesional.</p>
          <p>
            No porque la IA sea mala. Sino porque cambia tu rol.
          </p>
          <p>
            Ya no se trata solo de escribir código. Se trata de decidir qué se
            construye, cómo se valida y qué se mantiene bajo control.
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            La nueva diferencia entre programar y construir software
          </h2>
          <p>Antes:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>pensabas</li>
            <li>diseñabas</li>
            <li>escribías</li>
            <li>probabas</li>
          </ul>
          <p>Ahora:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>describes</li>
            <li>iteras</li>
            <li>validas</li>
            <li>decides</li>
          </ul>
          <p>
            El desarrollador deja de ser quien escribe cada línea… y pasa a ser
            quien dirige el proceso.
          </p>
          <p>La IA produce.</p>
          <p>El ingeniero decide.</p>
          <p>
            Y esa diferencia es la que define el valor profesional en los
            próximos años.
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El problema real no es la IA
          </h2>
          <p>El riesgo no está en usarla. Está en usarla sin un sistema.</p>
          <p>Cuando todo funciona:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>se acepta código sin cuestionarlo</li>
            <li>se integran soluciones sin comprenderlas</li>
            <li>se delegan decisiones técnicas</li>
          </ul>
          <p>
            Y el sistema crece más rápido que el criterio que lo sostiene.
          </p>
          <p>Ese es el verdadero riesgo del desarrollo moderno.</p>
          <p>No la automatización.</p>
          <p>La pérdida de claridad.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Lo que nadie te dice sobre mejorar como desarrollador hoy
          </h2>
          <p>Mejorar ya no significa solo:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>aprender frameworks</li>
            <li>memorizar sintaxis</li>
            <li>dominar librerías</li>
          </ul>
          <p>Significa aprender a:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>decidir qué delegar y qué no</li>
            <li>trabajar con IA sin perder control</li>
            <li>diseñar sistemas, no solo funciones</li>
            <li>
              sostener coherencia técnica mientras todo se acelera
            </li>
          </ul>
          <p>La habilidad crítica del futuro no es escribir código.</p>
          <p>Es dirigir cómo se crea.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El desarrollador que crece no es el que usa más IA
          </h2>
          <p>Es el que:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>entiende el problema antes de pedir soluciones</li>
            <li>cuestiona lo que la IA propone</li>
            <li>valida decisiones técnicas</li>
            <li>piensa en arquitectura, no en snippets</li>
            <li>construye sistemas sostenibles</li>
          </ul>
          <p>Ese profesional no compite con la IA.</p>
          <p>Trabaja con ella.</p>
          <p>Y la convierte en ventaja.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Entonces… ¿por dónde empezar?
          </h2>
          <p>La mayoría de contenido allá afuera te enseña:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>prompts</li>
            <li>herramientas</li>
            <li>automatizaciones</li>
          </ul>
          <p>Pero eso es solo la superficie.</p>
          <p>El verdadero cambio ocurre cuando entiendes:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>cómo integrar IA dentro de tu proceso</li>
            <li>
              cómo diseñar contexto para que trabaje alineada a tu proyecto
            </li>
            <li>
              cómo pasar de experimentar… a trabajar profesionalmente con ella
            </li>
          </ul>
          <p>
            Ahí es donde la mejora deja de ser teórica y se vuelve práctica.
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Este es el punto del que nace <em>El Programador Aumentado</em>
          </h2>
          <p>No es un libro sobre inteligencia artificial.</p>
          <p>
            Es un libro sobre cómo seguir creciendo como desarrollador en un
            mundo donde la IA ya forma parte del trabajo.
          </p>
          <p>No te enseña a pedir código.</p>
          <p>Te enseña a:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>trabajar con IA con criterio de ingeniería</li>
            <li>construir sistemas y no solo features</li>
            <li>diseñar contexto para equipos y modelos</li>
            <li>pasar del “vibe coding” al desarrollo profesional asistido</li>
            <li>
              entender dónde realmente está el valor del desarrollador hoy
            </li>
          </ul>
          <p>Porque el cambio ya ocurrió.</p>
          <p>La pregunta es otra:</p>
          <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-700">
            ¿Vas a usar la IA… o vas a evolucionar con ella?
          </blockquote>
          <p>
            Si te importa mejorar como profesional, no solo producir más… este
            libro es para ti.
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
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/el-programador-aumentado/zorro-que-podria-salir-mal.png"
              alt="Ilustración de El Programador Aumentado"
              width={1200}
              height={800}
              className="h-auto w-full object-contain"
              priority
            />
          </div>

          <Button asChild size="lg" className="h-12 w-full bg-foreground text-background hover:bg-foreground/90 text-base font-semibold shadow-lg">
            <a
              href="https://medinson.gumroad.com/l/sgdywj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar El Programador Aumentado
            </a>
          </Button>
        </aside>
      </div>
    </main>
  );
}
