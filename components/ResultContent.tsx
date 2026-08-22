"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { ITEMS } from "@/lib/data/items";
import { PLACES } from "@/lib/data/places";
import { TEMPLATES, LEGAL_NOTICE_TEXT } from "@/lib/data/templates";
import { CATEGORIES } from "@/lib/data/categories";
import { TenantHeader } from "@/components/TenantHeader";
import { createClient } from "@/lib/supabase/client";
import { Notice } from "@/lib/notices";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@/components/icons";

function noticeBodyForLang(notice: Notice, lang: Lang): string {
  const byLang: Record<Lang, string | null> = {
    ko: notice.body_ko,
    en: notice.body_en,
    zh: notice.body_zh,
    vi: notice.body_vi,
  };
  return byLang[lang] || notice.body_ko;
}

function PageShell({ children }: { children: React.ReactNode }) {
  const { lang, ready } = useLanguage();
  if (!ready) return null;
  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-16">
      <TenantHeader lang={lang} />
      {children}
      <div className="mt-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-2 text-[color:var(--w-primary)]"
        >
          <ArrowLeftIcon size={16} />
          {t(lang, "backToSearchButton").replace(/^←\s*/, "")}
        </Link>
      </div>
      <footer className="text-xs text-center leading-relaxed mt-10 text-[color:var(--w-label-assistive)]">
        {t(lang, "footerDisclaimer")}
      </footer>
    </main>
  );
}

export function ResultContent() {
  const params = useSearchParams();
  const { lang } = useLanguage();

  const itemId = params.get("item");
  const placeId = params.get("place");
  const noticeId = params.get("notice");
  const customId = params.get("custom");

  if (itemId) {
    const item = ITEMS.find((i) => i.id === itemId);
    if (!item) return <PageShell><NotFound lang={lang} /></PageShell>;
    const category = CATEGORIES[item.category];
    return (
      <PageShell>
        <div
          className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-6 text-center"
          style={{ boxShadow: "var(--w-shadow-normal)" }}
        >
          <div className="text-6xl mb-3">{item.icon}</div>
          <h1 className="text-xl font-extrabold mb-2">{item.name[lang]}</h1>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
              category.recyclable
                ? "bg-[color:var(--w-status-positive-wash)] text-[color:var(--w-status-positive)]"
                : "bg-[color:var(--w-fill)] text-[color:var(--w-label-neutral)]"
            }`}
          >
            {category.label[lang]} ·{" "}
            {category.recyclable ? t(lang, "recyclableYes") : t(lang, "recyclableNo")}
          </span>

          <div className="text-left rounded-xl p-4 mb-3 bg-[color:var(--w-fill)]">
            <p className="text-xs font-semibold mb-1 text-[color:var(--w-label-alt)]">
              {t(lang, "categoryLabel")}
            </p>
            <p className="text-sm leading-relaxed text-[color:var(--w-label-normal)]">{category.guide[lang]}</p>
          </div>

          {item.note && (
            <div className="text-left rounded-xl p-4 mb-3 flex gap-2 items-start bg-[color:var(--w-status-caution-wash)]">
              <span className="shrink-0 mt-0.5 text-[color:var(--w-status-caution)]">
                <ExclamationTriangleIcon size={16} />
              </span>
              <div>
                <p className="text-xs font-semibold mb-1 text-[color:var(--w-status-caution)]">
                  {t(lang, "noteLabel").replace(/^⚠️\s*/u, "")}
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--w-label-normal)]">{item.note[lang]}</p>
              </div>
            </div>
          )}

          <div className="text-left rounded-xl p-4 bg-[color:var(--w-fill)]">
            <p className="text-xs font-semibold mb-1 text-[color:var(--w-label-alt)]">
              {t(lang, "disposalDaysLabel")}
            </p>
            <p className="text-sm leading-relaxed text-[color:var(--w-label-normal)]">
              {category.recyclable
                ? t(lang, "disposalDaysRecyclable")
                : t(lang, "disposalDaysGeneral")}
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  if (placeId) {
    const place = PLACES.find((p) => p.id === placeId);
    if (!place) return <PageShell><NotFound lang={lang} /></PageShell>;
    return (
      <PageShell>
        <div
          className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-6"
          style={{ boxShadow: "var(--w-shadow-normal)" }}
        >
          <div className="text-5xl mb-3 text-center">📍</div>
          <h1 className="text-xl font-extrabold text-center mb-2">{place.name[lang]}</h1>
          <p className="text-sm text-center mb-5 text-[color:var(--w-label-neutral)]">
            {place.description[lang]}
          </p>
          <p className="text-xs font-semibold mb-2 text-[color:var(--w-label-alt)]">
            {t(lang, "placeAcceptedCategories")}
          </p>
          <div className="flex flex-wrap gap-2">
            {place.categories.map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-[color:var(--w-primary-wash)] text-[color:var(--w-primary)]"
              >
                {CATEGORIES[c].label[lang]}
              </span>
            ))}
          </div>
        </div>
      </PageShell>
    );
  }

  if (noticeId) {
    const template = TEMPLATES.find((tpl) => tpl.id === noticeId);
    if (!template) return <PageShell><NotFound lang={lang} /></PageShell>;
    return (
      <PageShell>
        <div
          className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-6"
          style={{ boxShadow: "var(--w-shadow-normal)" }}
        >
          <div className="text-4xl mb-3 text-center">📢</div>
          <h1 className="text-xl font-extrabold text-center mb-4">{template.title[lang]}</h1>
          <div className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line bg-[color:var(--w-fill)] text-[color:var(--w-label-normal)]">
            {template.body[lang]}
          </div>
          {template.legalNotice && (
            <p className="text-xs mt-3 text-[color:var(--w-label-alt)]">{LEGAL_NOTICE_TEXT[lang]}</p>
          )}
        </div>
      </PageShell>
    );
  }

  if (customId) {
    return <CustomNoticeResult id={customId} lang={lang} />;
  }

  return (
    <PageShell>
      <NotFound lang={lang} />
    </PageShell>
  );
}

function CustomNoticeResult({ id, lang }: { id: string; lang: Lang }) {
  const [notice, setNotice] = useState<Notice | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("notices")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setNotice((data as Notice | null) ?? null);
      });
  }, [id]);

  if (notice === undefined) {
    return (
      <PageShell>
        <div
          className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-10 text-center animate-pulse text-[color:var(--w-label-alt)]"
          style={{ boxShadow: "var(--w-shadow-normal)" }}
        >
          ...
        </div>
      </PageShell>
    );
  }

  if (notice === null) {
    return (
      <PageShell>
        <NotFound lang={lang} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div
        className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-6"
        style={{ boxShadow: "var(--w-shadow-normal)" }}
      >
        <div className="text-4xl mb-3 text-center">📢</div>
        <h1 className="text-xl font-extrabold text-center mb-4">{notice.title}</h1>
        <div className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line bg-[color:var(--w-fill)] text-[color:var(--w-label-normal)]">
          {noticeBodyForLang(notice, lang)}
        </div>
      </div>
    </PageShell>
  );
}

function NotFound({ lang }: { lang: ReturnType<typeof useLanguage>["lang"] }) {
  return (
    <div
      className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-10 text-center text-[color:var(--w-label-alt)]"
      style={{ boxShadow: "var(--w-shadow-normal)" }}
    >
      {t(lang, "notFoundTitle")}
    </div>
  );
}
