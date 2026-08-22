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
import { BrandMark } from "@/components/BrandMark";
import {
  SendIcon,
  MegaphoneIcon,
  BubbleIcon,
  MailIcon,
  PeopleIcon,
  SettingsIcon,
  EyeIcon,
  LocationPinIcon,
} from "@/components/icons";

const SIMPLE_UI_STORAGE_KEY = "baechuri-simple-ui";

const GROUP_ORDER: TemplateGroup[] = ["trash", "moveout", "notice"];
const GROUP_LABEL_KEY = {
  trash: "groupTrash",
  moveout: "groupMoveout",
  notice: "groupNotice",
} as const;

const TABS = [
  { key: "send", Icon: SendIcon, label: "발송" },
  { key: "notices", Icon: MegaphoneIcon, label: "공지사항" },
  { key: "faq", Icon: BubbleIcon, label: "FAQ" },
  { key: "inquiries", Icon: MailIcon, label: "문의" },
  { key: "tenants", Icon: PeopleIcon, label: "세입자" },
  { key: "settings", Icon: SettingsIcon, label: "건물 설정" },
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

  const [simple, setSimple] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem(SIMPLE_UI_STORAGE_KEY);
    if (stored === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSimple(true);
    }
  }, []);

  const toggleSimple = () => {
    const next = !simple;
    setSimple(next);
    window.localStorage.setItem(SIMPLE_UI_STORAGE_KEY, next ? "1" : "0");
  };

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
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <BrandMark size={32} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[color:var(--w-label-normal)]">
                {t("ko", "brand")}
              </p>
              <h1 className="text-2xl font-extrabold mt-1 text-[color:var(--w-label-neutral)]">
                {t("ko", "landlordTitle")}
              </h1>
              <p className="text-[color:var(--w-label-alt)] mt-1 text-xs">{userEmail}로 로그인됨</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              role="switch"
              aria-checked={simple}
              onClick={toggleSimple}
              className="flex items-center gap-2 rounded-full pl-3 pr-1.5 py-1.5 border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)]"
              style={{ boxShadow: "var(--w-shadow-normal)" }}
            >
              <span className="text-sm font-semibold text-[color:var(--w-label-normal)]">
                간편 UI 모드
              </span>
              <span
                className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-[color:var(--w-line)] transition-colors duration-200"
                style={{
                  backgroundColor: simple ? "var(--w-primary)" : "var(--w-fill)",
                }}
              >
                <span
                  className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200"
                  style={{
                    boxShadow: "var(--w-shadow-normal)",
                    transform: simple ? "translateX(21px)" : "translateX(1px)",
                  }}
                />
              </span>
            </button>
            <LogoutButton />
          </div>
        </header>

        {simple ? (
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TABS.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-6 transition-colors hover:bg-[color:var(--w-fill)]"
                style={{ boxShadow: "var(--w-shadow-normal)" }}
              >
                <span style={{ color: "var(--w-primary)" }}>
                  <item.Icon size={28} />
                </span>
                <span className="text-[17px] font-semibold text-[color:var(--w-label-normal)]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <nav className="mb-8 flex gap-1 overflow-x-auto border-b border-[color:var(--w-line)]">
            {TABS.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  tab === item.key
                    ? "border-[color:var(--w-primary)] text-[color:var(--w-primary)]"
                    : "border-transparent text-[color:var(--w-label-alt)] hover:text-[color:var(--w-label-neutral)]"
                }`}
              >
                <item.Icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {tab === "send" && (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-6">
              <section
                className="rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-5"
                style={{ boxShadow: "var(--w-shadow-normal)" }}
              >
                <h2 className="font-bold mb-1 flex items-center gap-1.5 text-[color:var(--w-label-normal)]">
                  <span style={{ color: "var(--w-primary)" }}>
                    <SendIcon size={20} />
                  </span>{" "}
                  알림톡 템플릿 선택
                </h2>
                <p className="text-xs text-[color:var(--w-label-alt)] mb-4">
                  {t("ko", "landlordSubtitle")}
                </p>
                {GROUP_ORDER.map((group) => (
                  <div key={group} className="mb-4 last:mb-0">
                    <h3 className="text-xs font-bold text-[color:var(--w-label-alt)] mb-2">
                      {t("ko", GROUP_LABEL_KEY[group])}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TEMPLATES.filter((tpl) => tpl.group === group).map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => setSelectedId(tpl.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                            tpl.id === selectedId
                              ? "bg-[color:var(--w-primary)] text-white border-[color:var(--w-primary)]"
                              : "bg-[color:var(--w-bg-card)] text-[color:var(--w-label-neutral)] border-[color:var(--w-line)] hover:border-[color:var(--w-primary)]"
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
              <section
                className="rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-5"
                style={{ boxShadow: "var(--w-shadow-normal)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold flex items-center gap-1.5 text-[color:var(--w-label-normal)]">
                    <span style={{ color: "var(--w-primary)" }}>
                      <EyeIcon size={20} />
                    </span>{" "}
                    {t("ko", "previewTitle")}
                  </h2>
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
                  <p className="text-xs text-[color:var(--w-label-alt)] mt-2">
                    {t("ko", "legalNoticeInline")}
                  </p>
                )}
              </section>

              <section
                className="rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-5"
                style={{ boxShadow: "var(--w-shadow-normal)" }}
              >
                <h2 className="font-bold mb-1 flex items-center gap-1.5 text-[color:var(--w-label-normal)]">
                  <span style={{ color: "var(--w-primary)" }}>
                    <LocationPinIcon size={20} />
                  </span>{" "}
                  {t("ko", "siteQrSectionTitle")}
                </h2>
                <p className="text-xs text-[color:var(--w-label-alt)] mb-3">
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

        <p className="text-xs text-[color:var(--w-label-assistive)] text-center mt-10">
          {t("ko", "demoModeNotice")}
        </p>
      </div>
    </div>
  );
}
