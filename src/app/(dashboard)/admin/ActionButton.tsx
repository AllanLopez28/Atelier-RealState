"use client";

import { useState } from "react";
import { approveApplication } from "./actions";

export function ActionButton({ applicationId, prospectId }: { applicationId: string, prospectId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleApprove() {
    setIsPending(true);
    try {
      await approveApplication(applicationId, prospectId);
    } catch (error) {
      console.error(error);
      alert("Error aprobando aplicación. Revisa la consola.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button 
      onClick={handleApprove}
      disabled={isPending}
      className="px-4 py-1.5 bg-[#f2f7ff] hover:bg-blue-50 text-blue-600 font-semibold text-[12px] rounded-full transition-colors disabled:opacity-50 border border-blue-100"
    >
      {isPending ? "Aprobando..." : "Aprobar"}
    </button>
  );
}
