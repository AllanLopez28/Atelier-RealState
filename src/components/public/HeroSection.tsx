import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[650px] w-full">
      {/* Background Image */}
      <Image
        src="/exterior1.png"
        alt="Exterior view of Atelier Estate"
        fill
        className="object-cover"
        priority
      />

      {/* Fade Effect */}
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-10" />

      {/* Content Container (Text & CTA) */}
      <div className="absolute inset-x-0 bottom-0 w-full max-w-[1600px] mx-auto px-8 md:px-16 pb-16 flex flex-col md:flex-row justify-between md:items-end gap-10">

        {/* Left Block (Text) */}
        <div className="max-w-[42rem] z-10">
          <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-600 mb-4">
            Exclusividad en Renta
          </p>
          <h1 className="text-[3.25rem] md:text-[3.5rem] leading-[1.15] text-[#0f172a] font-medium mb-5 tracking-tight">
            Tu nuevo hogar en<br className="hidden md:block" /> Residencial las arboledas
          </h1>
          <p className="text-gray-600 text-[1.05rem] leading-relaxed max-w-[34rem]">
            Descubre un estilo de vida elevado. Residencias diseñadas para el confort duradero, rodeadas de naturaleza y con acabados de primera calidad.
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 mb-1 z-10">
          <Link href="/properties" className="inline-flex items-center justify-center bg-[#4A5E50] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#3d4d42] transition-colors shadow-lg shadow-[#4A5E50]/20 text-[15px]">
            Ver opciones de renta <span className="ml-2 font-bold">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
