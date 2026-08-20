"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BuildingSettings, DAY_LABELS } from "@/lib/buildingSettings";
import { RECYCLING_DAYS } from "@/lib/data/categories";

async function translate(text: string): Promise<{ en: string; zh: string; vi: string }> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "번역에 실패했습니다");
  return json;
}

export function BuildingSettingsManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [days, setDays] = useState<number[]>([...RECYCLING_DAYS]);
  const [bannerKo, setBannerKo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("building_settings")
      .select("*")
      .eq("landlord_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        const settings = data as BuildingSettings | null;
        if (settings) {
          setDays(settings.recycling_days);
          setBannerKo(settings.banner_ko ?? "");
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDay = (day: number) => {
    setSaved(false);
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const trimmed = bannerKo.trim();
      const translated = trimmed ? await translate(trimmed) : null;

      await supabase.from("building_settings").upsert({
        landlord_id: userId,
        recycling_days: days,
        banner_ko: trimmed || null,
        banner_en: translated?.en ?? null,
        banner_zh: translated?.zh ?? null,
        banner_vi: translated?.vi ?? null,
        updated_at: new Date().toISOString(),
      });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장에 실패했습니다");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <h2 className="font-bold mb-1">오늘의 배출 신호등 · 공지 배너 설정</h2>
      <p className="text-xs text-neutral-500 mb-3">
        우리 건물에서 재활용을 배출할 수 있는 요일과, 세입자 화면 상단에
        띄울 공지·주의사항 배너를 설정하세요.
      </p>
      {loading ? (
        <p className="text-sm text-neutral-400">불러오는 중...</p>
      ) : (
        <>
          <p className="text-xs font-semibold text-neutral-500 mb-2">배출 요일</p>
          <div className="flex gap-2 mb-4">
            {DAY_LABELS.map((label, i) => (
              <button
                key={i}
                onClick={() => toggleDay(i)}
                className={`w-10 h-10 rounded-full text-sm font-semibold border transition-colors ${
                  days.includes(i)
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-neutral-600 border-neutral-300 hover:border-green-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-neutral-500 mb-2">
            공지 배너 (선택, 신호등 위에 표시됩니다)
          </p>
          <textarea
            value={bannerKo}
            onChange={(e) => {
              setBannerKo(e.target.value);
              setSaved(false);
            }}
            rows={2}
            placeholder="예: 이번 주 목요일 오전 단수 예정입니다. 비워두면 배너가 표시되지 않습니다."
            className="w-full rounded-lg border border-neutral-300 p-3 text-sm mb-4 resize-none"
          />

          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
          {saved && (
            <span className="ml-3 text-sm text-neutral-500">저장되었습니다</span>
          )}
        </>
      )}
    </section>
  );
}
