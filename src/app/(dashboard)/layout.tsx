import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white shadow-sm flex flex-col fixed inset-y-0 left-0 z-50">
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-[#c2a77d]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
              </svg>
            </div>
            <span className="font-semibold text-slate-800 tracking-[0.15em] text-[15px]">ATELIER</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link href="/inquilino" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors font-medium text-[14.5px]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tenant Portal
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#6B7F6A] text-white font-medium text-[14.5px] shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Admin Panel
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors font-medium text-[14.5px]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Onboarding
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-6 mt-auto">
          <div className="bg-[#f2f7ff] p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
               <div className="w-full h-full bg-[url('https://i.pravatar.cc/150?u=a042581f4e29026704d')] bg-cover"></div>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-800 leading-tight">Jane Cooper</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Premium Tenant</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-20 px-10 flex justify-end items-center gap-8 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
          <button className="text-gray-500 hover:text-slate-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button className="text-gray-500 hover:text-slate-800 transition-colors relative">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="text-[13px] font-semibold text-slate-700 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            Session: Active
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
