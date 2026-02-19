import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Fábrica de Programadores",
  description:
    "Un cuento para inspirar a niños y niñas a explorar la creatividad, la lógica y el pensamiento tecnológico.",
};

export default function FabricaDeProgramadoresBlogPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Blog · Cuento infantil
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
        Fábrica de Programadores
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
        <p>
          Este cuento nace para inspirar a niños y niñas a descubrir que crear
          tecnología también puede ser una aventura llena de imaginación,
          colaboración y curiosidad.
        </p>
        <p>
          A través de personajes cercanos y escenas didácticas, el relato
          introduce ideas como resolver problemas, experimentar, equivocarse y
          volver a intentar: habilidades clave para cualquier futuro creador.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a
            href="/cuentos/Zorrito en la fábrica de programadores.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar cuento
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
