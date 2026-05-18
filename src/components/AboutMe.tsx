export default function AboutMe() {
  return (
    <section id="acerca" className="bg-brand-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
          <div className="shrink-0">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-brand-200 to-brand-300 shadow-md md:h-56 md:w-56">
              <span className="font-serif text-5xl text-white">M</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
              Conoce a Majo
            </h2>

            <div className="mx-auto mt-2 h-0.5 w-16 bg-brand-200 md:mx-0" />

            <p className="mt-6 font-sans text-base leading-relaxed text-brand-400/90 sm:text-lg">
              Licenciada en Cosmiatría en formación, apasionada por realzar la
              belleza natural de cada persona. Mi enfoque combina el
              conocimiento científico del cuidado de la piel con un trato
              cercano y personalizado.
            </p>

            <p className="mt-4 font-sans text-base leading-relaxed text-brand-400/90 sm:text-lg">
              Creo en los resultados visibles sin perder de vista la salud y
              el bienestar de tu piel. Cada tratamiento está pensado para
              ti, con productos de alta calidad y técnicas actualizadas.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 md:justify-start">
              {[
                { label: "+50", desc: "Tratamientos realizados" },
                { label: "2+", desc: "Años de experiencia" },
                { label: "100%", desc: "Satisfacción garantizada" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="font-serif text-2xl font-semibold text-brand-200">
                    {stat.label}
                  </p>
                  <p className="font-sans text-sm text-brand-400/75">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
