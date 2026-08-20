"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BuildingSettings, DAY_LABELS } from "@/lib/buildingSettings";
import { RECYCLING_DAYS } from "@/lib/data/categories";

export function BuildingSettingsManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [days, setDays] = useState<number[]>([...RECYCLING_DAYS]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("building_settings")
      .select("*")
      .eq("landlord_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        const settings = data as BuildingSettings | null;
        if (settings) setDays(settings.recycling_days);
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
    await supabase.from("building_settings").upsert({
      landlord_id: userId,
      recycling_days: days,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <h2 className="font-bold mb-1">오늘의 배출 신호등 설정</h2>
      <p className="text-xs text-neutral-500 mb-3">
        우리 건물에서 재활용을 배출할 수 있는 요일을 선택하세요. 세입자
        화면의 신호등에 바로 반영됩니다.
      </p>
      {loading ? (
        <p className="text-sm text-neutral-400">불러오는 중...</p>
      ) : (
        <>
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
