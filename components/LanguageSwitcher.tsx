"use client";

import { useLanguage } from "@/lib/language-context";
import { LANGS, LANG_LABEL, LANG_FLAG } from "@/lib/types";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex gap-1.5 shrink-0 ${compact ? "flex-nowrap overflow-x-auto" : "flex-wrap"}`}
      role="group"
      aria-label="language switcher"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`shrink-0 rounded-full font-medium border transition-colors ${
            compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
          } ${
            l === lang
              ? "bg-[color:var(--w-primary)] text-white border-[color:var(--w-primary)]"
              : "bg-[color:var(--w-bg-card)] text-[color:var(--w-label-neutral)] border-[color:var(--w-line)] hover:border-[color:var(--w-primary)]"
          }`}
        >
          <span className={compact ? "" : "mr-1"}>{LANG_FLAG[l]}</span>
          {!compact && LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
