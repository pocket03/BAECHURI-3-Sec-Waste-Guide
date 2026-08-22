"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { TenantHeader } from "@/components/TenantHeader";
import { SignalLight } from "@/components/SignalLight";
import { FaqChat } from "@/components/FaqChat";
import { ItemGrid } from "@/components/ItemGrid";
import { MailIcon, ChevronRightIcon } from "@/components/icons";

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

        <Link
          href="/inquiry"
          className="flex items-center justify-between gap-2 rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-4 hover:shadow-md transition-all"
          style={{ boxShadow: "var(--w-shadow-normal)" }}
        >
          <span className="flex items-center gap-2 font-bold text-sm">
            <span className="text-[color:var(--w-primary)]">
              <MailIcon size={18} />
            </span>
            {t(lang, "inquiryButtonLabel").replace(/^📮\s*/u, "")}
          </span>
          <span className="text-[color:var(--w-label-alt)]">
            <ChevronRightIcon size={18} />
          </span>
        </Link>
      </div>

      <footer className="text-xs text-center leading-relaxed mt-10 text-[color:var(--w-label-assistive)]">
        {t(lang, "footerDisclaimer")}
      </footer>
    </main>
  );
}
