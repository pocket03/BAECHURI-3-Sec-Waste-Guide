"use client";

import { LANGUAGES, LanguageCode } from "@/data/situations";

type LanguageTabsProps = {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
};

export default function LanguageTabs({ value, onChange }: LanguageTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          data-active={value === code}
          onClick={() => onChange(code)}
          className="neu-chip px-3 py-1.5 text-sm font-medium"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
