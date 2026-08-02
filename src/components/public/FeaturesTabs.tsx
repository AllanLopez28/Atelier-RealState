"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Primer Nivel", "Segundo Nivel", "Especificaciones Técnicas"];

  return (
    <section className="w-full max-w-[1600px] mx-auto py-24 px-8 md:px-16 overflow-hidden">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-medium text-[#2d3748] mb-4"
        >
          Distribución Espacial
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[1.05rem] text-gray-500 leading-relaxed"
        >
          Un diseño pensado para maximizar la luz natural y la fluidez entre los espacios interiores y exteriores.
        </motion.p>
      </div>

      {/* Tabs Navigation */}
      <div className="relative mb-16 max-w-4xl mx-auto">
        <div className="flex justify-center gap-10 md:gap-16">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`pb-4 text-sm font-medium transition-colors relative z-10 ${
                activeTab === index 
                  ? "text-slate-900 font-bold" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === index && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#4A5E50]"
                />
              )}
            </button>
          ))}
        </div>
        {/* Horizontal Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-100" />
      </div>

      {/* Dynamic Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div 
              key="primer-nivel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Left Image */}
              <div className="relative w-full h-[500px] bg-[#eef2f6] rounded-3xl overflow-hidden">
                <Image 
                  src="/plano1.png" 
                  alt="Plano Primer Nivel" 
                  fill 
                  className="object-contain p-6 mix-blend-multiply"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-col">
                <h3 className="text-[1.8rem] font-medium text-[#1e293b] mb-4">Área Social & Jardín</h3>
                <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-10">
                  El primer nivel está concebido para la convivencia. Cuenta con una sala amplia, comedor independiente, cocina con pantries y acabados finos, conectando armónicamente con la terraza y el jardín. Incluye área de servicio completa.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    }
                    title="Área Construida"
                    value="115 m²"
                  />
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    title="Terreno"
                    value="160 v²"
                  />
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a9 9 0 0018 0c0-4.97-9-13-9-13s-9 8.03-9 13z" />
                      </svg>
                    }
                    title="Cisterna"
                    value="2.5 m³"
                  />
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6h5.5a4 4 0 110 8H8V6zM8 14v6" />
                      </svg>
                    }
                    title="Estacionamiento"
                    value="2 Autos"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div 
              key="segundo-nivel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Left Image */}
              <div className="relative w-full h-[500px] bg-[#eef2f6] rounded-3xl overflow-hidden">
                <Image 
                  src="/plano2.png" 
                  alt="Plano Segundo Nivel" 
                  fill 
                  className="object-contain p-6 mix-blend-multiply"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-col">
                <h3 className="text-[1.8rem] font-medium text-[#1e293b] mb-4">Área Privada & Descanso</h3>
                <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-10">
                  Diseñado para el confort total. Habitaciones amplias y ventiladas que garantizan un descanso reparador y privacidad para todos los miembros del hogar.
                </p>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5v14M19 5v14M5 10h14M5 14h14" />
                      </svg>
                    }
                    title="Habitación Principal"
                    value="Baño y walk-in closet"
                  />
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    }
                    title="Habitaciones Junior"
                    value="2 (Comparten baño)"
                  />
                  <FeatureCard 
                    icon={
                      <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 8h18M12 3v18" />
                      </svg>
                    }
                    title="Acabados"
                    value="Ventanas francesas"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div 
              key="especificaciones"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto bg-slate-50 border border-gray-100 rounded-3xl p-10 md:p-14 shadow-sm"
            >
              <h3 className="text-[1.6rem] font-medium text-[#1e293b] mb-8 text-center">Resumen Técnico (Modelo Azucena)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4A5E50]"></span>
                    Dimensiones Generales
                  </h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span>Área Construida</span>
                      <span className="font-medium text-slate-800">115 m²</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span>Terreno</span>
                      <span className="font-medium text-slate-800">160 v²</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                      <span>Niveles</span>
                      <span className="font-medium text-slate-800">2 Plantas</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4A5E50]"></span>
                    Detalles Adicionales
                  </h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#4A5E50] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Ampliaciones permitidas por la administración bajo lineamientos estéticos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#4A5E50] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Diseño estructural antisísmico con fundaciones de zapata corrida.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#4A5E50] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Cisterna subterránea individual de 2.5 m³.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}

// Subcomponente para las tarjetas
function FeatureCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-gray-500">
          {icon}
        </div>
        <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wide">{title}</p>
      </div>
      <p className="text-[1.3rem] font-semibold text-slate-800 ml-8">{value}</p>
    </div>
  );
}
