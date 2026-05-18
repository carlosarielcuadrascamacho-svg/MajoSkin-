import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="font-serif text-8xl font-semibold text-brand-200">
        404
      </span>
      <h1 className="mt-4 font-serif text-3xl text-brand-400">
        Página no encontrada
      </h1>
      <p className="mt-2 font-sans text-sm text-brand-400/60">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-200 px-8 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
