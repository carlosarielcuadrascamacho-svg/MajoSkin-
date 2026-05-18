import type { Product } from "@/data/mockData";
import { WHATSAPP_NUMBER } from "@/data/mockData";
import { ShoppingBag, Package } from "lucide-react";

interface ProductShowcaseProps {
  products: Product[];
}

function buildWhatsAppLink(productName: string): string {
  const message = `Hola María, quiero el ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section     id="productos" className="bg-brand-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight text-brand-400 md:text-4xl lg:text-5xl">
            Mini Kits Dermocosméticos
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-sans text-base text-brand-400/85 sm:text-lg">
            Tu rutina ideal en un solo kit. Fórmulas pensadas para cada tipo
            de piel.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex w-[280px] shrink-0 snap-start flex-col rounded-3xl bg-card shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className={`flex h-44 items-center justify-center rounded-t-3xl bg-gradient-to-br ${product.gradient}`}
                >
                  <Package className="h-14 w-14 text-white/80" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl font-semibold text-brand-400">
                    {product.name}
                  </h3>

                  <ul className="mt-4 flex flex-col gap-2">
                    {product.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 font-sans text-sm text-brand-400/90"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-200" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={buildWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand-200 font-sans text-sm font-semibold text-white transition-all hover:bg-brand-300"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Comprar
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-16 bg-gradient-to-l from-brand-50 to-transparent md:hidden" />
        </div>

        <p className="mt-6 text-center font-sans text-xs text-brand-400/70">
          Desliza para ver más kits →
        </p>

        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-brand-200/20 bg-brand-100/20 p-6 text-center">
          <p className="font-sans text-sm font-medium text-brand-400/90">
            ¿No estás segura de cuál es el ideal para ti?
          </p>
          <a
            href="#abrir-test-piel"
            className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-brand-200/10 px-5 py-2.5 font-sans text-sm font-semibold text-brand-300 transition-all hover:bg-brand-200 hover:text-white"
          >
            Hacer Test Diagnóstico de Piel →
          </a>
        </div>
      </div>
    </section>
  );
}
