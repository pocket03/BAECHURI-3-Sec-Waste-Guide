"use client";

import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SignalLight } from "@/components/SignalLight";
import { BuildingBanner } from "@/components/BuildingBanner";
import { FaqChat } from "@/components/FaqChat";
import { ItemGrid } from "@/components/ItemGrid";

export default function SearchPage() {
  const { lang, ready } = useLanguage();

  if (!ready) return null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-16">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-green-700">{t(lang, "brand")}</p>
          <h1 className="text-xl font-extrabold mt-0.5">{t(lang, "searchTitle")}</h1>
        </div>
      </header>

      <div className="mb-5">
        <LanguageSwitcher />
      </div>

      <BuildingBanner lang={lang} />

      <div className="mb-6">
        <SignalLight lang={lang} />
      </div>

      <div className="mb-8">
        <FaqChat lang={lang} />
      </div>

      <div className="mb-8">
        <ItemGrid lang={lang} />
      </div>

      <footer className="text-xs text-neutral-400 text-center leading-relaxed">
        {t(lang, "footerDisclaimer")}
      </footer>
    </main>
  );
}
