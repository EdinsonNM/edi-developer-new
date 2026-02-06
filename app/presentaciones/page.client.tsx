"use client";

import dynamic from "next/dynamic";
import Loading from "@/presentation/components/loading/loading";

const Presentations = dynamic(
  () =>
    import("@/presentation/pages/presentations/presentations").then(
      (m) => m.default
    ),
  { ssr: false, loading: () => <Loading /> }
);

export function PresentacionesPageClient() {
  return <Presentations />;
}
