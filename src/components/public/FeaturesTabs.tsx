"use client";

import { useState } from "react";
import Image from "next/image";

interface RoomItem {
  id: string;
  name: string;
  description: string;
  image: string;
  top: string;
  left: string;
}

const plantaBajaData: RoomItem[] = [
  {
    id: "sala",
    name: "Sala amplia",
    description: "Con ventanas francesas hacia el jardín.",
    image: "/Aint1.png",
    top: "72.9%",
    left: "56.6%",
  },
  {
    id: "comedor",
    name: "Comedor independiente",
    description: "Espacio ideal para compartir en familia.",
    image: "/Aint1.png",
    top: "36.0%",
    left: "51.0%",
  },
  {
    id: "cocina",
    name: "Cocina",
    description: "Con pantries y acabados finos.",
    image: "/Acocina1.png",
    top: "41.3%",
    left: "68.4%",
  },
  {
    id: "terraza",
    name: "Terraza y jardín",
    description: "Conexión perfecta con el exterior.",
    image: "/terraza.png",
    top: "75.5%",
    left: "88.8%",
  },
  {
    id: "garage",
    name: "Garage",
    description: "Espacio para 2 vehículos.",
    image: "/jardin1.png",
    top: "55.3%",
    left: "22.4%",
  },
  {
    id: "servicio",
    name: "Área de servicio",
    description: "Área completa y funcional.",
    image: "/servicios.png",
    top: "24.6%",
    left: "88.8%",
  },
];

const plantaAltaData: RoomItem[] = [
  {
    id: "hab-principal",
    name: "Habitación principal",
    description: "Con baño privado y amplio walk-in closet.",
    image: "/Aroom1.png",
    top: "37%",
    left: "24%",
  },
  {
    id: "closet",
    name: "Walk-in closet y baño",
    description: "Acabados modernos y máxima privacidad.",
    image: "/Vroom1.png",
    top: "24%",
    left: "40%",
  },
  {
    id: "junior-1",
    name: "Habitación junior 1",
    description: "Con ventanas francesas e iluminación natural.",
    image: "/Aroom1.png",
    top: "63%",
    left: "22%",
  },
  {
    id: "junior-2",
    name: "Habitación junior 2",
    description: "Espacio versátil con excelente ventilación.",
    image: "/Aroom1.png",
    top: "66%",
    left: "72%",
  },
  {
    id: "bano-compartido",
    name: "Baño compartido",
    description: "Con tina y acabados de primera calidad.",
    image: "/servicios.png",
    top: "51%",
    left: "74%",
  },
];

const tabs = ["Planta baja", "Planta alta", "Ficha técnica"] as const;
type TabType = (typeof tabs)[number];

const fichaDetalles = [
  { etiqueta: "Área construida", valor: "115 m²" },
  { etiqueta: "Terreno", valor: "160 v²" },
  { etiqueta: "Niveles", valor: "2 plantas" },
  { etiqueta: "Cisterna", valor: "2.5 m³" },
  { etiqueta: "Etapa de construcción", valor: "2016 a 2019" },
  { etiqueta: "Estacionamiento", valor: "2 vehículos" },
  { etiqueta: "Estructura", valor: "Diseño antisísmico" },
];

export default function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("Planta baja");
  const [activeRoom, setActiveRoom] = useState<RoomItem>(plantaBajaData[0]);
  const [activeRoomAlta, setActiveRoomAlta] = useState<RoomItem>(plantaAltaData[0]);
  const [zoom, setZoom] = useState<number>(1);

  const currentRoom = activeTab === "Planta alta" ? activeRoomAlta : activeRoom;
  const currentData = activeTab === "Planta alta" ? plantaAltaData : plantaBajaData;

  const handleSelectRoom = (room: RoomItem) => {
    if (activeTab === "Planta alta") {
      setActiveRoomAlta(room);
    } else {
      setActiveRoom(room);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 1));
  const handleZoomReset = () => setZoom(1);

  return (
    <section
      id="distribucion"
      aria-labelledby="titulo-distribucion"
      className="py-[clamp(48px,8vw,100px)] bg-[#F9F8F4] font-texto select-none"
    >
      <div className="marco max-w-[1480px] mx-auto">
        {/* ======================================================== */}
        {/* 1. CABECERA Y TABS                                       */}
        {/* ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8">
          <div>
            <h2
              id="titulo-distribucion"
              className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.9] text-[#3B2B20] uppercase"
            >
              DISTRIBUCIÓN
              <br />
              ESPACIAL
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#3B2B20]/80 max-w-sm md:text-right font-normal leading-snug">
            Explorá cada ambiente y descubrí cómo se conecta tu próximo hogar.
          </p>
        </div>

        {/* Pestañas (Tabs) */}
        <div
          role="tablist"
          aria-label="Pestañas de distribución arquitectónica"
          className="flex items-center gap-2 sm:gap-3 mb-8 md:mb-10"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(tab);
                  setZoom(1);
                }}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-[#3B2B20] text-white shadow-sm"
                    : "text-[#7A6B60] hover:text-[#3B2B20] hover:bg-stone-200/50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 2. LAYOUT PRINCIPAL (GRID 2 COLUMNAS)                    */}
        {/* ======================================================== */}
        {activeTab !== "Ficha técnica" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-stretch">
            {/* ---------------------------------------------------- */}
            {/* COLUMNA IZQUIERDA: PLANO INTERACTIVO                 */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white rounded-[2rem] p-5 sm:p-7 md:p-8 shadow-sm border border-stone-200/60 flex flex-col justify-between">
              {/* Contenedor relativo del plano con Hotspots */}
              <div className="relative w-full aspect-[1520/1139] overflow-hidden rounded-xl">
                <div
                  className="relative w-full h-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center center",
                  }}
                >
                  <Image
                    src={activeTab === "Planta alta" ? "/plano2.png" : "/plano1.png"}
                    alt={
                      activeTab === "Planta alta"
                        ? "Plano arquitectónico de Planta Alta"
                        : "Plano arquitectónico de Planta Baja"
                    }
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain pointer-events-none"
                  />

                  {/* Hotspots interactivos */}
                  {currentData.map((room) => {
                    const isSelected = currentRoom.id === room.id;
                    return (
                      <button
                        key={room.id}
                        type="button"
                        aria-label={`Ver ambiente ${room.name}`}
                        aria-pressed={isSelected}
                        onClick={() => handleSelectRoom(room)}
                        style={{ top: room.top, left: room.left }}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 flex items-center justify-center p-2 focus:outline-none"
                      >
                        {/* Halo del punto activo */}
                        {isSelected && (
                          <>
                            <span className="absolute w-8 h-8 rounded-full border border-[#D96C4A] animate-ping opacity-35" />
                            <span className="absolute w-8 h-8 rounded-full border border-[#D96C4A]/40" />
                          </>
                        )}

                        {/* Círculo de color naranja claro / óxido con borde blanco grueso */}
                        <span
                          className={`block rounded-full bg-[#D96C4A] border-[2.5px] border-white shadow-[0_2px_8px_rgba(217,108,74,0.4)] transition-all duration-200 group-hover:scale-125 ${
                            isSelected ? "w-4 h-4 ring-2 ring-[#D96C4A]/30" : "w-3.5 h-3.5"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controles inferiores del plano */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-3 border-t border-stone-100">
                {/* Texto explicativo con ícono i */}
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#7A6B60] font-medium">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full border border-[#D96C4A] text-[#D96C4A] text-[10px] font-bold shrink-0">
                    i
                  </span>
                  <span>Seleccioná un punto del plano para ver el ambiente.</span>
                </div>

                {/* Controles de zoom (-, +, [ ]) */}
                <div
                  role="group"
                  aria-label="Controles de zoom del plano"
                  className="flex items-center gap-1 bg-[#F4F1EA] p-1 rounded-full text-[#3B2B20]"
                >
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoom <= 1}
                    aria-label="Reducir zoom"
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-sm font-bold transition-colors disabled:opacity-40"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoom >= 2}
                    aria-label="Aumentar zoom"
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-sm font-bold transition-colors disabled:opacity-40"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomReset}
                    aria-label="Restablecer vista del plano"
                    title="Restablecer vista"
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* COLUMNA DERECHA: PANEL DE DETALLE                    */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Imagen Dinámica del Ambiente (formato 16:9) */}
                <div className="relative w-full aspect-[16/9] rounded-[2rem] sm:rounded-[2.2rem] overflow-hidden shadow-md bg-stone-100">
                  <Image
                    key={currentRoom.id}
                    src={currentRoom.image}
                    alt={currentRoom.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-all duration-500"
                  />

                  {/* Overlay Esquina Inferior Izquierda: Píldora de Cristal Esmerilado */}
                  <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-lg">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full border border-white/80 text-[10px] font-bold leading-none">
                        +
                      </span>
                      <span className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm whitespace-nowrap">
                        {currentRoom.name}
                      </span>
                    </div>
                  </div>

                  {/* Ícono de expansión en esquina inferior derecha */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  </div>
                </div>

                {/* Textos del Ambiente Activo */}
                <div className="mt-5 sm:mt-6">
                  <h3 className="font-black text-2xl sm:text-3xl tracking-tight text-[#3B2B20] uppercase">
                    {currentRoom.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3B2B20]/80 mt-1 font-normal leading-relaxed">
                    {currentRoom.description}
                  </p>
                </div>
              </div>

              {/* Lista de Ambientes (Grid de 2 Columnas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-2.5 sm:gap-y-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-stone-200/80">
                {currentData.map((room) => {
                  const isSelected = currentRoom.id === room.id;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => handleSelectRoom(room)}
                      aria-pressed={isSelected}
                      className="flex items-center justify-between py-1.5 px-1 text-sm font-medium transition-colors cursor-pointer group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Ícono izquierdo: Círculo naranja relleno si activo, círculo gris hueco si inactivo */}
                        {isSelected ? (
                          <span
                            className="w-2.5 h-2.5 rounded-full bg-[#D96C4A] shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <span
                            className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#9E948B] shrink-0 group-hover:border-[#3B2B20]"
                            aria-hidden="true"
                          />
                        )}

                        <span
                          className={`transition-colors ${
                            isSelected
                              ? "font-bold text-[#3B2B20]"
                              : "text-[#5A4F46] group-hover:text-[#3B2B20]"
                          }`}
                        >
                          {room.name}
                        </span>
                      </div>

                      {/* Ícono derecho: Chevron ligero > */}
                      <span
                        className="text-[#9E948B] text-xs font-semibold group-hover:translate-x-0.5 group-hover:text-[#3B2B20] transition-all ml-2"
                        aria-hidden="true"
                      >
                        &gt;
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* FICHA TÉCNICA (TAB 3)                                     */
          /* ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-stone-200/60 lg:col-span-7">
              <div className="relative aspect-[2816/1536] w-full">
                <Image
                  src="/plano.png"
                  alt="Planos arquitectónicos del Modelo Azucena"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-stone-200/60">
              <h3 className="font-black text-2xl sm:text-3xl text-[#3B2B20] tracking-tight uppercase">
                Modelo Azucena
              </h3>
              <p className="mt-2 text-sm text-[#7A6B60]">
                Proyecto Las Camelias, Residencial Las Arboledas.
              </p>

              <table className="mt-6 w-full border-collapse text-sm">
                <caption className="sr-only">Dimensiones generales</caption>
                <tbody>
                  {fichaDetalles.map((fila) => (
                    <tr
                      key={fila.etiqueta}
                      className="border-t border-stone-200 first:border-t-0"
                    >
                      <th
                        scope="row"
                        className="py-3 pr-4 text-left font-normal text-[#5A4F46]"
                      >
                        {fila.etiqueta}
                      </th>
                      <td className="py-3 text-right font-bold text-[#3B2B20]">
                        {fila.valor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
