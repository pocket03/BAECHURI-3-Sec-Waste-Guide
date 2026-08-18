"use client";

import { useState } from "react";
import { Lang } from "@/lib/types";
import { FAQ } from "@/lib/data/faq";
import { t } from "@/lib/i18n";

export function FaqChat({ lang }: { lang: Lang }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <h2 className="font-bold text-lg mb-3">{t(lang, "faqTitle")}</h2>
      <div className="flex flex-col gap-2">
        {FAQ.map((faq) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                onClick={() => setOpenId(open ? null : faq.id)}
                className={`w-full text-left rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                  open
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white border-neutral-200 text-neutral-800 hover:border-green-400"
                }`}
              >
                {faq.question[lang]}
              </button>
              {open && (
                <div className="mt-1 ml-3 rounded-xl rounded-tl-none bg-neutral-100 px-4 py-2.5 text-sm text-neutral-700">
                  {faq.answer[lang]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
