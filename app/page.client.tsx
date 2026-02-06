"use client";

import dynamic from "next/dynamic";
import Loading from "@/presentation/components/loading/loading";

const LandingPage = dynamic(
  () => import("@/presentation/pages/index/index").then((m) => m.default),
  { ssr: false, loading: () => <Loading /> }
);

export function HomePageClient() {
  return <LandingPage />;
}
