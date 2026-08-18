"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LANGS, LANG_LABEL, LANG_FLAG } from "@/lib/types";
import { t } from "@/lib/i18n";
import { TEMPLATES, LEGAL_NOTICE_TEXT } from "@/lib/data/templates";
import { PLACES } from "@/lib/data/places";
import { TemplateGroup } from "@/lib/types";
import { CopyButton } from "@/components/CopyButton";
import { QrCodeImage } from "@/components/QrCodeImage";

const GROUP_ORDER: TemplateGroup[] = ["trash", "moveout", "notice"];
const GROUP_LABEL_KEY = {
  trash: "groupTrash",
  moveout: "groupMoveout",
  notice: "groupNotice",
} as const;

export default function LandlordPage() {
  const [selectedId, setSelectedId] = useState(TEMPLATES[0].id);
  const selected = TEMPLATES.find((tpl) => tpl.id === selectedId) ?? TEMPLATES[0];

  const [origin, setOrigin] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);

  const noticeLink = `${origin}/result?notice=${selected.id}`;
  const buildingLink = `${origin}/guide`;
  const siteQrLink = `${origin}/result?place=${PLACES[0].id}`;

  const combinedMessage = useMemo(() => {
    const lines = LANGS.map(
      (l) => `${LANG_FLAG[l]} ${LANG_LABEL[l]}\n${selected.body[l]}`
    );
    if (selected.legalNotice) {
      lines.push(LEGAL_NOTICE_TEXT.ko);
    }
    lines.push(`\n🔗 ${noticeLink}`);
    return lines.join("\n\n");
  }, [selected, noticeLink]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-semibold text-green-700">
          {t("ko", "brand")}
        </p>
        <h1 className="text-2xl font-extrabold mt-1">{t("ko", "landlordTitle")}</h1>
        <p className="text-neutral-600 mt-2 text-sm leading-relaxed">
          {t("ko", "landlordSubtitle")}
        </p>
      </header>

      <section className="mb-6">
        {GROUP_ORDER.map((group) => (
          <div key={group} className="mb-4">
            <h2 className="text-sm font-bold text-neutral-500 mb-2">
              {t("ko", GROUP_LABEL_KEY[group])}
            </h2>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.filter((tpl) => tpl.group === group).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedId(tpl.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    tpl.id === selectedId
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-green-400"
                  }`}
                >
                  {tpl.title.ko}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold">{t("ko", "previewTitle")}</h2>
          <CopyButton
            text={combinedMessage}
            label={t("ko", "copyAllButton")}
            copiedLabel={t("ko", "copiedToast")}
          />
        </div>
        <div className="rounded-xl bg-[#b2c7da] p-3">
          <div className="rounded-lg rounded-tl-none bg-white px-4 py-3 text-sm whitespace-pre-line leading-relaxed shadow-sm">
            {combinedMessage}
          </div>
        </div>
        {selected.legalNotice && (
          <p className="text-xs text-neutral-500 mt-2">{t("ko", "legalNoticeInline")}</p>
        )}
      </section>

      <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4">
        <h2 className="font-bold mb-3">{t("ko", "linkSectionTitle")}</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <QrCodeImage
            value={buildingLink}
            downloadLabel={t("ko", "downloadQrButton")}
            fileName="baechuri-building-qr.png"
          />
          <div className="flex-1 w-full">
            <p className="text-xs text-neutral-500 mb-1">
              {t("ko", "brandTagline")}
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={buildingLink}
                className="flex-1 min-w-0 rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-600"
              />
              <CopyButton
                text={buildingLink}
                label={t("ko", "copyLinkButton")}
                copiedLabel={t("ko", "copiedToast")}
                className="px-3 py-2 rounded-lg border border-green-600 text-green-700 text-xs font-semibold hover:bg-green-50 transition-colors whitespace-nowrap"
              />
            </div>
            <Link
              href="/guide"
              className="inline-block mt-3 text-sm font-semibold text-green-700 underline underline-offset-2"
            >
              {t("ko", "viewTenantDemoButton")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4">
        <h2 className="font-bold mb-1">{t("ko", "siteQrSectionTitle")}</h2>
        <p className="text-xs text-neutral-500 mb-3">{t("ko", "siteQrSectionDesc")}</p>
        <QrCodeImage
          value={siteQrLink}
          downloadLabel={t("ko", "downloadQrButton")}
          fileName="baechuri-site-qr.png"
        />
      </section>

      <p className="text-xs text-neutral-400 text-center">{t("ko", "demoModeNotice")}</p>
    </main>
  );
}
