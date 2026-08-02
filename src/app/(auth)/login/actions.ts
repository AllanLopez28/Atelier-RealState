"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Por favor, completa todos los campos." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Credenciales incorrectas. Por favor, intenta de nuevo." };
  }

  // Obtener rol del usuario
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    return { error: `Error de BD: ${profileError.message}` };
  }

  const role = profile?.role || "prospecto";

  if (role === "admin") {
    redirect("/admin");
  } else if (role === "inquilino") {
    redirect("/inquilino");
  } else {
    redirect("/prospecto");
  }
}
