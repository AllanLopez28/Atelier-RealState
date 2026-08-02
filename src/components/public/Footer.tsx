import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-24">
      {/* CTA Block */}
      <div className="bg-[#4A5E50] text-white py-20 md:py-24 px-8 flex flex-col items-center text-center">
        <h2 className="text-[2rem] md:text-[2.5rem] font-semibold mb-6 tracking-tight">
          Comienza tu proceso de aplicación
        </h2>
        <p className="text-white/80 max-w-2xl text-[1.1rem] leading-relaxed mb-10">
          Asegura tu residencia en Las Camelias completando nuestra aplicación en línea. Nuestro equipo de asesores revisará tu perfil en menos de 24 horas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link 
            href="/register" 
            className="w-full sm:w-auto bg-white text-slate-900 px-9 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-colors text-[15px] flex items-center justify-center"
          >
            Aplicar ahora
          </Link>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto bg-transparent border-[1.5px] border-white/80 text-white px-9 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors text-[15px] flex items-center justify-center"
          >
            Contactar Asesor
          </Link>
        </div>
      </div>

      {/* Copyright & Links Block */}
      <div className="bg-slate-50 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Atelier Estate © {currentYear}</span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
