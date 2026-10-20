"use client";

import Image from "next/image";
import Link from "next/link";

export default function LocationSection() {
  return (
    <section
      id="ubicacion"
      aria-label="Ubicación y entorno"
      className="relative w-full min-h-[620px] h-[92svh] sm:h-[80vh] md:min-h-[720px] lg:h-[85vh] lg:min-h-[780px] max-h-[960px] overflow-hidden select-none isolate"
    >
      {/* Fondo del mapa */}
      <Image
        src="/mapback.png"
        alt="Mapa de ubicación de Residencial Arboledas en Lourdes, Colón"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_center] pointer-events-none z-0"
      />

      {/* Capa SVG: Polígono perimetral punteado del master plan (visible en pantallas sm en adelante para evitar distorsión vertical en móviles) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[5] hidden sm:block"
        viewBox="0 0 1000 562.5"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points="115,374 185,301 205,200 540,157 805,132 895,174 850,292 515,326 515,360 115,374"
          fill="none"
          stroke="#C05A45"
          strokeWidth="1.8"
          strokeDasharray="4,4"
          strokeOpacity="0.85"
        />
      </svg>

      {/* ======================================================== */}
      {/* HEADER SUPERIOR: Tipografía y Etiqueta                   */}
      {/* ======================================================== */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 md:top-14 md:left-14 md:right-14 lg:top-16 lg:left-16 lg:right-16 z-20 pointer-events-auto flex items-start justify-between gap-2">
        {/* Esquina Superior Izquierda: UBICACIÓN + Título Masivo */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1 sm:mb-2 md:mb-3">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#4A3219] uppercase">
              UBICACIÓN
            </span>
            <span
              className="h-[1.5px] w-8 sm:w-20 md:w-48 lg:w-64 bg-[#7A675B]/40 inline-block"
              aria-hidden="true"
            />
          </div>

          <h2 className="font-black text-[1.85rem] sm:text-3xl md:text-6xl lg:text-7xl xl:text-[6.2rem] leading-[0.9] md:leading-[0.88] tracking-tight md:tracking-tighter text-[#4A3219]">
            CERCA DE TODO.
            <br />
            CERCA DE VOS.
          </h2>
        </div>

        {/* Esquina Superior Derecha: ARBOLEDAS / LOURDES, COLÓN */}
        <div className="flex items-center border-l-2 border-stone-400/80 pl-2.5 sm:pl-3.5 md:pl-4 text-left shrink-0 mt-0.5">
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.16em] text-[#35231B] uppercase leading-tight">
              ARBOLEDAS
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.12em] text-[#554035] uppercase leading-tight mt-0.5">
              LOURDES, COLÓN
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CALL TO ACTION (Esquina Inferior Izquierda)              */}
      {/* ======================================================== */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto md:bottom-14 md:left-14 lg:bottom-16 lg:left-16 z-20 pointer-events-auto">
        <div className="max-w-[310px] sm:max-w-sm bg-[#FAF8F5]/92 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-3.5 sm:p-0 rounded-2xl sm:rounded-none border border-white/60 sm:border-none shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:shadow-none">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#35231B] leading-[1.15] tracking-tight">
            Tu próximo hogar,
            <br />
            en Lourdes, Colón.
          </p>

          <div className="border-t border-stone-400/60 pt-2.5 sm:pt-3.5 mt-2.5 sm:mt-4 w-fit">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#35231B] uppercase hover:text-[#C05A45] transition-colors duration-200"
            >
              <span>EXPLORÁ LA UBICACIÓN</span>
              <span
                className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MARCADORES DEL MAPA (Map Pins)                           */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* --- MARCADOR PRINCIPAL: Residencial Arboledas --- */}
        <div
          className="absolute top-[40%] left-[8%] sm:top-[44%] sm:left-[23.5%] -translate-y-1/2 flex items-center gap-1 sm:gap-1.5 pointer-events-auto group cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{ willChange: "transform" }}
        >
          {/* Pin Grande rojo/óxido con sombra y brillo */}
          <div className="relative flex items-center justify-center shrink-0">
            <span className="absolute -inset-1 rounded-full bg-[#C05A45]/25 animate-ping opacity-75" />

            <svg
              className="w-6 h-8 sm:w-8 sm:h-10 md:w-9 md:h-11 drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] text-[#C05A45]"
              viewBox="0 0 32 40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 0C7.16 0 0 7.16 0 16C0 26.5 14 39 16 40C18 39 32 26.5 32 16C32 7.16 24.84 0 16 0Z"
                fill="currentColor"
              />
              <circle cx="16" cy="15" r="5.5" fill="#752B1E" />
            </svg>
          </div>

          {/* Etiqueta tipo píldora */}
          <div className="bg-[#C05A45] text-white text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-[0_4px_10px_rgba(192,90,69,0.35)] whitespace-nowrap transition-colors duration-200 group-hover:bg-[#AC4733]">
            RESIDENCIAL ARBOLEDAS
          </div>
        </div>

        {/* --- MARCADORES SECUNDARIOS --- */}

        {/* 1. Carretera Panamericana (a lo largo de la vía izquierda) */}
        <div
          className="absolute top-[51%] left-[3%] sm:left-[4.8%] -translate-y-1/2 -rotate-[75deg] md:-rotate-[72deg] origin-center pointer-events-auto select-none"
        >
          <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.14em] text-[#3D2C22]/85 uppercase whitespace-nowrap">
            Carretera Panamericana
          </span>
        </div>

        {/* Paradas de transporte en Carretera Panamericana */}
        <div
          className="absolute top-[26%] left-[3.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-[#495B6A] text-white shadow-xs pointer-events-auto"
          title="Parada Carretera Panamericana Norte"
        >
          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2v1.5a1.5 1.5 0 01-3 0V15H7v1.5a1.5 1.5 0 01-3 0V15a2 2 0 01-2-2V4zm2 2h8V4H6v2zm0 3h8V7H6v2zm2 4a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>

        <div
          className="absolute top-[62%] left-[9%] sm:left-[10.6%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-[#495B6A] text-white shadow-xs pointer-events-auto"
          title="Parada Carretera Panamericana Centro"
        >
          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2v1.5a1.5 1.5 0 01-3 0V15H7v1.5a1.5 1.5 0 01-3 0V15a2 2 0 01-2-2V4zm2 2h8V4H6v2zm0 3h8V7H6v2zm2 4a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>

        <div
          className="absolute top-[71%] left-[12%] sm:left-[13.4%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-[#495B6A] text-white shadow-xs pointer-events-auto"
          title="Parada Carretera Panamericana Sur"
        >
          <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v9a2 2 0 01-2 2v1.5a1.5 1.5 0 01-3 0V15H7v1.5a1.5 1.5 0 01-3 0V15a2 2 0 01-2-2V4zm2 2h8V4H6v2zm0 3h8V7H6v2zm2 4a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>

        {/* 2. Residencial Las Magnolias */}
        <div className="absolute top-[47.5%] left-[24%] sm:top-[43.5%] sm:left-[36.8%] flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
          <span
            className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0 rounded-full bg-[#52606D] ring-2 ring-white ring-offset-1 ring-offset-[#52606D]/30 shadow-xs"
            aria-hidden="true"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white" />
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#4B5966] leading-tight select-none">
            Residencial
            <br />
            Las Magnolias
          </span>
        </div>

        {/* 3. Residencial Jacarandas II */}
        <div className="absolute top-[34%] left-[44%] sm:top-[35.2%] sm:left-[48.8%] -translate-x-full flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#4B5966] leading-tight text-right select-none whitespace-nowrap">
            Residencial Jacarandas II
          </span>
          <span
            className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0 rounded-full bg-[#52606D] ring-2 ring-white ring-offset-1 ring-offset-[#52606D]/30 shadow-xs"
            aria-hidden="true"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white" />
          </span>
        </div>

        {/* 4. Parque Las Acacias (con icono de árbol verde) */}
        <div className="absolute top-[28%] left-[50%] sm:top-[31.5%] sm:left-[55.8%] flex items-center gap-1 sm:gap-1.5 pointer-events-auto group cursor-pointer">
          <span className="text-[10px] sm:text-[11px] md:text-xs font-bold text-[#23633C] tracking-tight whitespace-nowrap select-none">
            Parque Las Acacias
          </span>
          <span
            className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#23633C] text-white shadow-sm transition-transform duration-200 group-hover:scale-110"
            aria-label="Parque Las Acacias"
          >
            <svg
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2L6 10h3l-4 7h6v5h2v-5h6l-4-7h3L12 2z" />
            </svg>
          </span>
        </div>

        {/* 5. Residencial Los Laureles */}
        <div className="absolute top-[55%] left-[42%] sm:top-[54.5%] sm:left-[46.8%] -translate-x-full flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#4B5966] leading-tight text-right select-none whitespace-nowrap">
            Residencial Los Laureles
          </span>
          <span
            className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0 rounded-full bg-[#52606D] ring-2 ring-white ring-offset-1 ring-offset-[#52606D]/30 shadow-xs"
            aria-hidden="true"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white" />
          </span>
        </div>

        {/* 6. Residencial Los Sauces I (en móvil alineado hacia adentro para que no se corte a la derecha) */}
        <div className="absolute top-[37%] right-4 sm:right-auto sm:left-[66.8%] flex items-center gap-1 sm:gap-1.5 flex-row-reverse sm:flex-row pointer-events-auto">
          <span
            className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0 rounded-full bg-[#52606D] ring-2 ring-white ring-offset-1 ring-offset-[#52606D]/30 shadow-xs"
            aria-hidden="true"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white" />
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#4B5966] leading-tight select-none whitespace-nowrap">
            Residencial Los Sauces I
          </span>
        </div>

        {/* 7. Residencial Las Amates (en móvil alineado hacia adentro para que no se corte a la derecha) */}
        <div className="absolute top-[28%] right-2.5 sm:right-auto sm:left-[74.8%] flex items-center gap-1 sm:gap-1.5 flex-row-reverse sm:flex-row pointer-events-auto">
          <span
            className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0 rounded-full bg-[#52606D] ring-2 ring-white ring-offset-1 ring-offset-[#52606D]/30 shadow-xs"
            aria-hidden="true"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white" />
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#4B5966] leading-tight select-none whitespace-nowrap">
            Residencial Las Amates
          </span>
        </div>

        {/* 8. Residencial Los Cipreses (en móvil alineado hacia adentro para que no se corte a la derecha) */}
        <div className="absolute top-[46%] right-2.5 sm:right-auto sm:left-[76.8%] flex items-center gap-1 sm:gap-1.5 flex-row-reverse sm:flex-row pointer-events-auto">
          <span
            className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0 rounded-full bg-[#52606D] ring-2 ring-white ring-offset-1 ring-offset-[#52606D]/30 shadow-xs"
            aria-hidden="true"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white" />
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-[#4B5966] leading-tight select-none whitespace-nowrap">
            Residencial Los Cipreses
          </span>
        </div>
      </div>
    </section>
  );
}
