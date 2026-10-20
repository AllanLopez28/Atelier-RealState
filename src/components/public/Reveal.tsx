"use client";

import { motion, Variants } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

// Entrada escalonada: título, texto, imagen. Sube 20px con opacidad, una sola vez.
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}

const cortina: Variants = {
  oculta: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (delay: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, delay, ease: easeInOut },
  }),
};

const acercamiento: Variants = {
  oculta: { scale: 1.14 },
  visible: (delay: number) => ({ scale: 1, transition: { duration: 1.5, delay, ease: easeOut } }),
};

// Fotografía que se descubre de abajo arriba mientras se asienta el encuadre
export function RevealImagen({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      variants={cortina}
      custom={delay}
      initial="oculta"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div className="relative h-full w-full" variants={acercamiento} custom={delay}>
        {children}
      </motion.div>
    </motion.div>
  );
}

const linea: Variants = {
  oculta: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const palabra: Variants = {
  oculta: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

// Titular cuyas palabras suben, una tras otra, desde una máscara
export function TituloAnimado({
  texto,
  id,
  className,
  as = "h2",
}: {
  texto: string;
  id?: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      variants={linea}
      initial="oculta"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {texto.split(" ").map((p, i) => (
        <span key={i} className="mascara">
          <motion.span className="inline-block" variants={palabra}>
            {p}
            {i < texto.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Nombre de cierre: cada letra sube con un leve retraso respecto a la anterior
export function MarcaFinal({ texto, className }: { texto: string; className?: string }) {
  return (
    <motion.p
      aria-hidden="true"
      className={className}
      initial="oculta"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ oculta: {}, visible: { transition: { staggerChildren: 0.035 } } }}
    >
      <span className="mascara">
        {texto.split("").map((letra, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              oculta: { y: "105%" },
              visible: { y: "0%", transition: { duration: 1, ease: easeOut } },
            }}
          >
            {letra === " " ? " " : letra}
          </motion.span>
        ))}
      </span>
    </motion.p>
  );
}
