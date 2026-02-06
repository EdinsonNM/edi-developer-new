import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 px-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg text-slate-600 mb-6">Página no encontrada</p>
      <Link
        href="/"
        className="rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
