import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InternalLayout } from "@/presentation/components/internal/InternalLayout";
import { BlogPostHeader } from "@/presentation/components/blog/BlogPostHeader";
import { buildBlogMetadata } from "../blog-metadata";

export const metadata: Metadata = buildBlogMetadata({
  slug: "fabrica-de-programadores",
  title: "Fábrica de Programadores",
  description:
    "Un cuento para inspirar a niños y niñas a explorar la creatividad, la lógica y el pensamiento tecnológico.",
});

export default function FabricaDeProgramadoresBlogPage() {
  return (
    <InternalLayout>
    <main className="mx-auto flex w-full max-w-4xl flex-col px-6 py-16 text-foreground md:px-10">
      <BlogPostHeader
        slug="fabrica-de-programadores"
        title="Fábrica de Programadores"
        category="Cuento infantil"
      />

      <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
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
          <Link href="/blog">Volver al blog</Link>
        </Button>
      </div>
    </main>
    </InternalLayout>
  );
}
