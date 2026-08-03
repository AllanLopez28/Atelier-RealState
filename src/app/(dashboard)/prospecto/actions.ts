"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitApplication(formData: FormData) {
  const supabase = await createClient();
  
  // 1. Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "No autorizado" };
  }

  // 2. Extract files and data
  const duiFile = formData.get("dui_file") as File;
  const incomeFile = formData.get("income_file") as File;
  const rentalPreference = formData.get("rental_preference") as string;
  const propertyId = formData.get("property_id") as string;

  if (!duiFile || !incomeFile || duiFile.size === 0 || incomeFile.size === 0) {
    return { error: "Por favor sube ambos documentos requeridos." };
  }

  if (!propertyId) {
    return { error: "Por favor selecciona una propiedad de interés." };
  }

  try {
    // 3. Upload Files to Supabase Storage
    const timestamp = Date.now();
    const duiExt = duiFile.name.split('.').pop();
    const incomeExt = incomeFile.name.split('.').pop();
    
    const duiFileName = `${user.id}_dui_${timestamp}.${duiExt}`;
    const incomeFileName = `${user.id}_income_${timestamp}.${incomeExt}`;

    const { error: uploadErrorDui } = await supabase.storage
      .from('documentos')
      .upload(duiFileName, duiFile);

    if (uploadErrorDui) throw new Error("Error subiendo DUI: " + uploadErrorDui.message);

    const { error: uploadErrorIncome } = await supabase.storage
      .from('documentos')
      .upload(incomeFileName, incomeFile);

    if (uploadErrorIncome) throw new Error("Error subiendo comprobante de ingresos: " + uploadErrorIncome.message);

    // 4. Get Public URLs
    const { data: duiPublicUrl } = supabase.storage.from('documentos').getPublicUrl(duiFileName);
    const { data: incomePublicUrl } = supabase.storage.from('documentos').getPublicUrl(incomeFileName);

    // 5. Insert into applications
    const { error: insertError } = await supabase
      .from('applications')
      .insert({
        prospect_id: user.id,
        property_id: propertyId,
        lease_term: rentalPreference || 'Largo Plazo (12m)',
        status: 'En Revisión',
        documentos_url: {
          dui: duiPublicUrl.publicUrl,
          income: incomePublicUrl.publicUrl
        }
      });

    if (insertError) throw new Error("Error registrando aplicación: " + insertError.message);

    revalidatePath('/prospecto');
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Error procesando la aplicación." };
  }
}
