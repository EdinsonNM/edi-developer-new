import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import { Book3D } from "./Book3D";
import { useI18n } from "@/presentation/utils/use-i18n";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProductTier = "free" | "paid";

type ProductItem = {
  tier: ProductTier;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  coverImageWebp: string;
  primaryHref: string;
  primaryLabel: string;
  primaryExternal?: boolean;
  primaryIcon: "download" | "external";
  secondaryHref: string;
  secondaryLabel: string;
  secondaryExternal?: boolean;
  secondaryIcon: "book" | "external";
};

export function FabricaProgramadoresSection() {
  const { t } = useI18n();

  const products: ProductItem[] = [
    {
      tier: "free",
      name: t.fabricaProductName,
      tagline: t.fabricaProductTagline,
      description: t.fabricaProductDescription,
      coverImage: "/cuentos/Zorrito en la fábrica de programadores.jpg",
      coverImageWebp: "/cuentos/Zorrito en la fábrica de programadores.webp",
      primaryHref: "/cuentos/Zorrito en la fábrica de programadores.pdf",
      primaryLabel: t.ctaDownloadFree,
      primaryExternal: true,
      primaryIcon: "download",
      secondaryHref: "/blog/fabrica-de-programadores",
      secondaryLabel: t.ctaReadStory,
      secondaryIcon: "book",
    },
    {
      tier: "paid",
      name: t.augmentedProductName,
      tagline: t.augmentedProductTagline,
      description: t.augmentedProductDescription,
      coverImage: "/cover.png",
      coverImageWebp: "/cover.png",
      primaryHref: "https://medinson.gumroad.com/l/sgdywj",
      primaryLabel: t.ctaBuyNow,
      primaryExternal: true,
      primaryIcon: "external",
      secondaryHref: "/blog/el-programador-aumentado",
      secondaryLabel: t.ctaViewBook,
      secondaryIcon: "book",
    },
  ];

  return (
    <section
      id="fabrica-programadores"
      tabIndex={-1}
      className="relative z-10 border-t border-slate-200/80 bg-linear-to-b from-slate-50/90 to-white py-20 px-4 md:px-6 outline-none"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {t.productsSectionTitle}
          </h2>
          <p className="mt-4 text-pretty text-base text-slate-600 sm:text-lg">
            {t.productsSectionSubtitle}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
          {products.map((product) => {
            const isPaid = product.tier === "paid";

            return (
              <Card
                key={product.tier}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 ease-out",
                  "hover:z-10 hover:scale-[1.02] hover:shadow-xl",
                  isPaid
                    ? "border-purple-200/90 shadow-lg shadow-purple-500/10 ring-1 ring-purple-200/60 md:shadow-2xl md:shadow-purple-500/15"
                    : "border-slate-200/90 shadow-md shadow-slate-300/20 hover:shadow-lg"
                )}
              >
                <div
                  className={cn(
                    "grid flex-1 gap-6 p-6 sm:p-7",
                    "md:grid-cols-[minmax(0,1fr)_minmax(0,200px)] md:items-center",
                    isPaid && "md:p-8"
                  )}
                >
                  <div className="order-2 flex flex-col justify-center md:order-1">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
                          isPaid
                            ? "bg-purple-600 text-white"
                            : "bg-emerald-600 text-white"
                        )}
                      >
                        {isPaid ? t.badgeProductPaid : t.badgeProductFree}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      {product.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-pretty font-medium leading-snug text-slate-600",
                        isPaid ? "sm:text-lg" : "text-base sm:text-[1.05rem]"
                      )}
                    >
                      {product.tagline}
                    </p>

                    <p className="mt-4 line-clamp-3 text-pretty text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                      {product.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button
                        asChild
                        size="lg"
                        className={cn(
                          "rounded-full px-6 py-5 text-sm font-semibold shadow-sm transition-shadow",
                          isPaid
                            ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md"
                        )}
                      >
                        {product.primaryExternal ? (
                          <a
                            href={encodeURI(product.primaryHref)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {product.primaryLabel}
                            {product.primaryIcon === "download" ? (
                              <Download className="ml-2 h-4 w-4" />
                            ) : (
                              <ExternalLink className="ml-2 h-4 w-4" />
                            )}
                          </a>
                        ) : (
                          <Link href={product.primaryHref}>
                            {product.primaryLabel}
                            {product.primaryIcon === "download" ? (
                              <Download className="ml-2 h-4 w-4" />
                            ) : (
                              <ExternalLink className="ml-2 h-4 w-4" />
                            )}
                          </Link>
                        )}
                      </Button>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className={cn(
                          "rounded-full border-2 px-6 py-5 text-sm font-semibold bg-white/80 backdrop-blur-sm transition-colors",
                          isPaid
                            ? "border-purple-200 text-purple-800 hover:bg-purple-50"
                            : "border-slate-200 text-slate-800 hover:bg-slate-50"
                        )}
                      >
                        {product.secondaryExternal ? (
                          <a
                            href={product.secondaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {product.secondaryLabel}
                            {product.secondaryIcon === "book" ? (
                              <BookOpen className="ml-2 h-4 w-4" />
                            ) : (
                              <ExternalLink className="ml-2 h-4 w-4" />
                            )}
                          </a>
                        ) : (
                          <Link href={product.secondaryHref}>
                            {product.secondaryLabel}
                            {product.secondaryIcon === "book" ? (
                              <BookOpen className="ml-2 h-4 w-4" />
                            ) : (
                              <ExternalLink className="ml-2 h-4 w-4" />
                            )}
                          </Link>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="order-1 flex justify-center md:order-2 md:justify-end">
                    <div
                      className={cn(
                        "flex w-full max-w-[180px] items-center justify-center rounded-xl bg-linear-to-br p-3 transition-transform duration-300 sm:max-w-[200px]",
                        isPaid
                          ? "from-purple-50/90 to-violet-100/50"
                          : "from-slate-50 to-slate-100/80"
                      )}
                    >
                      <Book3D
                        coverImage={product.coverImage}
                        coverImageWebp={product.coverImageWebp}
                        alt={`${product.name} — ${product.tagline}`}
                        className="drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {isPaid ? (
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-purple-500/6 to-transparent"
                    aria-hidden
                  />
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
