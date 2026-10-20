/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta pública: Cal, Papel, Grafito, Arboleda, Bosque, Salvia, Liquen
        cal: "#F2F0EB",
        papel: "#E7E4DC",
        grafito: "#1B1F1C",
        arboleda: { DEFAULT: "#4A5E50", hondo: "#3E4F43" },
        bosque: "#232C26",
        salvia: "#DCE1D8",
        liquen: "#5F665F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        texto: ["var(--font-text)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Cinco tamaños: portada, sección, frase, texto, nota
        portada: ["clamp(2.75rem, 7.4vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        seccion: ["clamp(2rem, 3.5vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        frase: ["clamp(1.25rem, 1.75vw, 1.625rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        texto: ["1rem", { lineHeight: "1.65" }],
        nota: ["0.875rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
}
