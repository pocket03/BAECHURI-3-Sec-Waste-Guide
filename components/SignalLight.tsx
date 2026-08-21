"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { isRecyclingDay } from "@/lib/schedule";
import { RECYCLING_DAYS } from "@/lib/data/categories";
import { useBuilding } from "@/lib/building-context";
import { createClient } from "@/lib/supabase/client";
import { BuildingSettings } from "@/lib/buildingSettings";

export function SignalLight({ lang }: { lang: Lang }) {
  const { buildingId, ready } = useBuilding();
  // 서버/클라이언트 렌더링 시점의 날짜 불일치를 피하기 위해 마운트 후에 계산합니다.
  const [green, setGreen] = useState<boolean | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;

    if (!buildingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGreen(isRecyclingDay(RECYCLING_DAYS));
      return;
    }

    const supabase = createClient();
    supabase
      .from("building_settings")
      .select("*")
      .eq("landlord_id", buildingId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          console.error("[SignalLight] failed to load building settings:", error);
          setGreen(isRecyclingDay(RECYCLING_DAYS));
          return;
        }
        const settings = data as BuildingSettings | null;
        const byLang: Record<Lang, string | null> = {
          ko: settings?.banner_ko ?? null,
          en: settings?.banner_en ?? null,
          zh: settings?.banner_zh ?? null,
          vi: settings?.banner_vi ?? null,
        };
        setBanner(byLang[lang] || settings?.banner_ko || null);
        setGreen(isRecyclingDay(settings?.recycling_days ?? RECYCLING_DAYS));
      });
  }, [buildingId, ready, lang]);

  if (green === null) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 animate-pulse h-28 shadow-sm" />
    );
  }

  // 집주인이 공지 배너를 설정해두면, 이 칸이 신호등 대신 공지 배너로 표시됩니다.
  if (banner) {
    return (
      <div className="rounded-2xl p-5 flex items-start gap-3 border bg-amber-50 border-amber-300 shadow-sm">
        <div className="text-3xl leading-none">📢</div>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
            공지
          </p>
          <p className="text-sm text-amber-900 whitespace-pre-line mt-1 leading-relaxed">
            {banner}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl p-5 flex items-center gap-4 border shadow-sm ${
        green ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
      }`}
    >
      <div className="text-5xl leading-none">{green ? "🟢" : "🔴"}</div>
      <div className="flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
          {t(lang, "todaySignalTitle")}
        </p>
        <p className="font-extrabold text-lg mt-0.5">
          {green ? t(lang, "todayGreen") : t(lang, "todayRed")}
        </p>
        <p className="text-sm text-neutral-600 mt-1">{t(lang, "generalWasteNote")}</p>
      </div>
    </div>
  );
}
