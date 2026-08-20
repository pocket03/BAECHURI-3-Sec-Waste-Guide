"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/types";
import { FAQ as STATIC_FAQ } from "@/lib/data/faq";
import { Faq } from "@/lib/faq";
import { useBuilding } from "@/lib/building-context";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/i18n";

interface DisplayFaq {
  id: string;
  question: string;
  answer: string;
}

function faqRowToDisplay(row: Faq, lang: Lang): DisplayFaq {
  const question: Record<Lang, string | null> = {
    ko: row.question_ko,
    en: row.question_en,
    zh: row.question_zh,
    vi: row.question_vi,
  };
  const answer: Record<Lang, string | null> = {
    ko: row.answer_ko,
    en: row.answer_en,
    zh: row.answer_zh,
    vi: row.answer_vi,
  };
  return {
    id: row.id,
    question: question[lang] || row.question_ko,
    answer: answer[lang] || row.answer_ko,
  };
}

export function FaqChat({ lang }: { lang: Lang }) {
  const { buildingId, ready } = useBuilding();
  const [openId, setOpenId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<DisplayFaq[] | null>(null);

  useEffect(() => {
    if (!ready) return;

    if (!buildingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFaqs(STATIC_FAQ.map((f) => ({ id: f.id, question: f.question[lang], answer: f.answer[lang] })));
      return;
    }

    const supabase = createClient();
    supabase
      .from("faqs")
      .select("*")
      .eq("landlord_id", buildingId)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        const rows = (data as Faq[] | null) ?? [];
        setFaqs(
          rows.length > 0
            ? rows.map((row) => faqRowToDisplay(row, lang))
            : STATIC_FAQ.map((f) => ({ id: f.id, question: f.question[lang], answer: f.answer[lang] }))
        );
      });
  }, [buildingId, ready, lang]);

  return (
    <div>
      <h2 className="font-bold text-lg mb-3">{t(lang, "faqTitle")}</h2>
      <div className="flex flex-col gap-2">
        {(faqs ?? []).map((faq) => {
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
                {faq.question}
              </button>
              {open && (
                <div className="mt-1 ml-3 rounded-xl rounded-tl-none bg-neutral-100 px-4 py-2.5 text-sm text-neutral-700">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
