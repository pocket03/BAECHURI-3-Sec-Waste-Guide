"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tenant } from "@/lib/tenants";
import { LANGS, LANG_LABEL, LANG_FLAG, Lang } from "@/lib/types";
import { PersonPlusIcon } from "@/components/icons";

export function TenantManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState<Lang>("en");
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);

  const loadTenants = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("landlord_id", userId)
      .order("created_at", { ascending: false });
    if (!error && data) setTenants(data as Tenant[]);
    setLoadingList(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTenants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    if (!phone.trim()) return;
    setSaving(true);
    await supabase.from("tenants").insert({
      landlord_id: userId,
      phone: phone.trim(),
      lang,
      memo: memo.trim() || null,
    });
    setPhone("");
    setMemo("");
    setSaving(false);
    await loadTenants();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("이 세입자 번호를 삭제할까요?")) return;
    await supabase.from("tenants").delete().eq("id", id);
    await loadTenants();
  };

  return (
    <section
      className="rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-5"
      style={{ boxShadow: "var(--w-shadow-normal)" }}
    >
      <h2 className="font-bold mb-1 flex items-center gap-1.5 text-[color:var(--w-label-normal)]">
        <span style={{ color: "var(--w-primary)" }}>
          <PersonPlusIcon size={20} />
        </span>{" "}
        세입자 전화번호 관리
      </h2>
      <p className="text-xs text-[color:var(--w-label-alt)] mb-3">
        공지사항을 문자로 보낼 세입자 목록입니다. 데모용으로 직접 입력해서
        관리합니다.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호 (예: 01012345678)"
          className="flex-1 rounded-xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] px-3 py-2 text-sm text-[color:var(--w-label-normal)]"
        />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          className="rounded-xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] px-3 py-2 text-sm text-[color:var(--w-label-normal)]"
        >
          {LANGS.map((l) => (
            <option key={l} value={l}>
              {LANG_FLAG[l]} {LANG_LABEL[l]}
            </option>
          ))}
        </select>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모 (예: 101호)"
          className="w-28 rounded-xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] px-3 py-2 text-sm text-[color:var(--w-label-normal)]"
        />
        <button
          onClick={handleAdd}
          disabled={saving || !phone.trim()}
          className="px-4 py-2 rounded-xl bg-[color:var(--w-primary)] text-white text-sm font-semibold hover:bg-[color:var(--w-primary-strong)] disabled:opacity-50 transition-colors whitespace-nowrap"
        >
          추가
        </button>
      </div>

      {loadingList && <p className="text-sm text-[color:var(--w-label-assistive)]">불러오는 중...</p>}
      {!loadingList && tenants.length === 0 && (
        <p className="text-sm text-[color:var(--w-label-assistive)]">등록된 세입자가 없습니다.</p>
      )}
      <div className="flex flex-col gap-2">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="flex items-center justify-between rounded-xl bg-[color:var(--w-fill)] px-3 py-2.5 text-sm text-[color:var(--w-label-normal)]"
          >
            <span>
              {LANG_FLAG[tenant.lang]} {tenant.phone}
              {tenant.memo && (
                <span className="text-[color:var(--w-label-alt)]"> · {tenant.memo}</span>
              )}
            </span>
            <button
              onClick={() => handleDelete(tenant.id)}
              className="text-xs font-semibold text-[color:var(--w-status-negative)] underline underline-offset-2"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
