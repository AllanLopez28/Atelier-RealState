"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { registerUser } from "./actions";

const initialState = {
  error: null as string | null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#4A5E50] hover:bg-[#3d4d42] text-white rounded-md py-[0.85rem] font-medium transition-colors flex items-center justify-center gap-2 text-[0.95rem] shadow-sm"
    >
      {pending ? "Creando cuenta..." : "Crear Cuenta"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column (Image) */}
      <div className="relative hidden md:block w-full h-full bg-slate-100">
        <Image 
          src="/exterior1.png" 
          alt="Exterior Architecture" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Right Column (Form) */}
      <div className="bg-[#f8fbff] md:bg-white flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-[28px] text-[#001738] font-bold leading-tight mb-2">
              Crear Cuenta
            </h1>
            <p className="text-gray-500 text-[14px]">
              Únete a Atelier Estate para descubrir propiedades exclusivas.
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-[18px] w-[18px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Ej. Ana García"
                  className="w-full pl-[2.6rem] pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A5E50]/20 focus:border-[#4A5E50] transition-colors placeholder:text-gray-300 shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-[18px] w-[18px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full pl-[2.6rem] pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A5E50]/20 focus:border-[#4A5E50] transition-colors placeholder:text-gray-300 shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="h-[18px] w-[18px] text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-[2.6rem] pr-[2.6rem] py-2.5 bg-white border border-gray-200 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-[#4A5E50]/20 focus:border-[#4A5E50] transition-colors placeholder:text-gray-300 shadow-sm"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600">
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {state?.error && (
              <p className="text-red-500 text-[13px] font-medium">{state.error}</p>
            )}

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>

          {/* Separator */}
          <div className="relative mt-8 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-[11px] font-bold tracking-wider uppercase">
              <span className="px-4 bg-[#f8fbff] md:bg-white text-gray-400">O REGÍSTRATE CON</span>
            </div>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-slate-700 rounded-md py-2.5 hover:bg-gray-50 transition-colors text-[14px] font-medium shadow-sm">
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          {/* Footer */}
          <p className="mt-12 text-center text-[13px] text-gray-500">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-slate-700 font-bold hover:underline">Iniciar Sesión</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
