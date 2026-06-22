"use client";

import dynamic from "next/dynamic";

const HomeMinimal = dynamic(
  () => import("@/presentation/pages/index/HomeMinimal"),
  { ssr: false }
);

export function HomePageClient() {
  return <HomeMinimal />;
}
