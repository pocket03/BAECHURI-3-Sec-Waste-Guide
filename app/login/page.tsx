"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BrandMark } from "@/components/BrandMark";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-sm px-4 py-16 min-h-screen flex flex-col justify-center">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-3">
          <BrandMark size={56} />
        </div>
        <p className="text-sm font-semibold text-[color:var(--w-primary)]">배추리 매니저</p>
        <h1 className="text-2xl font-extrabold mt-1 text-[color:var(--w-label-strong)]">집주인 로그인</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-3xl bg-[color:var(--w-bg-card)] p-8"
        style={{ boxShadow: "var(--w-shadow-normal)" }}
      >
        <input
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-[color:var(--w-line)] px-4 py-2.5 text-sm"
        />
        <input
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-[color:var(--w-line)] px-4 py-2.5 text-sm"
        />
        {error && <p className="text-sm text-[color:var(--w-status-negative)]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-[color:var(--w-primary)] text-white text-sm font-semibold py-2.5 hover:bg-[color:var(--w-primary-strong)] disabled:opacity-50 transition-colors"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </main>
  );
}
