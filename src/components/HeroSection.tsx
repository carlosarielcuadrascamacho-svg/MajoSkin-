import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-brand-200 bg-[length:200%_200%] animate-gradient">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNENEI4OTUiIGZpbGwtb3BhY2l0eT0iMC4wNiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.3em] text-brand-300">
          Cosmiatría & Estética
        </p>

        <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-brand-400 sm:text-5xl md:text-6xl lg:text-7xl">
          Majoc Skin.
          <br />
          <span className="text-brand-300">
            Cuidado facial y diseño de miradas.
          </span>
        </h1>

        <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-brand-400/85 sm:text-lg">
          Tu piel merece atención profesional con un enfoque cercano y
          resultados que se notan.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "526731044855"}?text=Hola%20Majo%2C%20quiero%20agendar%20una%20cita`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-brand-200 px-10 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300 hover:shadow-md sm:w-auto"
          >
            Agendar Cita
          </Link>

          <Link
            href="#productos"
            className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-brand-500 bg-transparent px-10 font-sans text-sm font-semibold text-brand-400 transition-all hover:border-brand-200 hover:text-brand-300 sm:w-auto"
          >
            Ver Mini Kits
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-50 to-transparent" />
    </section>
  );
}
