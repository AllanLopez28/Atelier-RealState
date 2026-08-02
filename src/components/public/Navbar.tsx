import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-slate-50 sticky top-0 z-50">
      <nav className="max-w-[1600px] mx-auto flex items-center justify-between px-8 md:px-16 py-5">
        {/* Left (Logo) */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <Image src="/logo.png" alt="Atelier Estate Logo" fill className="object-contain" />
          </div>
          <span className="text-[#1a202c] font-medium text-[1.35rem] tracking-tight">Atelier Estate</span>
        </div>

        {/* Center (Links) */}
        <ul className="hidden md:flex items-center gap-10 text-[15px] text-gray-500 font-medium">
          <li>
            <Link href="/" className="text-gray-900 border-b-[3px] border-gray-600 pb-1 font-semibold">Home</Link>
          </li>
          <li>
            <Link href="/properties" className="hover:text-gray-900 transition-colors">Properties</Link>
          </li>
          <li>
            <Link href="/services" className="hover:text-gray-900 transition-colors">Services</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          </li>
        </ul>

        {/* Right (Button) */}
        <div>
          <Link href="/login" className="bg-[#4A5E50] text-white px-8 py-2.5 rounded-full font-medium hover:bg-[#3d4d42] transition-colors text-sm shadow-sm">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
