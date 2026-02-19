import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpen, Download, ExternalLink, Sparkles } from "lucide-react";
import { Book3D } from "./Book3D";
import { useI18n } from "@/presentation/utils/use-i18n";

export function FabricaProgramadoresSection() {
  const { t, language } = useI18n();

  return (
    <section
      id="fabrica-programadores"
      className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100"
    >
      <div className="max-w-6xl mx-auto">
        <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full px-12 md:px-14">
          <CarouselContent>
            <CarouselItem>
              <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-center">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                    {t.fabricaTitle}
                  </h2>

                  <div className="mb-8">
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">
                      {(() => {
                        const parts = t.fabricaDescription1.split(/\{bookName\}/);
                        const matches =
                          t.fabricaDescription1.match(/\{bookName\}/g) || [];
                        const result: (string | React.ReactElement)[] = [];

                        parts.forEach((part, i) => {
                          result.push(part);
                          if (matches[i]) {
                            result.push(
                              <strong key={`bold-${i}`}>{t.fabricaBookName}</strong>
                            );
                          }
                        });

                        return result;
                      })()}
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {t.fabricaDescription2}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base"
                    >
                      <Link href="/blog/fabrica-de-programadores">
                        {language === "es" ? "Ver detalle" : "View details"}
                        <BookOpen className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-6 text-base"
                    >
                      <a
                        href="/cuentos/Zorrito en la fábrica de programadores.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {language === "es" ? "Descargar cuento" : "Download story"}
                        <Download className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md h-150 overflow-visible p-4">
                    <Book3D
                      coverImage="/cuentos/Zorrito en la fábrica de programadores.jpg"
                      coverImageWebp="/cuentos/Zorrito en la fábrica de programadores.webp"
                      className="w-full h-full scale-80"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-center">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                    El Programador Aumentado
                  </h2>

                  <div className="mb-8">
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">
                      {language === "es"
                        ? "Deja atrás el vibe coding y adopta un desarrollo asistido por IA con intención, contexto y criterio profesional."
                        : "Move beyond vibe coding and adopt AI-assisted development with intention, context, and professional judgment."}
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {language === "es"
                        ? "Aprende a delegar mejor, validar resultados y mantener control real de arquitectura y calidad mientras desarrollas más rápido."
                        : "Learn to delegate better, validate outcomes, and keep real control of architecture and quality while shipping faster."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base"
                    >
                      <Link href="/blog/el-programador-aumentado">
                        {language === "es" ? "Ver detalle" : "View details"}
                        <BookOpen className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-6 text-base"
                    >
                      <a
                        href="https://medinson.gumroad.com/l/sgdywj"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {language === "es" ? "Comprar libro" : "Buy book"}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md h-150 overflow-visible p-4">
                    <Book3D
                      coverImage="/cover.png"
                      coverImageWebp="/cover.png"
                      className="w-full h-full scale-80"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem>
              <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-center">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                    {language === "es"
                      ? "Interfaces que se generan solas"
                      : "Interfaces that generate themselves"}
                  </h2>

                  <div className="mb-8">
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">
                      {language === "es"
                        ? "Generative UI: cómo los LLMs están cambiando la UX. Investigación sobre widgets dinámicos, Widget Registry y oportunidades en Perú y Latinoamérica."
                        : "Generative UI: how LLMs are changing UX. Research on dynamic widgets, Widget Registry, and opportunities in Peru and Latin America."}
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {language === "es"
                        ? "Tesis en curso con n=30 participantes. Claude API, MCP, Spotify, OpenWeatherMap y Google Maps."
                        : "Thesis in progress with n=30 participants. Claude API, MCP, Spotify, OpenWeatherMap and Google Maps."}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base"
                    >
                      <Link href="/blog/interfaces-generativas-llm">
                        {language === "es" ? "Leer artículo" : "Read article"}
                        <BookOpen className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md flex items-center justify-center rounded-2xl bg-linear-to-br from-purple-100 to-slate-100 border border-purple-100 p-12">
                    <Sparkles className="h-32 w-32 text-purple-500/80" strokeWidth={1.25} />
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="left-0 border-purple-200 text-purple-700 hover:bg-purple-50" />
          <CarouselNext className="right-0 border-purple-200 text-purple-700 hover:bg-purple-50" />
        </Carousel>
      </div>
    </section>
  );
}
