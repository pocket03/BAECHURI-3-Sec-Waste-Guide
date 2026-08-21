"use client";

import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function TenantHeader({
  lang,
  title,
}: {
  lang: Lang;
  title?: string;
}) {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-2xl shrink-0">🥬</span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-green-700 leading-tight truncate">
            {t(lang, "brand")}
          </p>
          {title && (
            <h1 className="text-lg font-extrabold leading-tight truncate">
              {title}
            </h1>
          )}
        </div>
      </div>
      <LanguageSwitcher compact />
    </header>
  );
}
