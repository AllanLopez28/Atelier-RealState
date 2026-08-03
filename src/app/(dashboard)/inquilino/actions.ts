"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 1. Fetch next pending payment
  const { data: pago } = await supabase
    .from("pagos")
    .select("*")
    .eq("user_id", user.id)
    .eq("estado", "pendiente")
    .order("fecha_vencimiento", { ascending: true })
    .limit(1)
    .single();

  // 2. Fetch latest maintenance tickets
  const { data: tickets } = await supabase
    .from("tickets_mantenimiento")
    .select("*")
    .eq("user_id", user.id)
    .order("fecha_creacion", { ascending: false })
    .limit(5);

  // 3. Fetch notices
  const { data: avisos } = await supabase
    .from("avisos")
    .select("*")
    .order("fecha_publicacion", { ascending: false })
    .limit(5);

  return { 
    pago: pago || null, 
    tickets: tickets || [], 
    avisos: avisos || [] 
  };
}

export async function createTicket(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "No autorizado" };

  const asunto = formData.get("asunto") as string;
  const descripcion = formData.get("descripcion") as string;

  if (!asunto) return { error: "El asunto es requerido." };

  const ticket_number = `#TK-${Math.floor(1000 + Math.random() * 9000)}`;

  const { error } = await supabase
    .from("tickets_mantenimiento")
    .insert({
      user_id: user.id,
      ticket_number,
      asunto,
      descripcion,
      estado: "Abierto",
    });

  if (error) return { error: "Error creando el ticket: " + error.message };

  revalidatePath("/inquilino");
  return { success: true };
}
