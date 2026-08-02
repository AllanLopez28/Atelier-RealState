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
