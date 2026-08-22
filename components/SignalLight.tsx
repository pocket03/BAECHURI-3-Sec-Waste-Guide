"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { isRecyclingDay } from "@/lib/schedule";
import { RECYCLING_DAYS } from "@/lib/data/categories";
import { useBuilding } from "@/lib/building-context";
import { createClient } from "@/lib/supabase/client";
import { BuildingSettings } from "@/lib/buildingSettings";
import { MegaphoneIcon } from "@/components/icons";

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
    return <div className="rounded-2xl bg-[color:var(--w-fill)] animate-pulse h-28" />;
  }

  // 집주인이 공지 배너를 설정해두면, 이 칸이 신호등 대신 공지 배너로 표시됩니다.
  if (banner) {
    return (
      <div className="rounded-2xl p-5 flex items-start gap-3 bg-[color:var(--w-status-caution-wash)]">
        <span className="shrink-0 mt-0.5 text-[color:var(--w-status-caution)]">
          <MegaphoneIcon size={28} />
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-[color:var(--w-status-caution)]">
            공지
          </p>
          <p className="text-sm whitespace-pre-line mt-1 leading-relaxed text-[color:var(--w-label-normal)]">
            {banner}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-4 border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)]"
      style={{ boxShadow: "var(--w-shadow-normal)" }}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
          green ? "bg-[color:var(--w-status-positive)]" : "bg-[color:var(--w-status-negative)]"
        }`}
        aria-hidden
      />
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--w-label-alt)]">
          {t(lang, "todaySignalTitle")}
        </p>
        <p
          className={`font-extrabold text-lg mt-0.5 ${
            green ? "text-[color:var(--w-status-positive)]" : "text-[color:var(--w-status-negative)]"
          }`}
        >
          {green ? t(lang, "todayGreen") : t(lang, "todayRed")}
        </p>
        <p className="text-sm mt-1 text-[color:var(--w-label-alt)]">{t(lang, "generalWasteNote")}</p>
      </div>
    </div>
  );
}
