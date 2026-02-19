import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "El Programador Aumentado",
  description:
    "Descubre por qué pasar del vibe coding al desarrollo asistido por IA te ayuda a construir software con intención, claridad y calidad duradera.",
  alternates: {
    canonical: "https://edi-developer.dev/libro",
  },
};

export default function LibroPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Nuevo libro de Edinson Nuñez More
        </p>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          El Programador Aumentado
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Eleva tu oficio en la era de la IA. Esta obra te guía para dejar
          atrás el <strong>vibe coding</strong> y adoptar un desarrollo
          profesional asistido por IA, con decisiones más conscientes y sistemas
          más sólidos.
        </p>
      </section>

      <section className="mt-12 space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>
          Hoy la IA ya no es opcional en el desarrollo moderno. El reto no es
          usarla, sino usarla bien. “El Programador Aumentado” no se enfoca en
          prompts llamativos: te enseña a integrar IA de forma estratégica en
          tu flujo de trabajo para construir software entendible, mantenible y
          de alta calidad.
        </p>
        <p>
          Aprenderás a trabajar con <strong>context-as-code</strong>, delegar
          tareas sin perder control, validar resultados generados por IA y
          evolucionar de implementador a arquitecto de sistemas inteligentes.
          La meta es clara: desarrollar más rápido, con mayor criterio y con
          una comprensión profunda de lo que estás construyendo.
        </p>
      </section>

      <section className="mt-12 rounded-lg border border-border bg-background p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">¿Listo para liderar con IA?</h2>
        <p className="mt-3 text-muted-foreground">
          Si quieres pasar del código improvisado al desarrollo con intención,
          claridad y calidad duradera, este libro es para ti.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link
              href="https://medinson.gumroad.com/l/sgdywj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar en Gumroad
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Disponible ahora en formato digital.
          </span>
        </div>
      </section>
    </main>
  );
}