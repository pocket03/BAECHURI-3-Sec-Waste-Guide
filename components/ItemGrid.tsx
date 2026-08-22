"use client";

import Link from "next/link";
import { Lang } from "@/lib/types";
import { ITEMS } from "@/lib/data/items";
import { CATEGORIES } from "@/lib/data/categories";
import { t } from "@/lib/i18n";
import { SearchIcon } from "@/components/icons";

export function ItemGrid({ lang }: { lang: Lang }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-3 flex items-center gap-1.5">
        <span className="text-[color:var(--w-label-neutral)]">
          <SearchIcon size={18} />
        </span>
        {t(lang, "itemGridTitle")}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {ITEMS.map((item) => {
          const recyclable = CATEGORIES[item.category].recyclable;
          return (
            <Link
              key={item.id}
              href={`/result?item=${item.id}`}
              className="relative aspect-square flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-2 text-center hover:border-[color:var(--w-primary)] hover:shadow-md transition-all"
              style={{ boxShadow: "var(--w-shadow-normal)" }}
            >
              <span
                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  recyclable ? "bg-[color:var(--w-status-positive)]" : "bg-[color:var(--w-label-assistive)]"
                }`}
                aria-hidden
              />
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs font-medium leading-tight text-[color:var(--w-label-neutral)] line-clamp-2">
                {item.name[lang]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
