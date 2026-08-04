"use client";

import { useState, useActionState } from "react";
import { createNotice } from "./actions";

export default function NewNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createNotice, { success: false, error: undefined });

  if (state?.success && isOpen) {
    setIsOpen(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[12px] font-bold text-[#5d6e5c] hover:text-[#4a5849] tracking-widest uppercase transition-colors"
      >
        NUEVO AVISO +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[24px] w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-[#001738]">Publicar Aviso</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-slate-800 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form action={formAction} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2">Título del Aviso</label>
                <input 
                  type="text" 
                  name="titulo"
                  required
                  placeholder="Ej. Corte de Agua Programado"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#5d6e5c]/20 focus:border-[#5d6e5c] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2">Tipo de Aviso</label>
                <select 
                  name="tipo" 
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#5d6e5c]/20 focus:border-[#5d6e5c] transition-colors appearance-none"
                >
                  <option value="urgente">🔴 Urgente</option>
                  <option value="informativo">⚪ Informativo</option>
                  <option value="evento">🔵 Evento</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2">Descripción</label>
                <textarea 
                  name="descripcion"
                  required
                  rows={4}
                  placeholder="Escriba los detalles del aviso aquí..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#5d6e5c]/20 focus:border-[#5d6e5c] transition-colors resize-none"
                ></textarea>
              </div>

              {state?.error && <p className="text-red-500 text-[13px] font-medium">{state.error}</p>}

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-[14px] font-semibold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 bg-[#5d6e5c] hover:bg-[#4a5849] text-white text-[14px] font-semibold rounded-xl shadow-sm transition-colors"
                >
                  Publicar Aviso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
