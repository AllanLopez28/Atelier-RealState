"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveModule() {
  const [isFurnished, setIsFurnished] = useState(true);

  return (
    <section className="w-full max-w-[1600px] mx-auto py-16 px-8 md:px-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Left Column (Gallery & Toggle) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Header & Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[1.8rem] text-slate-900 font-medium"
            >
              Explora el Interior
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-100 p-1 rounded-full inline-flex border border-gray-100 relative"
            >
              {/* Highlight background pill */}
              <motion.div
                className="absolute inset-y-1 bg-[#4A5E50] rounded-full shadow-sm"
                layout
                initial={false}
                animate={{
                  left: isFurnished ? "4px" : "110px",
                  width: isFurnished ? "106px" : "115px",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />

              <button
                onClick={() => setIsFurnished(true)}
                className={`relative z-10 px-6 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 ${isFurnished ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Amueblada
              </button>
              <button
                onClick={() => setIsFurnished(false)}
                className={`relative z-10 px-6 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 ${!isFurnished ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sin Amueblar
              </button>
            </motion.div>
          </div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 h-[500px]"
          >
            {/* Left Image (Large) */}
            <div className="relative col-span-1 h-full rounded-2xl overflow-hidden bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isFurnished ? 'A' : 'B'}
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={isFurnished ? "/Aint1.png" : "/Vint1.png"}
                    alt="Interior Principal"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Images (Stacked) */}
            <div className="col-span-1 flex flex-col gap-4 h-full">
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFurnished ? 'A' : 'B'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={isFurnished ? "/Acocina1.png" : "/Vcocina1.png"}
                      alt="Cocina"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isFurnished ? 'A' : 'B'}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={isFurnished ? "/Aroom1.png" : "/Vroom1.png"}
                      alt="Habitación"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Calculator) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="bg-[#f8fafc] rounded-3xl border border-gray-100 p-8 md:p-10 h-full flex flex-col shadow-sm">
            <h3 className="text-[11px] uppercase tracking-[0.1em] font-bold text-gray-500 mb-2">
              Calculadora de Renta
            </h3>
            <h4 className="text-[1.8rem] text-slate-900 font-medium mb-8">
              Residencia Tipo A
            </h4>

            {/* Price Block */}
            <div className="bg-[#f2f7ff] rounded-2xl p-6 mb-8 border border-blue-50">
              <p className="text-[13px] text-gray-600 font-medium mb-2">Inversión Mensual Estimada</p>
              <div className="flex items-baseline gap-2 overflow-hidden h-[3.2rem]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={isFurnished ? 'A' : 'B'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="text-[3.2rem] leading-none font-medium text-[#4A5E50]"
                  >
                    {isFurnished ? "$1,200" : "$800"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-gray-500 text-[15px]">/ mes</span>
              </div>
            </div>

            {/* Term Block */}
            <div className="mb-10">
              <p className="text-[13px] font-bold text-slate-900 mb-3">Plazo del Contrato</p>
              <div className="grid grid-cols-3 gap-3">
                <button className="py-2.5 px-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-500 hover:border-gray-300 transition-colors">
                  6 Meses
                </button>
                <button className="py-2.5 px-2 rounded-xl border-[1.5px] border-slate-700 bg-white shadow-sm text-[13px] font-medium text-slate-900 transition-colors">
                  12 Meses
                </button>
                <button className="py-2.5 px-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-500 hover:border-gray-300 transition-colors">
                  18 Meses
                </button>
              </div>
            </div>

            {/* Benefits List */}
            <ul className="space-y-3.5 mb-10 flex-1">
              {[
                "Mantenimiento incluido",
                "Areas verdes de recreación",
                "Seguridad 24/7"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-[14px]">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button className="w-full bg-[#dce8ff] text-[#1e40af] hover:bg-[#c6d9fe] py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-[15px] hover:scale-[1.02] active:scale-[0.98]">
              Agendar Visita
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
