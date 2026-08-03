"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function registerUser(prevState: any, formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!fullName || !email || !password) {
    return { error: "Por favor, completa todos los campos." };
  }

  const supabase = await createClient();

  // Registrar al usuario en Supabase Auth
  // Enviamos 'full_name' en options.data para que el Trigger lo procese
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: `Error en el registro: ${error.message}` };
  }

  // Redirigir al usuario al portal del prospecto una vez registrado exitosamente
  redirect("/prospecto");
}
