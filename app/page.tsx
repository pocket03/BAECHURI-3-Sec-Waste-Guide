import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LandlordDashboard } from "@/components/LandlordDashboard";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <LandlordDashboard userId={user.id} userEmail={user.email ?? ""} />;
}
