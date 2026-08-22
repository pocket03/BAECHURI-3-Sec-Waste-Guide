"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useBuilding } from "@/lib/building-context";
import { LANGS, LANG_LABEL, LANG_FLAG } from "@/lib/types";
import { t } from "@/lib/i18n";
import { BrandMark } from "@/components/BrandMark";

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
        <div className="flex justify-center mb-3">
          <BrandMark size={56} />
        </div>
        <h1 className="text-xl font-extrabold">{t(lang, "chooseLanguageTitle")}</h1>
        <p className="text-sm mt-2 leading-relaxed text-[color:var(--w-label-alt)]">
          {t(lang, "chooseLanguageSubtitle")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => {
              setLang(l);
              router.push("/search");
            }}
            className="flex flex-col items-start gap-1 rounded-2xl bg-[color:var(--w-bg-card)] p-5 text-left transition-all hover:shadow-md"
            style={{ boxShadow: "var(--w-shadow-normal)" }}
          >
            <span className="text-xs font-bold tracking-wide text-[color:var(--w-label-alt)]">
              {LANG_FLAG[l]} {l.toUpperCase()}
            </span>
            <span className="text-lg font-semibold text-[color:var(--w-label-strong)]">
              {LANG_LABEL[l]}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
