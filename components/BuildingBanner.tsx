"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/types";
import { useBuilding } from "@/lib/building-context";
import { createClient } from "@/lib/supabase/client";
import { BuildingSettings } from "@/lib/buildingSettings";

export function BuildingBanner({ lang }: { lang: Lang }) {
  const { buildingId, ready } = useBuilding();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !buildingId) return;

    const supabase = createClient();
    supabase
      .from("building_settings")
      .select("*")
      .eq("landlord_id", buildingId)
      .maybeSingle()
      .then(({ data }) => {
        const settings = data as BuildingSettings | null;
        const byLang: Record<Lang, string | null> = {
          ko: settings?.banner_ko ?? null,
          en: settings?.banner_en ?? null,
          zh: settings?.banner_zh ?? null,
          vi: settings?.banner_vi ?? null,
        };
        setMessage(byLang[lang] || settings?.banner_ko || null);
      });
  }, [buildingId, ready, lang]);

  if (!message) return null;

  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 mb-6">
      <p className="text-xs font-semibold text-amber-700 mb-1">📢 공지</p>
      <p className="text-sm text-amber-900 whitespace-pre-line">{message}</p>
    </div>
  );
}
