"use client";

import { useLanguage } from "@/lib/language-context";
import { LANGS, LANG_LABEL, LANG_FLAG } from "@/lib/types";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="language switcher">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            l === lang
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-neutral-700 border-neutral-300 hover:border-green-400"
          }`}
        >
          <span className="mr-1">{LANG_FLAG[l]}</span>
          {LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
