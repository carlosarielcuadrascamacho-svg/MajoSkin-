import type { BusinessInfo } from "@/data/mockData";
import { MapPin, Camera, Clock, Heart } from "lucide-react";
import MapEmbed from "./MapEmbed";

interface FooterAndLocationProps {
  data: BusinessInfo;
}

export default function FooterAndLocation({
  data,
}: FooterAndLocationProps) {
  return (
    <footer id="ubicacion" className="bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl font-semibold">Majoc Skin</h3>
            <p className="mt-2 font-sans text-sm text-footer-text/60">
              Cuidado facial y diseño de miradas con un enfoque profesional
              y cercano.
            </p>

            <a
              href={`https://wa.me/${"526731044855"}?text=Hola%20Majo%2C%20tengo%20una%20consulta`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-brand-100"
            >
              <Heart className="h-4 w-4" />
              Escríbeme por WhatsApp
            </a>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-serif text-lg font-semibold">
              <MapPin className="h-4 w-4 text-brand-200" />
              Ubicación
            </h4>

            <p className="mt-3 font-sans text-sm text-footer-text/70">
              {data.address}
            </p>

            <a
              href={data.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-sans text-sm text-brand-200 transition-colors hover:text-brand-100"
            >
              <MapPin className="h-4 w-4" />
              Abrir en Google Maps
            </a>

            <div className="mt-4 overflow-hidden rounded-2xl border border-footer-text/10">
              <MapEmbed
                latitude={data.coordinates.lat}
                longitude={data.coordinates.lng}
                address={data.address}
              />
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-serif text-lg font-semibold">
              <Clock className="h-4 w-4 text-brand-200" />
              Horarios
            </h4>

            <ul className="mt-4 flex flex-col gap-3">
              {data.schedule.map((item) => (
                <li key={item.days} className="flex justify-between">
                  <span className="font-sans text-sm text-footer-text/70">
                    {item.days}
                  </span>
                  <span className="font-sans text-sm font-medium text-footer-text">
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-footer-text/20 px-5 py-3 font-sans text-sm font-medium text-brand-200 transition-all hover:border-brand-200 hover:text-brand-100"
              >
<Camera className="h-4 w-4" />
                    {data.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-footer-text/10 pt-8 text-center">
          <p className="font-sans text-xs text-footer-text/40">
            &copy; {new Date().getFullYear()} Majoc Skin. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
