"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/i18n";
import { ITEMS } from "@/lib/data/items";
import { PLACES } from "@/lib/data/places";
import { TEMPLATES, LEGAL_NOTICE_TEXT } from "@/lib/data/templates";
import { CATEGORIES } from "@/lib/data/categories";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function PageShell({ children }: { children: React.ReactNode }) {
  const { lang, ready } = useLanguage();
  if (!ready) return null;
  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-16">
      <header className="mb-5">
        <p className="text-sm font-semibold text-green-700">{t(lang, "brand")}</p>
        <div className="mt-3">
          <LanguageSwitcher />
        </div>
      </header>
      {children}
      <div className="mt-8">
        <Link
          href="/search"
          className="text-sm font-semibold text-green-700 underline underline-offset-2"
        >
          {t(lang, "backToSearchButton")}
        </Link>
      </div>
      <footer className="text-xs text-neutral-400 text-center leading-relaxed mt-10">
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

  if (itemId) {
    const item = ITEMS.find((i) => i.id === itemId);
    if (!item) return <PageShell><NotFound lang={lang} /></PageShell>;
    const category = CATEGORIES[item.category];
    return (
      <PageShell>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-center">
          <div className="text-6xl mb-3">{item.icon}</div>
          <h1 className="text-xl font-extrabold mb-2">{item.name[lang]}</h1>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
              category.recyclable
                ? "bg-green-100 text-green-800"
                : "bg-neutral-200 text-neutral-700"
            }`}
          >
            {category.label[lang]} ·{" "}
            {category.recyclable ? t(lang, "recyclableYes") : t(lang, "recyclableNo")}
          </span>

          <div className="text-left rounded-2xl bg-neutral-50 p-4 mb-3">
            <p className="text-xs font-semibold text-neutral-500 mb-1">
              {t(lang, "categoryLabel")}
            </p>
            <p className="text-sm leading-relaxed">{category.guide[lang]}</p>
          </div>

          {item.note && (
            <div className="text-left rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">
                {t(lang, "noteLabel")}
              </p>
              <p className="text-sm leading-relaxed text-amber-900">{item.note[lang]}</p>
            </div>
          )}

          <div className="text-left rounded-2xl bg-neutral-50 p-4">
            <p className="text-xs font-semibold text-neutral-500 mb-1">
              {t(lang, "disposalDaysLabel")}
            </p>
            <p className="text-sm leading-relaxed">
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
        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="text-5xl mb-3 text-center">📍</div>
          <h1 className="text-xl font-extrabold text-center mb-2">{place.name[lang]}</h1>
          <p className="text-sm text-neutral-600 text-center mb-5">
            {place.description[lang]}
          </p>
          <p className="text-xs font-semibold text-neutral-500 mb-2">
            {t(lang, "placeAcceptedCategories")}
          </p>
          <div className="flex flex-wrap gap-2">
            {place.categories.map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800"
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
        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="text-4xl mb-3 text-center">📢</div>
          <h1 className="text-xl font-extrabold text-center mb-4">{template.title[lang]}</h1>
          <div className="rounded-2xl bg-neutral-50 p-4 text-sm leading-relaxed whitespace-pre-line">
            {template.body[lang]}
          </div>
          {template.legalNotice && (
            <p className="text-xs text-neutral-500 mt-3">{LEGAL_NOTICE_TEXT[lang]}</p>
          )}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <NotFound lang={lang} />
    </PageShell>
  );
}

function NotFound({ lang }: { lang: ReturnType<typeof useLanguage>["lang"] }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
      {t(lang, "notFoundTitle")}
    </div>
  );
}
