import type { Metadata } from "next";
import { AppsPageClient } from "./page.client";

export const metadata: Metadata = {
  title: "Apps y herramientas",
  description:
    "Herramientas que construyo para desarrolladores y equipos. IA aplicada, experimentos y productos en vivo. Slaim y más en camino.",
};

export default function AppsPage() {
  return <AppsPageClient />;
}
