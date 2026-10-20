import Image from "next/image";
import Reveal, { RevealImagen, TituloAnimado } from "./Reveal";

export default function Manifesto() {
  return (
    <section aria-labelledby="titulo-manifiesto" className="marco py-[clamp(80px,10vw,150px)]">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col justify-between gap-10 md:col-span-7 lg:col-span-6">
          <div>
            <TituloAnimado id="titulo-manifiesto" texto="Rodeada de naturaleza" className="font-display text-seccion" />
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[32rem] font-display text-frase">
                Residencias diseñadas para el confort duradero, con acabados de primera calidad y una sala
                que se abre, bajo un arco, hacia el jardín.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <p className="max-w-[28rem] text-texto">
              Proyecto Las Camelias, dentro de Residencial Las Arboledas. Modelo Azucena, de dos plantas,
              construido en la etapa 2016–2019 con diseño estructural antisísmico.
            </p>
          </Reveal>
        </div>

        <figure className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <RevealImagen className="relative aspect-[4/5] w-full bg-papel">
            <Image
              src="/Vint1.png"
              alt="Sala y comedor sin amueblar, con salida al jardín por ventanas francesas"
              fill
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
          </RevealImagen>
          <Reveal delay={0.3}>
            <figcaption className="mt-3 text-nota">La sala, sin amueblar, con salida al jardín.</figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
