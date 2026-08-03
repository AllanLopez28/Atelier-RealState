"use client";

import { useState } from "react";
import { approveApplication, revertApplication } from "./actions";

export function ActionButton({ applicationId, prospectId, status }: { applicationId: string, prospectId: string, status: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleAction() {
    setIsPending(true);
    try {
      if (status === 'Aprobada') {
        await revertApplication(applicationId, prospectId);
      } else {
        await approveApplication(applicationId, prospectId);
      }
    } catch (error) {
      console.error(error);
      alert("Error procesando solicitud. Revisa la consola.");
    } finally {
      setIsPending(false);
    }
  }

  if (status === 'Aprobada') {
    return (
      <button 
        onClick={handleAction}
        disabled={isPending}
        className="px-4 py-1.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 font-semibold text-[12px] rounded-full transition-colors disabled:opacity-50 border border-gray-200 hover:border-red-200"
      >
        {isPending ? "Revirtiendo..." : "Revertir a Prospecto"}
      </button>
    );
  }

  return (
    <button 
      onClick={handleAction}
      disabled={isPending}
      className="px-4 py-1.5 bg-[#f2f7ff] hover:bg-blue-50 text-blue-600 font-semibold text-[12px] rounded-full transition-colors disabled:opacity-50 border border-blue-100"
    >
      {isPending ? "Aprobando..." : "Aprobar"}
    </button>
  );
}
