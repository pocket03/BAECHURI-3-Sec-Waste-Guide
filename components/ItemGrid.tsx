"use client";

import Link from "next/link";
import { Lang } from "@/lib/types";
import { ITEMS } from "@/lib/data/items";
import { t } from "@/lib/i18n";

export function ItemGrid({ lang }: { lang: Lang }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-3">{t(lang, "itemGridTitle")}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {ITEMS.map((item) => (
          <Link
            key={item.id}
            href={`/result?item=${item.id}`}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-neutral-200 bg-white p-3 text-center hover:border-green-400 hover:shadow-sm transition-all"
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="text-xs font-medium leading-tight text-neutral-700">
              {item.name[lang]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
