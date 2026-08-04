import { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('first_name, last_name, role, avatar_url')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return (
    <DashboardLayoutClient profile={profile}>
      {children}
    </DashboardLayoutClient>
  );
}
