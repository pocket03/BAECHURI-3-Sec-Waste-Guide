"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { isRecyclingDay } from "@/lib/schedule";

export function SignalLight({ lang }: { lang: Lang }) {
  // 서버/클라이언트 렌더링 시점의 날짜 불일치를 피하기 위해 마운트 후에 계산합니다.
  const [green, setGreen] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreen(isRecyclingDay());
  }, []);

  if (green === null) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 animate-pulse h-24" />
    );
  }

  return (
    <div
      className={`rounded-2xl p-4 flex items-center gap-4 border ${
        green ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
      }`}
    >
      <div className="text-4xl leading-none">{green ? "🟢" : "🔴"}</div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {t(lang, "todaySignalTitle")}
        </p>
        <p className="font-bold text-lg">
          {green ? t(lang, "todayGreen") : t(lang, "todayRed")}
        </p>
        <p className="text-sm text-neutral-600 mt-1">{t(lang, "generalWasteNote")}</p>
      </div>
    </div>
  );
}
