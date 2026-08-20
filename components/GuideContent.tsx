"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useBuilding } from "@/lib/building-context";
import { LANGS, LANG_LABEL, LANG_FLAG } from "@/lib/types";
import { t } from "@/lib/i18n";

export function GuideContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { lang, setLang } = useLanguage();
  const { setBuildingId } = useBuilding();

  useEffect(() => {
    const b = params.get("b");
    if (b) setBuildingId(b);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-md px-4 py-12 min-h-screen flex flex-col justify-center">
      <div className="text-center mb-8">
        <p className="text-3xl mb-2">🥬</p>
        <h1 className="text-xl font-extrabold">{t(lang, "chooseLanguageTitle")}</h1>
        <p className="text-sm text-neutral-500 mt-2">{t(lang, "chooseLanguageSubtitle")}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => {
              setLang(l);
              router.push("/search");
            }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white py-6 hover:border-green-500 hover:shadow-md transition-all"
          >
            <span className="text-3xl">{LANG_FLAG[l]}</span>
            <span className="font-bold">{LANG_LABEL[l]}</span>
          </button>
        ))}
      </div>
    </main>
  );
}
