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
import { InquiryManager } from "@/components/InquiryManager";
import { LogoutButton } from "@/components/LogoutButton";

const GROUP_ORDER: TemplateGroup[] = ["trash", "moveout", "notice"];
const GROUP_LABEL_KEY = {
  trash: "groupTrash",
  moveout: "groupMoveout",
  notice: "groupNotice",
} as const;

const TABS = [
  { key: "send", icon: "📤", label: "발송" },
  { key: "notices", icon: "📋", label: "공지사항" },
  { key: "faq", icon: "💬", label: "FAQ" },
  { key: "inquiries", icon: "📮", label: "문의" },
  { key: "tenants", icon: "👥", label: "세입자" },
  { key: "settings", icon: "⚙️", label: "건물 설정" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function LandlordDashboard({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const [tab, setTab] = useState<TabKey>("send");
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
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <header className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-green-700">
              {t("ko", "brand")}
            </p>
            <h1 className="text-2xl font-extrabold mt-1">{t("ko", "landlordTitle")}</h1>
            <p className="text-neutral-500 mt-1 text-xs">{userEmail}로 로그인됨</p>
          </div>
          <LogoutButton />
        </header>

        <nav className="mb-8 flex gap-1 overflow-x-auto border-b border-neutral-200">
          {TABS.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                tab === item.key
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {tab === "send" && (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-6">
              <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h2 className="font-bold mb-1">알림톡 템플릿 선택</h2>
                <p className="text-xs text-neutral-500 mb-4">
                  {t("ko", "landlordSubtitle")}
                </p>
                {GROUP_ORDER.map((group) => (
                  <div key={group} className="mb-4 last:mb-0">
                    <h3 className="text-xs font-bold text-neutral-500 mb-2">
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

              <CustomNoticeTranslator />
            </div>

            <div className="flex flex-col gap-6">
              <section className="rounded-2xl border border-neutral-200 bg-white p-5">
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
                  <p className="text-xs text-neutral-500 mt-2">
                    {t("ko", "legalNoticeInline")}
                  </p>
                )}
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h2 className="font-bold mb-1">{t("ko", "siteQrSectionTitle")}</h2>
                <p className="text-xs text-neutral-500 mb-3">
                  {t("ko", "siteQrSectionDesc")}
                </p>
                <QrCodeImage
                  value={siteQrLink}
                  downloadLabel={t("ko", "downloadQrButton")}
                  fileName="baechuri-site-qr.png"
                />
              </section>
            </div>
          </div>
        )}

        {tab === "notices" && <NoticeManager userId={userId} />}
        {tab === "faq" && <FaqManager userId={userId} />}
        {tab === "inquiries" && <InquiryManager userId={userId} />}
        {tab === "tenants" && <TenantManager userId={userId} />}

        {tab === "settings" && (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <BuildingQrCard userId={userId} />
            <BuildingSettingsManager userId={userId} />
          </div>
        )}

        <p className="text-xs text-neutral-400 text-center mt-10">
          {t("ko", "demoModeNotice")}
        </p>
      </div>
    </div>
  );
}
