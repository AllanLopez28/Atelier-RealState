"use client";

import { useState } from "react";
import { deleteNotice } from "./actions";

export default function DeleteNoticeButton({ noticeId }: { noticeId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Estás seguro de que deseas eliminar este aviso?")) return;
    
    setIsDeleting(true);
    try {
      await deleteNotice(noticeId);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el aviso.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Eliminar aviso"
    >
      {isDeleting ? (
        <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
}
