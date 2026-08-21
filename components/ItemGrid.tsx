"use client";

import Link from "next/link";
import { Lang } from "@/lib/types";
import { ITEMS } from "@/lib/data/items";
import { CATEGORIES } from "@/lib/data/categories";
import { t } from "@/lib/i18n";

export function ItemGrid({ lang }: { lang: Lang }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-3 flex items-center gap-1.5">
        <span>🔍</span> {t(lang, "itemGridTitle")}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {ITEMS.map((item) => {
          const recyclable = CATEGORIES[item.category].recyclable;
          return (
            <Link
              key={item.id}
              href={`/result?item=${item.id}`}
              className="relative aspect-square flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-neutral-200 bg-white p-2 text-center shadow-sm hover:border-green-400 hover:shadow-md transition-all"
            >
              <span
                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  recyclable ? "bg-green-400" : "bg-neutral-300"
                }`}
                aria-hidden
              />
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs font-medium leading-tight text-neutral-700 line-clamp-2">
                {item.name[lang]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
