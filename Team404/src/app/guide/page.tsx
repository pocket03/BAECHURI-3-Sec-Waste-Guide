"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LanguageCode, SITUATIONS, renderMessage } from "@/data/situations";
import LanguageTabs from "@/components/LanguageTabs";

function isLanguageCode(value: string | null): value is LanguageCode {
  return value === "ko" || value === "en" || value === "zh" || value === "vi";
}

function GuideContent() {
  const searchParams = useSearchParams();
  const buildingName = searchParams.get("building") ?? "";
  const requestedSituation = searchParams.get("situation");
  const requestedLang = searchParams.get("lang");

  const initialSituationId =
    SITUATIONS.find((s) => s.id === requestedSituation)?.id ?? SITUATIONS[0].id;

  const [activeSituationId, setActiveSituationId] = useState(initialSituationId);
  const [activeLang, setActiveLang] = useState<LanguageCode>(
    isLanguageCode(requestedLang) ? requestedLang : "ko"
  );

  const activeSituation =
    SITUATIONS.find((s) => s.id === activeSituationId) ?? SITUATIONS[0];

  return (
    <div className="neu-surface min-h-screen py-10 px-4 sm:py-16">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <header className="text-center">
          <p className="text-sm font-medium text-[var(--neu-accent)]">
            {buildingName ? buildingName : "분리배출 안내"}
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">배출 규정 · 공지사항 확인</h1>
          <p className="mt-2 text-sm text-[var(--neu-text-muted)]">
            아래에서 확인할 항목과 언어를 선택해주세요.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {SITUATIONS.map((situation) => (
            <button
              key={situation.id}
              type="button"
              data-active={activeSituationId === situation.id}
              onClick={() => setActiveSituationId(situation.id)}
              className="neu-btn flex flex-col items-center gap-2 px-3 py-6 text-center"
            >
              <span className="text-3xl">{situation.icon}</span>
              <span className="text-sm font-semibold">{situation.label}</span>
            </button>
          ))}
        </div>

        <div className="neu-raised flex flex-col gap-4 p-5">
          <LanguageTabs value={activeLang} onChange={setActiveLang} />

          <div className="neu-pressed whitespace-pre-line p-4 text-sm leading-relaxed">
            {renderMessage(activeSituation.templates[activeLang], buildingName)}
          </div>
        </div>

        <Link
          href="/"
          className="neu-btn self-center px-5 py-2.5 text-sm font-semibold text-[var(--neu-accent)]"
        >
          처음으로
        </Link>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <Suspense fallback={<div className="neu-surface min-h-screen" />}>
      <GuideContent />
    </Suspense>
  );
}
