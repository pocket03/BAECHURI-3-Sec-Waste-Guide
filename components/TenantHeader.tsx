"use client";

import { Lang } from "@/lib/types";
import { t } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandMark } from "@/components/BrandMark";

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
        <BrandMark size={28} className="shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-tight truncate text-[color:var(--w-primary)]">
            {t(lang, "brand")}
          </p>
          {title && (
            <h1 className="text-lg font-extrabold leading-tight truncate text-[color:var(--w-label-strong)]">
              {title}
            </h1>
          )}
        </div>
      </div>
      <LanguageSwitcher compact />
    </header>
  );
}
