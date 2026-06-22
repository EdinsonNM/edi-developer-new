"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";

export default function NotFound() {
  const { language } = useI18n();
  const es = language === "es";

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0B] text-[#FAFAF9]"
      style={{ fontFamily: "var(--font-space), system-ui, sans-serif" }}
    >
      {/* ilustración 404 a pantalla completa */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/404.webp')", opacity: 0.6 }}
      />
      {/* velo más oscuro a la izquierda (donde va el texto), deja ver el personaje a la derecha */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(10,10,11,.94) 0%, rgba(10,10,11,.78) 38%, rgba(10,10,11,.35) 68%, rgba(10,10,11,.15) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,10,11,.5) 0%, transparent 30%, transparent 70%, rgba(10,10,11,.6) 100%)" }}
      />

      {/* contenido (izquierda, centrado vertical) */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-start text-left px-[clamp(24px,7vw,110px)] max-w-[760px]">
        <div
          className="text-xs tracking-[.18em] text-[#9B9BA1]"
          style={{ fontFamily: "var(--font-jetbrains), ui-monospace, monospace" }}
        >
          // ERROR 404
        </div>
        <h1 className="mt-4 text-[clamp(34px,6.4vw,76px)] font-semibold tracking-[-.045em] leading-[.98] [text-wrap:balance]">
          {es ? "Esta ruta no existe" : "This route doesn’t exist"}
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-[#9B9BA1] max-w-[42ch] [text-wrap:pretty]">
          {es
            ? "O quizá olvidé configurar las variables de entorno… 🙈 Sea como sea, ni el zorro ni yo encontramos esta página."
            : "Or maybe I forgot to set the environment variables… 🙈 Either way, neither the fox nor I can find this page."}
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2.5 rounded-[10px] bg-[#FAFAF9] px-6 py-3.5 text-[15px] font-semibold text-[#0A0A0B] transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          {es ? "Volver al inicio" : "Back to home"}
        </Link>
      </div>
    </div>
  );
}
