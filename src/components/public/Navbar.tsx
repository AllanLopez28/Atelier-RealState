"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const enlaces = [
  { href: "/", label: "Inicio", actual: true },
  { href: "/properties", label: "Propiedades" },
  { href: "/services", label: "Servicios" },
  { href: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [sobreFoto, setSobreFoto] = useState(true);
  const { scrollY } = useScroll();

  // Se retira al bajar y vuelve en cuanto el visitante sube; es transparente sobre la portada
  useMotionValueEvent(scrollY, "change", (actual) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setOculta(actual > anterior && actual > 240);
    setSobreFoto(actual < window.innerHeight - 80);
  });

  const transparente = sobreFoto && !abierto;

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <>
    <motion.header
      className={`sticky top-0 z-50 transition-[background-color,color] duration-300 ${
        transparente ? "bg-transparent text-white" : "bg-cal text-grafito"
      }`}
      animate={{ transform: oculta && !abierto ? "translateY(-100%)" : "translateY(0%)" }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      <nav className="marco relative flex h-16 items-center justify-between gap-6" aria-label="Principal">
        <span
          aria-hidden="true"
          className={`hero-linea absolute bottom-0 left-[clamp(20px,3.6vw,56px)] right-[clamp(20px,3.6vw,56px)] h-px bg-white/45 transition-opacity duration-300 ${
            transparente ? "opacity-100" : "opacity-0"
          }`}
        />
        <Link href="/" className="flex items-center gap-2.5" aria-label="Atelier Estate, inicio">
          {/* El logotipo tiene fondo blanco: sobre la foto solo se muestra el nombre */}
          <span className={`relative h-7 w-7 ${transparente ? "hidden" : ""}`}>
            <Image src="/logo.png" alt="" fill sizes="28px"
              className="object-contain mix-blend-multiply"
            />
          </span>
          <span className="text-[1.125rem] font-extrabold uppercase tracking-[-0.01em]">Atelier Estate</span>
        </Link>

        <ul className="hidden items-center gap-8 text-[0.8125rem] uppercase tracking-[0.12em] md:flex">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <Link
                href={enlace.href}
                aria-current={enlace.actual ? "page" : undefined}
                className={`subrayado transition-opacity duration-200 ${
                  enlace.actual ? "opacity-100" : "opacity-75 hover:opacity-100"
                }`}
              >
                {enlace.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/login" className="subrayado text-[0.875rem] font-medium uppercase tracking-[0.08em] max-md:hidden">
          Iniciar sesión
        </Link>

        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="-mr-2 px-2 py-2 text-[0.875rem] font-medium uppercase tracking-[0.08em] transition-transform duration-150 active:scale-[0.97] md:hidden"
        >
          {abierto ? "Cerrar" : "Menú"}
        </button>
      </nav>
    </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            className="marco fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between bg-cal pb-10 pt-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {enlaces.map((enlace, i) => (
                <li key={enlace.href} className="mascara">
                  <motion.span
                    className="block"
                    initial={{ transform: "translateY(105%)" }}
                    animate={{ transform: "translateY(0%)" }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link href={enlace.href} onClick={() => setAbierto(false)} className="font-display text-seccion">
                      {enlace.label}
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>
            <Link href="/login" className="boton-principal w-full">
              Iniciar sesión
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
