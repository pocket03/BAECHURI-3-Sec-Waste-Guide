import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import { NoticeManager } from "@/components/NoticeManager";
import { TenantManager } from "@/components/TenantManager";
import { FaqManager } from "@/components/FaqManager";
import { BuildingQrCard } from "@/components/BuildingQrCard";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-green-700">배추리 매니저</p>
          <h1 className="text-2xl font-extrabold mt-1">집주인 관리 페이지</h1>
          <p className="text-neutral-600 mt-2 text-sm">{user.email}로 로그인됨</p>
        </div>
        <LogoutButton />
      </header>

      <div className="flex flex-col gap-8">
        <BuildingQrCard userId={user.id} />
        <TenantManager userId={user.id} />
        <FaqManager userId={user.id} />
        <NoticeManager userId={user.id} />
      </div>
    </main>
  );
}
