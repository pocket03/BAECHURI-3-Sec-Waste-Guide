"use client";

import { useEffect, useState } from "react";
import { Lang } from "@/lib/types";
import { FAQ as STATIC_FAQ } from "@/lib/data/faq";
import { Faq } from "@/lib/faq";
import { useBuilding } from "@/lib/building-context";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/i18n";
import { BubbleIcon, ChevronDownIcon } from "@/components/icons";

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
      <h2 className="font-bold text-base mb-3 flex items-center gap-1.5">
        <span className="text-[color:var(--w-label-neutral)]">
          <BubbleIcon size={18} />
        </span>
        {t(lang, "faqTitle")}
      </h2>
      <div className="flex flex-col gap-2">
        {(faqs ?? []).map((faq) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                onClick={() => setOpenId(open ? null : faq.id)}
                className={`w-full flex items-center justify-between gap-2 text-left rounded-2xl border px-4 py-3 text-[15px] font-semibold transition-colors ${
                  open
                    ? "bg-[color:var(--w-primary)] text-white border-[color:var(--w-primary)]"
                    : "bg-[color:var(--w-bg-card)] border-[color:var(--w-line)] text-[color:var(--w-label-normal)]"
                }`}
                style={{ boxShadow: open ? "var(--w-shadow-emphasize)" : "var(--w-shadow-normal)" }}
              >
                <span>{faq.question}</span>
                <span
                  className={`shrink-0 transition-transform ${open ? "rotate-180" : ""} ${
                    open ? "text-white" : "text-[color:var(--w-label-alt)]"
                  }`}
                >
                  <ChevronDownIcon size={16} />
                </span>
              </button>
              {open && (
                <div className="mt-1 ml-3 rounded-2xl rounded-tl-none px-4 py-3 text-sm leading-relaxed bg-[color:var(--w-fill)] text-[color:var(--w-label-neutral)]">
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
