import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:
    "Mucha experiencia, cero respuestas: lo que nadie te dice sobre buscar trabajo en 2026",
  description:
    "Reflexión sobre buscar trabajo en 2026: mercados cambiantes, procesos largos, inglés intermedio y la decisión de evolucionar con IA y proyectos como Gravion.",
};

export default function BuscarTrabajoEn2026BlogPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Blog · Reflexión
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
        Mucha experiencia, cero respuestas: lo que nadie te dice sobre buscar
        trabajo en 2026
      </h1>

      <article className="mt-8 space-y-8 text-lg leading-relaxed text-muted-foreground">
        <p>Desde diciembre de 2025 estoy buscando trabajo.</p>
        <p>
          Salí de Tekton, empresa en la que trabajé desde 2023. Incluso antes de
          terminar el proyecto en el que estaba asignado, ya estaba revisando
          ofertas.
        </p>
        <p>
          Después de haber trabajado en empresas como Globant, NTT Data y
          Belatrix, con clientes en Costa Rica como Ridivi y proyectos para
          clientes de Estados Unidos, pensé que el proceso sería más simple.
        </p>
        <p>No lo ha sido.</p>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El mercado cambió… y no avisó
          </h2>
          <p>
            Durante años nos dijeron que acumuláramos experiencia. Que
            trabajáramos con clientes internacionales. Que aprendiéramos buenas
            prácticas. Que construyéramos un buen historial.
          </p>
          <p>Lo hice.</p>
          <p>Y aun así, el mercado actual no funciona como antes.</p>
          <p>
            Los procesos de selección se volvieron extensos, impersonales y
            altamente filtrados. Antes eran 2 o 3 entrevistas. Ahora pueden ser:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Filtro de reclutador</li>
            <li>Entrevista técnica</li>
            <li>Live coding</li>
            <li>Evaluación tipo Google</li>
            <li>Entrevista con cliente</li>
            <li>Entrevista cultural</li>
            <li>Otra validación más</li>
          </ul>
          <p>Y al final… silencio.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Volver a estudiar como si estuviera empezando
          </h2>
          <p>
            Después de años desarrollando software en producción, me encontré
            repasando:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Notación Big O</li>
            <li>Estructuras de datos</li>
            <li>Problemas tipo Google</li>
            <li>Ejercicios en HackerRank</li>
            <li>Retos en GreatFrontend</li>
          </ul>
          <p>No porque no supiera programar.</p>
          <p>
            Sino porque el mercado decidió que ahora hay que demostrarlo de otra
            forma.
          </p>
          <p>
            Es curioso: puedes tener años resolviendo problemas reales, pero si
            no pasas un ejercicio cronometrado frente a una cámara, parece que
            no cuentas.
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El inglés intermedio: una barrera real
          </h2>
          <p>Tengo inglés intermedio.</p>
          <p>
            Puedo comunicarme, leer documentación, participar en reuniones
            técnicas. Pero no soy completamente fluido.
          </p>
          <p>
            Y en un mercado donde muchas posiciones exigen comunicación
            constante en inglés, eso pesa.
          </p>
          <p>
            Encontrar un puesto donde se hable solo español y mantener el nivel
            salarial que tenía… es cada vez más difícil.
          </p>
          <p>No es una queja. Es una realidad.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Lo más desgastante no es el rechazo
          </h2>
          <p>Es la incertidumbre.</p>
          <p>Es pasar múltiples etapas.</p>
          <p>Es que te digan que avanzaste.</p>
          <p>Es que te feliciten.</p>
          <p>Y luego no volver a saber nada.</p>
          <p>Buscar trabajo hoy no es solo un reto técnico.</p>
          <p>Es un reto emocional.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            El giro inesperado: convertirme en &quot;El programador
            aumentado&quot;
          </h2>
          <p>En medio de este proceso entendí algo importante:</p>
          <p>
            No puedo controlar el mercado. Pero sí puedo controlar cómo
            evoluciono.
          </p>
          <p>
            Durante los últimos años he optimizado profundamente mi flujo de
            desarrollo asistido por inteligencia artificial.
          </p>
          <p>No como moda. No como experimento.</p>
          <p>Sino como parte real de mi día a día.</p>
          <p>De esa experiencia nació mi libro:</p>
          <h3 className="text-xl font-bold text-foreground mt-6">
            📘 El programador aumentado
          </h3>
          <p>
            Un enfoque práctico sobre cómo integrar la IA en el flujo diario de
            desarrollo.
          </p>
          <p>
            Porque el futuro no es competir contra la inteligencia artificial.
          </p>
          <p>Es aprender a amplificar nuestras capacidades con ella.</p>
          <p>
            Mientras algunos procesos me exigían resolver algoritmos como en
            2015, yo estaba construyendo cómo desarrollar mejor en 2026.
          </p>
          <p>
            <Button asChild variant="outline" size="sm">
              <Link href="/blog/el-programador-aumentado">
                Conocer el libro
              </Link>
            </Button>
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Gravion: construir mientras busco
          </h2>
          <p>Además, estoy desarrollando un proyecto llamado Gravion.</p>
          <p>
            Un scaffolding que sincroniza tecnología, frameworks e inteligencia
            artificial.
          </p>
          <p>
            Una forma estructurada de acercar a los desarrolladores a la
            integración real de IA en su flujo diario.
          </p>
          <p>
            Si el mercado se volvió más exigente, mi respuesta no será
            retroceder.
          </p>
          <p>Será evolucionar.</p>
        </section>

        <hr className="border-border" />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Esto no es derrota
          </h2>
          <p>Es transición.</p>
          <p>
            Sigo postulando. Sigo preparándome. Sigo estudiando. Sigo
            construyendo.
          </p>
          <p>
            Y aunque el proceso es frustrante, también me está obligando a
            crecer de formas que no hubiera elegido voluntariamente.
          </p>
          <p>Tal vez este momento no sea una caída.</p>
          <p>Tal vez sea el punto exacto donde comienza algo más grande.</p>
        </section>
      </article>

      <div className="mt-10">
        <Button asChild variant="outline" size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
