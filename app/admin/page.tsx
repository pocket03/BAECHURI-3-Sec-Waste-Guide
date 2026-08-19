import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

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

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center text-neutral-500">
        로그인 성공. 공지사항 작성·수정 기능은 다음 단계에서 여기에 추가됩니다.
      </div>
    </main>
  );
}
