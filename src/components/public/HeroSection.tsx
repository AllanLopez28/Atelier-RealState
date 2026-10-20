"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const cifras = [
  { valor: "115 m²", etiqueta: ["Área", "construida"] },
  { valor: "3", etiqueta: ["Habitaciones", "amplias"] },
  { valor: "24/7", etiqueta: ["Seguridad", "privada"] },
];

const marca = "ARBOLEDAS";
const titular = ["Tu nuevo", "hogar a", "largo", "plazo"];

// Contorno de la casa bajo la línea del tejado, en porcentaje de hero1.jpeg (2730 × 1536).
// Esta copia de la foto va delante del nombre, para que las letras queden detrás del tejado.
const frente =
  "polygon(26% 30.4%, 36.6% 28.3%, 55% 26.3%, 73.6% 24.6%, 73.6% 22.3%, 91.6% 20.4%, 100% 19.5%, 100% 100%, 26% 100%)";

function Foto({ prioridad }: { prioridad?: boolean }) {
  return (
    <Image
      src="/hero1.jpeg"
      alt={prioridad ? "Fachada de la casa Modelo Azucena al atardecer, en Residencial Las Arboledas" : ""}
      fill
      priority={prioridad}
      sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
      className="object-cover"
    />
  );
}

function Letras({ retraso = 120 }: { retraso?: number }) {
  return (
    <span className="mascara">
      {marca.split("").map((letra, i) => (
        <span key={i} className="palabra" style={{ animationDelay: `${retraso + i * 45}ms` }}>
          {letra}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const seccion = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: seccion, offset: ["start start", "end start"] });
  const fondo = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={seccion}
      aria-labelledby="titulo-portada"
      className="relative -mt-16 h-[100svh] min-h-[640px] w-full overflow-hidden bg-bosque font-texto text-white"
    >
      {/* Caja con la proporción exacta de la foto: así el contorno del tejado coincide a cualquier ancho */}
      <motion.div className="absolute inset-0" style={{ y: fondo }}>
        <div className="hero-caja">
          <div className="hero-foto absolute inset-0">
            <Foto prioridad />
            <div aria-hidden="true" className="hero-velo-superior absolute inset-x-0 top-0 h-[55%]" />
            <p aria-hidden="true" className="hero-marca pointer-events-none select-none max-md:hidden">
              <Letras />
            </p>
            <div aria-hidden="true" className="absolute inset-0 max-md:hidden" style={{ clipPath: frente }}>
              <Foto />
            </div>
          </div>
        </div>
      </motion.div>

      <div aria-hidden="true" className="hero-resplandor absolute inset-0" />

      <div className="marco relative flex h-full flex-col pb-6 pt-[84px] md:pb-8 md:pt-[92px]">
        {/* En el teléfono el nombre va completo sobre el cielo, sin el efecto de profundidad */}
        <p
          aria-hidden="true"
          className="pointer-events-none select-none whitespace-nowrap text-[15.2vw] font-extrabold leading-[0.8] tracking-[-0.045em] md:hidden"
        >
          <Letras />
        </p>

        {/* Cifras: columna izquierda en escritorio, fila inferior en el teléfono */}
        <dl className="order-last mt-6 grid grid-cols-3 gap-4 md:absolute md:left-[clamp(20px,3.6vw,56px)] md:top-[124px] md:order-none md:mt-0 md:flex md:w-[150px] md:flex-col md:gap-0">
          {cifras.map((cifra, i) => (
            <div
              key={cifra.valor}
              className="entrada flex flex-col-reverse border-white/40 md:border-b md:py-4 md:first:pt-0 md:last:border-b-0"
              style={{ animationDelay: `${600 + i * 90}ms` }}
            >
              <dt className="mt-2 text-[0.6875rem] font-medium uppercase leading-[1.3] tracking-[0.08em] text-white/90 md:text-[0.75rem]">
                {cifra.etiqueta[0]}
                <br />
                {cifra.etiqueta[1]}
              </dt>
              <dd className="text-[1.375rem] font-medium leading-none tracking-[-0.02em] md:text-[1.75rem]">
                {cifra.valor}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5 lg:col-span-4">
            <h1
              id="titulo-portada"
              className="text-[2.75rem] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-white md:ml-[1.2vw] md:text-[clamp(2.5rem,3.7vw,3.75rem)] md:text-[#3B2A21]"
            >
              <span className="sr-only">Residencial Las Arboledas: </span>
              {titular.map((linea, i) => (
                <span key={linea} className="mascara block">
                  <span className="palabra" style={{ animationDelay: `${420 + i * 80}ms` }}>
                    {linea}
                  </span>
                </span>
              ))}
            </h1>

            <Link
              href="/contact"
              className="hero-boton entrada mt-8 inline-flex items-stretch bg-white text-[#2A1F19] md:mt-[clamp(48px,11vh,120px)]"
              style={{ animationDelay: "760ms" }}
            >
              <span className="px-5 py-3.5 text-[0.9375rem] font-medium uppercase tracking-[0.06em]">
                Agendar visita
              </span>
              <span aria-hidden="true" className="flex w-12 items-center justify-center border-l border-[#2A1F19]/25">
                <span className="flecha">→</span>
              </span>
            </Link>
          </div>

          <p
            className="entrada max-w-[20rem] border-l border-white/70 pl-4 text-[0.8125rem] font-medium uppercase leading-[1.4] tracking-[0.02em] md:col-span-4 md:col-start-9 md:justify-self-end"
            style={{ animationDelay: "860ms" }}
          >
            Casa de dos plantas en renta, con jardín propio y acabados de primera calidad. Desde $800 al
            mes.
          </p>
        </div>

        <div aria-hidden="true" className="hero-linea mt-6 h-px w-full bg-white/60 max-md:hidden" />
      </div>
    </section>
  );
}
