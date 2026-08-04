"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveApplication(applicationId: string, prospectId: string) {
  const supabase = await createClient();

  // 1. Update the application to 'Aprobada'
  const { error: appError } = await supabase
    .from("applications")
    .update({ status: "Aprobada" })
    .eq("id", applicationId);

  if (appError) throw new Error(`Error actualizando aplicación: ${appError.message}`);

  // 2. Update the profile role to 'inquilino'
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role: "inquilino" as any })
    .eq("id", prospectId);

  if (profileError) throw new Error(`Error actualizando perfil: ${profileError.message}`);

  revalidatePath("/admin");
}

export async function revertApplication(applicationId: string, prospectId: string) {
  const supabase = await createClient();

  // 1. Update the application to 'En Revisión'
  const { error: appError } = await supabase
    .from("applications")
    .update({ status: "En Revisión" })
    .eq("id", applicationId);

  if (appError) throw new Error(`Error revirtiendo aplicación: ${appError.message}`);

  // 2. Update the profile role to 'prospecto'
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role: "prospecto" as any })
    .eq("id", prospectId);

  if (profileError) throw new Error(`Error revirtiendo perfil: ${profileError.message}`);

  revalidatePath("/admin");
}

export async function createNotice(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "No autorizado" };

  const titulo = formData.get("titulo") as string;
  const descripcion = formData.get("descripcion") as string;
  const tipo = formData.get("tipo") as string;

  if (!titulo || !descripcion || !tipo) {
    return { error: "Todos los campos son obligatorios." };
  }

  const { error } = await supabase
    .from("avisos")
    .insert({
      titulo,
      descripcion,
      tipo,
    });

  if (error) return { error: "Error creando aviso: " + error.message };

  // Revalidate both admin and tenant dashboards to see changes immediately
  revalidatePath("/admin");
  revalidatePath("/inquilino");
  
  return { success: true };
}

export async function deleteNotice(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("No autorizado");

  const { error } = await supabase
    .from("avisos")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error eliminando aviso: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/inquilino");
}
