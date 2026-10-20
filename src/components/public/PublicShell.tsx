"use client";

import { createContext, useContext, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Instrument_Serif, Manrope } from "next/font/google";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const texto = Manrope({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});

// Estado compartido: amueblada / sin amueblar mueve galería, precio y plano a la vez
type Amueblado = { amueblada: boolean; setAmueblada: (valor: boolean) => void };

const AmuebladoContext = createContext<Amueblado>({ amueblada: true, setAmueblada: () => {} });

export const useAmueblado = () => useContext(AmuebladoContext);

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const [amueblada, setAmueblada] = useState(true);

  return (
    <AmuebladoContext.Provider value={{ amueblada, setAmueblada }}>
      <MotionConfig reducedMotion="user">
        <main className={`${display.variable} ${texto.variable} publico min-h-screen`}>{children}</main>
      </MotionConfig>
    </AmuebladoContext.Provider>
  );
}
