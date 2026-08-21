"use client";

import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { TenantHeader } from "@/components/TenantHeader";
import { SignalLight } from "@/components/SignalLight";
import { FaqChat } from "@/components/FaqChat";
import { ItemGrid } from "@/components/ItemGrid";

export default function SearchPage() {
  const { lang, ready } = useLanguage();

  if (!ready) return null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-16">
      <TenantHeader lang={lang} title={t(lang, "searchTitle")} />

      <div className="flex flex-col gap-8">
        <SignalLight lang={lang} />
        <FaqChat lang={lang} />
        <ItemGrid lang={lang} />
      </div>

      <footer className="text-xs text-neutral-400 text-center leading-relaxed mt-10">
        {t(lang, "footerDisclaimer")}
      </footer>
    </main>
  );
}
