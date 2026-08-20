"use client";

import { useEffect, useMemo, useState } from "react";
import { LANGS, LANG_LABEL, LANG_FLAG } from "@/lib/types";
import { t } from "@/lib/i18n";
import { TEMPLATES, LEGAL_NOTICE_TEXT } from "@/lib/data/templates";
import { PLACES } from "@/lib/data/places";
import { TemplateGroup } from "@/lib/types";
import { CopyButton } from "@/components/CopyButton";
import { QrCodeImage } from "@/components/QrCodeImage";
import { CustomNoticeTranslator } from "@/components/CustomNoticeTranslator";
import { BuildingQrCard } from "@/components/BuildingQrCard";
import { BuildingSettingsManager } from "@/components/BuildingSettingsManager";
import { TenantManager } from "@/components/TenantManager";
import { FaqManager } from "@/components/FaqManager";
import { NoticeManager } from "@/components/NoticeManager";
import { LogoutButton } from "@/components/LogoutButton";

const GROUP_ORDER: TemplateGroup[] = ["trash", "moveout", "notice"];
const GROUP_LABEL_KEY = {
  trash: "groupTrash",
  moveout: "groupMoveout",
  notice: "groupNotice",
} as const;

export function LandlordDashboard({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const [selectedId, setSelectedId] = useState(TEMPLATES[0].id);
  const selected = TEMPLATES.find((tpl) => tpl.id === selectedId) ?? TEMPLATES[0];

  const [origin, setOrigin] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);

  const noticeLink = `${origin}/result?notice=${selected.id}`;
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
      <header className="mb-8 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-green-700">
            {t("ko", "brand")}
          </p>
          <h1 className="text-2xl font-extrabold mt-1">{t("ko", "landlordTitle")}</h1>
          <p className="text-neutral-600 mt-2 text-sm leading-relaxed">
            {t("ko", "landlordSubtitle")}
          </p>
          <p className="text-neutral-400 mt-1 text-xs">{userEmail}로 로그인됨</p>
        </div>
        <LogoutButton />
      </header>

      <BuildingQrCard userId={userId} />

      <div className="mt-8">
        <BuildingSettingsManager userId={userId} />
      </div>

      <div className="mt-8">
        <TenantManager userId={userId} />
      </div>

      <div className="mt-8">
        <FaqManager userId={userId} />
      </div>

      <div className="mt-8 mb-8">
        <NoticeManager userId={userId} />
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-2">알림톡 템플릿으로 빠르게 보내기</h2>
        {GROUP_ORDER.map((group) => (
          <div key={group} className="mb-4">
            <h3 className="text-sm font-bold text-neutral-500 mb-2">
              {t("ko", GROUP_LABEL_KEY[group])}
            </h3>
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

      <CustomNoticeTranslator />

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
