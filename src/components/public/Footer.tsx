import Image from "next/image";
import Link from "next/link";
import Reveal, { MarcaFinal, RevealImagen, TituloAnimado } from "./Reveal";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/properties", label: "Propiedades" },
  { href: "/services", label: "Servicios" },
  { href: "/contact", label: "Contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Bloque CTA Refactorizado */}
      <section aria-labelledby="titulo-cta" className="bg-[#2B1D14] text-white">
        <div className="p-8 md:p-16 lg:p-24 max-w-[1560px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Columna Izquierda (Textos y Botones) */}
            <div className="flex flex-col justify-between self-stretch h-full py-1">
              <div>
                <h2
                  id="titulo-cta"
                  className="font-black text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tighter text-[#F9F8F4] uppercase"
                >
                  TU PRÓXIMO
                  <br />
                  HOGAR EMPIEZA
                  <br />
                  ACÁ.
                </h2>

                <p className="mt-6 md:mt-8 text-lg md:text-xl text-white/80 max-w-md font-normal leading-relaxed">
                  Completá tu aplicación en línea. Nuestro equipo revisará tu perfil en menos de 24 horas.
                </p>

                {/* Botones */}
                <div className="flex flex-wrap items-center gap-6 mt-8">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#F9F8F4] text-[#2B1D14] font-bold text-sm tracking-wider uppercase rounded-md hover:bg-white transition-all shadow-sm active:scale-95"
                  >
                    <span>APLICAR AHORA</span>
                    <span className="text-base" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-white font-medium text-base hover:opacity-80 transition-opacity"
                  >
                    <span>Contactar asesor</span>
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              {/* Texto Inferior */}
              <p className="mt-16 lg:mt-24 text-base text-white/60 font-normal">
                Da el primer paso hacia tu nuevo hogar.
              </p>
            </div>

            {/* Columna Derecha (Imagen e Interacción) */}
            <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/entrada.png"
                alt="Entrada de la casa"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />

              {/* Badge Flotante (Glassmorphism) */}
              <div className="absolute bottom-8 left-8 sm:left-10 z-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-white drop-shadow-sm">
                    IMAGINÁ TU VIDA ACÁ
                  </span>
                  <span className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <div className="marco overflow-hidden pt-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-texto">
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link href={enlace.href} className="subrayado">
                    {enlace.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-nota">
            <Link href="#" className="subrayado">
              Política de privacidad
            </Link>
            <Link href="#" className="subrayado">
              Términos de servicio
            </Link>
            <span>Atelier Estate © {currentYear}</span>
          </div>
        </div>

        <MarcaFinal
          texto="Atelier Estate"
          className="mt-14 whitespace-nowrap font-display text-[17vw] leading-[0.85] tracking-[-0.035em] md:mt-20"
        />
      </div>
    </footer>
  );
}
