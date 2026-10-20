"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, useSpring } from "framer-motion";
import { useAmueblado } from "./PublicShell";

export type TabType = "sala" | "cocina" | "habitacion";

interface Hotspot {
  title: string;
  top: string;
  left: string;
}

interface RoomData {
  id: TabType;
  title: string;
  badge: string;
  footerName: string;
  number: string;
  furnishedImg: string;
  unfurnishedImg: string;
  hotspotsFurnished: Hotspot[];
  hotspotsUnfurnished: Hotspot[];
}

const rooms: Record<TabType, RoomData> = {
  sala: {
    id: "sala",
    title: "Sala",
    badge: "01 / SALA Y COMEDOR",
    footerName: "Sala y comedor",
    number: "01 — 03",
    furnishedImg: "/Aint1.png",
    unfurnishedImg: "/Vint1.png",
    hotspotsFurnished: [
      { title: "Sala amplia", top: "50%", left: "32%" },
      { title: "Comedor independiente", top: "54%", left: "80%" },
    ],
    hotspotsUnfurnished: [
      { title: "Escalera al segundo nivel", top: "50%", left: "30%" },
      { title: "Salida al jardín", top: "48%", left: "79%" },
    ],
  },
  cocina: {
    id: "cocina",
    title: "Cocina",
    badge: "02 / COCINA INTEGRAL",
    footerName: "Cocina integral",
    number: "02 — 03",
    furnishedImg: "/Acocina1.png",
    unfurnishedImg: "/Vcocina1.png",
    hotspotsFurnished: [
      { title: "Pantries y gabinetes", top: "34%", left: "28%" },
      { title: "Acabados en granito", top: "56%", left: "58%" },
    ],
    hotspotsUnfurnished: [
      { title: "Conexiones listas", top: "46%", left: "58%" },
      { title: "Área de servicio", top: "44%", left: "79%" },
    ],
  },
  habitacion: {
    id: "habitacion",
    title: "Habitación",
    badge: "03 / HABITACIÓN PRINCIPAL",
    footerName: "Habitación principal",
    number: "03 — 03",
    furnishedImg: "/Aroom1.png",
    unfurnishedImg: "/Vroom1.png",
    hotspotsFurnished: [
      { title: "Habitación principal", top: "58%", left: "45%" },
      { title: "Ventanas francesas", top: "44%", left: "6%" },
    ],
    hotspotsUnfurnished: [
      { title: "Piso cerámico fino", top: "72%", left: "40%" },
      { title: "Walk-in closet contiguo", top: "46%", left: "75%" },
    ],
  },
};

const tabOrder: TabType[] = ["sala", "cocina", "habitacion"];

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

type Cambio = { dir: number; tipo: "estancia" | "estado" };

// Foto principal: al cambiar de estancia la nueva entra barriendo desde el lado hacia el que se navega;
// al cambiar amueblada / sin amueblar, las dos versiones se funden con un leve desenfoque.
const fotoPrincipal = {
  entra: ({ dir, tipo }: Cambio) =>
    tipo === "estancia"
      ? { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", scale: 1.12, opacity: 1, filter: "blur(0px)" }
      : { clipPath: "inset(0% 0% 0% 0%)", scale: 1.03, opacity: 0, filter: "blur(10px)" },
  quieta: ({ tipo }: Cambio) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition:
      tipo === "estancia"
        ? { clipPath: { duration: 0.9, ease: easeInOut }, scale: { duration: 1.3, ease: easeOut } }
        : { duration: 0.6, ease: easeOut },
  }),
  sale: ({ dir, tipo }: Cambio) =>
    tipo === "estancia"
      ? { scale: 1.06, x: dir > 0 ? "-4%" : "4%", transition: { duration: 0.9, ease: easeInOut } }
      : { opacity: 0, filter: "blur(10px)", transition: { duration: 0.5, ease: easeOut } },
};

function TextoRodante({ texto, className }: { texto: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={texto}
          className="inline-block"
          initial={{ transform: "translateY(100%)", opacity: 0 }}
          animate={{ transform: "translateY(0%)", opacity: 1 }}
          exit={{ transform: "translateY(-100%)", opacity: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          {texto}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function InteractiveModule() {
  const { amueblada, setAmueblada } = useAmueblado();
  const [activeTab, setActiveTab] = useState<TabType>("sala");
  const [isFurnished, setIsFurnished] = useState<boolean>(amueblada ?? true);
  const [cambio, setCambio] = useState<Cambio>({ dir: 1, tipo: "estancia" });
  const sectionRef = useRef<HTMLElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.3 });
  const reducir = useReducedMotion();
  const estado = visible ? "visible" : "oculto";
  // La primera vez los puntos esperan a que termine la entrada; después siguen al barrido de la foto
  const [primeraVez, setPrimeraVez] = useState(true);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setPrimeraVez(false), 1800);
    return () => clearTimeout(t);
  }, [visible]);

  // Parallax suave de la foto siguiendo el cursor (solo con ratón)
  const px = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  const py = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducir || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * -22);
    py.set(((e.clientY - r.top) / r.height - 0.5) * -14);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  const handleToggleFurnished = (val: boolean) => {
    if (val === isFurnished) return;
    setCambio((c) => ({ ...c, tipo: "estado" }));
    setIsFurnished(val);
    setAmueblada?.(val);
  };

  const irA = useCallback(
    (tab: TabType) => {
      const actual = tabOrder.indexOf(activeTab);
      const destino = tabOrder.indexOf(tab);
      if (actual === destino) return;
      setCambio({ dir: destino > actual ? 1 : -1, tipo: "estancia" });
      setActiveTab(tab);
    },
    [activeTab]
  );

  const currentRoom = rooms[activeTab];
  const mainImageSrc = isFurnished ? currentRoom.furnishedImg : currentRoom.unfurnishedImg;
  const pipImageSrc = isFurnished ? currentRoom.unfurnishedImg : currentRoom.furnishedImg;
  const currentHotspots = isFurnished ? currentRoom.hotspotsFurnished : currentRoom.hotspotsUnfurnished;

  const handlePrev = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const prevIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
    setCambio({ dir: -1, tipo: "estancia" });
    setActiveTab(tabOrder[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabOrder.length;
    setCambio({ dir: 1, tipo: "estancia" });
    setActiveTab(tabOrder[nextIndex]);
  };

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    if (amueblada !== undefined && amueblada !== isFurnished) {
      setCambio((c) => ({ ...c, tipo: "estado" }));
      setIsFurnished(amueblada);
    }
    // Solo sigue al estado compartido cuando cambia desde otra sección
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amueblada]);

  // Entrada escalonada de la cabecera, el visor y sus controles
  const subir = (retraso: number) => ({
    oculto: { opacity: 0, transform: "translateY(18px)" },
    visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.7, delay: retraso, ease: easeOut } },
  });

  return (
    <section
      ref={sectionRef}
      id="interiores"
      aria-label="Explorá el interior"
      className="marco py-[clamp(48px,7vw,96px)] bg-cal font-texto select-none"
    >
      {/* ======================================================== */}
      {/* 1. CABECERA (Fuera de la imagen)                          */}
      {/* ======================================================== */}
      <div className="mb-6 md:mb-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <motion.span
            variants={subir(0)}
            initial="oculto"
            animate={estado}
            className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#3B2B20]/75 uppercase"
          >
            CONOCÉ TU PRÓXIMO HOGAR
          </motion.span>
          <div className="hidden sm:flex items-center gap-3">
            <motion.span
              className="h-[1px] w-16 sm:w-28 md:w-36 bg-[#3B2B20]/30 inline-block origin-right"
              aria-hidden="true"
              initial={{ transform: "scaleX(0)" }}
              animate={visible ? { transform: "scaleX(1)" } : undefined}
              transition={{ duration: 1.1, delay: 0.15, ease: easeInOut }}
            />
            <motion.span
              variants={subir(0.1)}
              initial="oculto"
              animate={estado}
              className="text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[#3B2B20] uppercase"
            >
              ARBOLEDAS / INTERIORES
            </motion.span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.92] text-[#3B2B20]">
            {["EXPLORÁ", "EL", "INTERIOR"].map((palabra, i) => (
              <span key={palabra} className="mascara mr-[0.22em] last:mr-0">
                <motion.span
                  className="inline-block"
                  initial={{ transform: "translateY(105%)" }}
                  animate={visible ? { transform: "translateY(0%)" } : undefined}
                  transition={{ duration: 0.95, delay: 0.08 + i * 0.08, ease: easeOut }}
                >
                  {palabra}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Toggle Switch AMUEBLADA / SIN AMUEBLAR */}
          <motion.div
            variants={subir(0.35)}
            initial="oculto"
            animate={estado}
            role="radiogroup"
            aria-label="Modalidad de visualización"
            className="inline-flex items-center rounded-full bg-[#E5E0D8] p-1.5 self-start md:self-auto shadow-inner"
          >
            {[
              { valor: true, label: "AMUEBLADA" },
              { valor: false, label: "SIN AMUEBLAR" },
            ].map((opcion) => {
              const activa = isFurnished === opcion.valor;
              return (
                <button
                  key={opcion.label}
                  type="button"
                  role="radio"
                  aria-checked={activa}
                  onClick={() => handleToggleFurnished(opcion.valor)}
                  className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-[color,transform] duration-200 active:scale-[0.97] ${
                    activa ? "text-[#3B2B20]" : "text-[#7A6B60] hover:text-[#3B2B20]"
                  }`}
                >
                  {activa && (
                    <motion.span
                      layoutId="selector-amueblado"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative">{opcion.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. VISOR INMERSIVO                                        */}
      {/* ======================================================== */}
      <motion.div
        ref={viewerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        initial={reducir ? { opacity: 0 } : { clipPath: "inset(14% 8% 14% 8% round 2rem)", opacity: 1 }}
        animate={
          visible
            ? reducir
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }
            : undefined
        }
        transition={{ duration: 1.25, delay: 0.2, ease: easeInOut }}
        className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[5/2] rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden shadow-2xl bg-[#1B1F1C]"
      >
        {/* Foto: barrido entre estancias, respiración lenta y parallax con el cursor */}
        <motion.div className="absolute -inset-4" style={{ x: px, y: py }}>
          <motion.div
            className="absolute inset-0"
            initial={{ transform: "scale(1.18)" }}
            animate={visible ? { transform: "scale(1)" } : undefined}
            transition={{ duration: 1.8, delay: 0.2, ease: easeOut }}
          >
          <div className="interior-respira absolute inset-0">
            <AnimatePresence initial={false} custom={cambio}>
              <motion.div
                key={mainImageSrc}
                custom={cambio}
                variants={fotoPrincipal}
                initial="entra"
                animate="quieta"
                exit="sale"
                className="absolute inset-0"
              >
                <Image
                  src={mainImageSrc}
                  alt={`Vista de ${currentRoom.footerName} (${isFurnished ? "amueblada" : "sin amueblar"})`}
                  fill
                  priority
                  sizes="(min-width: 1400px) 1300px, 100vw"
                  className="object-cover object-center pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          </motion.div>
        </motion.div>

        {/* Gradiente sutil para acentuar controles y legibilidad */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* ======================================================== */}
        {/* 3. ELEMENTOS SUPERPUESTOS                                */}
        {/* ======================================================== */}

        {/* Badge Superior Izquierdo */}
        <motion.div
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-auto"
          initial={{ opacity: 0, transform: "translateY(-12px)" }}
          animate={visible ? { opacity: 1, transform: "translateY(0px)" } : undefined}
          transition={{ duration: 0.6, delay: 0.95, ease: easeOut }}
        >
          <div className="inline-flex items-center px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
            <TextoRodante texto={currentRoom.badge} className="text-xs sm:text-sm font-bold tracking-wider uppercase drop-shadow-sm" />
          </div>
        </motion.div>

        {/* Picture-in-Picture (Superior Derecho) */}
        <motion.div
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-32 sm:w-40 lg:w-48 max-sm:hidden"
          initial={{ opacity: 0, transform: "translateX(18px) scale(0.96)" }}
          animate={visible ? { opacity: 1, transform: "translateX(0px) scale(1)" } : undefined}
          transition={{ duration: 0.7, delay: 1.05, ease: easeOut }}
        >
          <div
            onClick={() => handleToggleFurnished(!isFurnished)}
            title={`Cambiar a vista ${isFurnished ? "sin amueblar" : "amueblada"}`}
            className="interior-pip relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border-2 border-white/40 backdrop-blur-md pointer-events-auto"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={pipImageSrc}
                className="absolute inset-0"
                initial={{ opacity: 0, transform: "scale(1.15)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <Image
                  src={pipImageSrc}
                  alt="Vista alternativa"
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-110"
                />
              </motion.div>
            </AnimatePresence>
            {/* Velo para texto del PiP */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

            {/* Botón de expandir/modal dentro del PiP */}
            <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-md bg-black/40 backdrop-blur-sm border border-white/30 text-white group-hover:bg-black/60 transition-colors">
              <svg className="interior-pip-icono w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>

            {/* Etiqueta de texto del PiP */}
            <div className="absolute bottom-2 left-2.5 right-2.5">
              <TextoRodante
                texto={isFurnished ? "Ver sin amueblar" : "Ver amueblada"}
                className="text-[11px] sm:text-xs font-semibold text-white drop-shadow-md tracking-wide"
              />
            </div>
          </div>
        </motion.div>

        {/* Hotspots: el punto aparece, la línea crece hacia arriba y luego la etiqueta */}
        <AnimatePresence>
          {visible &&
            currentHotspots.map((hotspot, i) => {
              const x = parseFloat(hotspot.left);
              const alineacion =
                x < 15 ? "items-start -translate-x-[4px]" : x > 85 ? "items-end -translate-x-[calc(100%-4px)]" : "items-center -translate-x-1/2";
              const base = primeraVez ? 1.1 + i * 0.12 : 0.45 + i * 0.1;
              return (
                <motion.div
                  key={`${mainImageSrc}-${hotspot.title}`}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  className={`absolute -translate-y-[calc(100%-4px)] pointer-events-auto flex-col group cursor-pointer hidden md:flex z-10 ${alineacion}`}
                  style={{ top: hotspot.top, left: hotspot.left }}
                >
                  {/* Píldora de Cristal Esmerilado */}
                  <motion.div
                    initial={{ opacity: 0, transform: "translateY(8px) scale(0.94)" }}
                    animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                    transition={{ type: "spring", duration: 0.55, bounce: 0.25, delay: base + 0.25 }}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-lg transition-transform duration-200 [@media(hover:hover)]:group-hover:scale-105"
                  >
                    <span className="interior-mas flex items-center justify-center w-4 h-4 rounded-full border border-white/80 text-[10px] font-bold leading-none">
                      +
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm whitespace-nowrap">
                      {hotspot.title}
                    </span>
                  </motion.div>

                  {/* Línea vertical blanca hacia abajo */}
                  <motion.span
                    className={`block w-px h-6 sm:h-8 bg-white/80 origin-bottom ${x < 15 ? "ml-[3.5px]" : x > 85 ? "mr-[3.5px]" : ""}`}
                    aria-hidden="true"
                    initial={{ transform: "scaleY(0)" }}
                    animate={{ transform: "scaleY(1)" }}
                    transition={{ duration: 0.35, delay: base + 0.1, ease: easeOut }}
                  />

                  {/* Punto blanco con halo que late */}
                  <motion.span
                    className="relative block w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    aria-hidden="true"
                    initial={{ opacity: 0, transform: "scale(0.5)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0.3, delay: base }}
                  >
                    <span className="pin-halo absolute inset-0 rounded-full bg-white" />
                  </motion.span>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* 4. BARRA DE NAVEGACIÓN INFERIOR                          */}
        {/* ======================================================== */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 pointer-events-auto"
          initial={{ opacity: 0, transform: "translateY(calc(100% + 24px))" }}
          animate={visible ? { opacity: 1, transform: "translateY(0%)" } : undefined}
          transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
        >
          <div className="bg-black/35 backdrop-blur-xl border border-white/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.37)] text-white">
            {/* Izquierda: Texto + línea horizontal */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap">
                RECORRÉ LOS ESPACIOS
              </span>
              <motion.span
                className="h-px w-12 sm:w-20 md:w-36 bg-white/30 hidden md:inline-block origin-left"
                aria-hidden="true"
                initial={{ transform: "scaleX(0)" }}
                animate={visible ? { transform: "scaleX(1)" } : undefined}
                transition={{ duration: 1, delay: 1.4, ease: easeInOut }}
              />
            </div>

            {/* Centro: Tabs (Sala, Cocina, Habitación) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {tabOrder.map((tabKey) => {
                const isActive = activeTab === tabKey;
                const tabLabel = rooms[tabKey].title;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => irA(tabKey)}
                    className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-[color,background-color,transform] duration-200 active:scale-[0.97] flex items-center gap-2 ${
                      isActive ? "text-[#3B2B20]" : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="estancia-activa"
                        className="absolute inset-0 rounded-full bg-white shadow-md"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        className="relative w-2 h-2 rounded-full bg-[#C05A45]"
                        aria-hidden="true"
                        initial={{ opacity: 0, transform: "scale(0.5)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0.3, delay: 0.1 }}
                      />
                    )}
                    <span className="relative">{tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Derecha: Controles (Flecha izq, Flecha der, Fullscreen) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Espacio anterior"
                className="interior-control hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/50 text-white items-center justify-center hover:bg-white/20"
              >
                <span className="flecha-izq text-sm">←</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Siguiente espacio"
                className="interior-control hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/50 text-white items-center justify-center hover:bg-white/20"
              >
                <span className="flecha text-sm">→</span>
              </button>

              <span className="h-6 w-px bg-white/30 mx-1 hidden sm:block" aria-hidden="true" />

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Pantalla completa"
                className="interior-control interior-expandir w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/20"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ======================================================== */}
      {/* 5. FOOTER DE LA SECCIÓN (Fuera de la imagen)              */}
      {/* ======================================================== */}
      <div className="relative mt-5 sm:mt-7 flex flex-col gap-3 pt-4 text-[#3B2B20] sm:flex-row sm:items-center sm:justify-between">
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-[#3B2B20]/25 origin-left"
          initial={{ transform: "scaleX(0)" }}
          animate={visible ? { transform: "scaleX(1)" } : undefined}
          transition={{ duration: 1.3, delay: 0.7, ease: easeInOut }}
        />
        <motion.span
          variants={subir(1.1)}
          initial="oculto"
          animate={estado}
          className="font-black text-base sm:text-lg md:text-[clamp(1.125rem,1.6vw,1.5rem)] tracking-tight uppercase"
        >
          ESPACIOS PARA TU DÍA A DÍA.
        </motion.span>
        <motion.span
          variants={subir(1.2)}
          initial="oculto"
          animate={estado}
          className="flex items-center gap-4 text-[11px] sm:text-xs text-[#3B2B20]/85 tracking-[0.2em] font-medium"
        >
          <TextoRodante texto={currentRoom.footerName} />
          <span className="h-4 w-px bg-[#3B2B20]/45" aria-hidden="true" />
          <TextoRodante texto={currentRoom.number} />
        </motion.span>
      </div>
    </section>
  );
}


// SelectorAmueblado preservado por compatibilidad
export function SelectorAmueblado({ tono }: { tono: "oscuro" | "claro" }) {
  const { amueblada, setAmueblada } = useAmueblado();
  const opciones = [
    { valor: true, label: "Amueblada" },
    { valor: false, label: "Sin amueblar" },
  ];
  const tinta = tono === "oscuro" ? "text-cal" : "text-grafito";
  const barra = tono === "oscuro" ? "bg-cal" : "bg-grafito";

  return (
    <div role="radiogroup" aria-label="Estado de la casa" className="flex gap-8">
      {opciones.map((opcion) => {
        const activa = amueblada === opcion.valor;
        return (
          <button
            key={opcion.label}
            type="button"
            role="radio"
            aria-checked={activa}
            onClick={() => setAmueblada(opcion.valor)}
            className={`relative pb-3 font-display text-frase transition-opacity duration-200 ${tinta} ${
              activa ? "opacity-100" : "opacity-45 hover:opacity-80"
            }`}
          >
            {opcion.label}
            {activa && (
              <span
                className={`absolute inset-x-0 bottom-0 h-[3px] ${barra}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// Componente Renta preservado por compatibilidad
export function Renta() {
  const { amueblada } = useAmueblado();
  const [plazo, setPlazo] = useState("12 meses");
  const precio = amueblada ? "$1,200" : "$800";
  const plazos = ["6 meses", "12 meses", "18 meses"];
  const beneficios = ["Mantenimiento incluido.", "Áreas verdes de recreación.", "Seguridad 24/7."];

  return (
    <section id="renta" aria-labelledby="titulo-renta" className="marco scroll-mt-20 py-[clamp(80px,10vw,150px)]">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="titulo-renta" className="font-display text-seccion">
            Residencia Tipo A
          </h2>
          <div>
            <p className="mt-8 text-texto">Inversión mensual estimada, {amueblada ? "amueblada" : "sin amueblar"}</p>
            <p className="mt-2 flex items-baseline gap-4 overflow-hidden" aria-live="polite">
              <span className="font-display text-portada">{precio}</span>
              <span className="font-display text-frase">al mes</span>
            </p>
          </div>
          <div className="mt-8">
            <SelectorAmueblado tono="claro" />
          </div>
        </div>

        <div className="bg-papel p-7 md:p-10 lg:col-span-5">
          <h3 className="font-display text-frase">Plazo del contrato</h3>
          <div role="radiogroup" aria-label="Plazo del contrato" className="mt-5 grid grid-cols-3 gap-2">
            {plazos.map((opcion) => {
              const activo = plazo === opcion;
              return (
                <button
                  key={opcion}
                  type="button"
                  role="radio"
                  aria-checked={activo}
                  onClick={() => setPlazo(opcion)}
                  className={`px-2 py-3 text-[0.9375rem] font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.97] ${
                    activo ? "bg-grafito text-cal" : "bg-cal text-grafito hover:bg-salvia"
                  }`}
                >
                  {opcion}
                </button>
              );
            })}
          </div>

          <h3 className="mt-10 font-display text-frase">Incluye</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-texto">
            {beneficios.map((beneficio) => (
              <li key={beneficio}>{beneficio}</li>
            ))}
          </ul>

          <Link href="/contact" className="boton-principal mt-10 w-full">
            Agendar visita <span className="flecha" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
