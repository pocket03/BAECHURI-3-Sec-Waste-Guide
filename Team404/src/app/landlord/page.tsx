"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { LanguageCode, SITUATIONS, renderMessage } from "@/data/situations";
import LanguageTabs from "@/components/LanguageTabs";

export default function LandlordPage() {
  const [buildingName, setBuildingName] = useState("");
  const [activeSituationId, setActiveSituationId] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<LanguageCode>("ko");
  const [copiedLang, setCopiedLang] = useState<LanguageCode | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // window.location is unavailable during SSR; setting it post-mount (rather than
    // reading it directly in render) avoids a client/server hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);

  const activeSituation = SITUATIONS.find((s) => s.id === activeSituationId) ?? null;
  const guideQrValue = origin
    ? `${origin}/guide${buildingName.trim() ? `?building=${encodeURIComponent(buildingName.trim())}` : ""}`
    : "";
  const guideLinkForSituation = (situationId: string) => {
    if (!origin) return "";
    const params = new URLSearchParams({ situation: situationId });
    if (buildingName.trim()) params.set("building", buildingName.trim());
    return `${origin}/guide?${params.toString()}`;
  };

  const handleSelectSituation = (id: string) => {
    setActiveSituationId(id);
    setActiveLang("ko");
    setCopiedLang(null);
    setLinkCopied(false);
  };

  const handleCopy = async (lang: LanguageCode, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLang(lang);
      setTimeout(() => setCopiedLang(null), 1800);
    } catch {
      // clipboard API unavailable — user can select the text manually
    }
  };

  const handleCopyLink = async (situationId: string) => {
    try {
      await navigator.clipboard.writeText(guideLinkForSituation(situationId));
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      // clipboard API unavailable
    }
  };

  const handleDownloadQr = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${buildingName.trim() || "건물"}-QR.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="neu-surface min-h-screen py-10 px-4 sm:py-16">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <header className="text-center">
          <p className="text-sm font-medium text-[var(--neu-accent)]">건물 관리자용</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">상황별 안내문 · 건물 QR</h1>
          <p className="mt-2 text-sm text-[var(--neu-text-muted)]">
            상황 버튼을 누르면 4개국어 안내문이 준비됩니다. 복사해서 카카오톡으로 바로
            보내주세요.
          </p>
        </header>

        <div className="neu-raised p-5">
          <label className="block text-sm font-medium mb-2" htmlFor="buildingName">
            건물명 (선택)
          </label>
          <input
            id="buildingName"
            type="text"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            placeholder="예: 신동 3길 행복빌라"
            className="neu-input w-full px-4 py-3 text-base"
          />
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {SITUATIONS.map((situation) => (
            <button
              key={situation.id}
              type="button"
              data-active={activeSituationId === situation.id}
              onClick={() => handleSelectSituation(situation.id)}
              className="neu-btn flex flex-col items-center gap-2 px-3 py-6 text-center"
            >
              <span className="text-3xl">{situation.icon}</span>
              <span className="text-sm font-semibold">{situation.label}</span>
            </button>
          ))}
        </div>

        {activeSituation && (
          <div className="neu-raised flex flex-col gap-4 p-5">
            <LanguageTabs value={activeLang} onChange={setActiveLang} />

            <div className="neu-pressed whitespace-pre-line p-4 text-sm leading-relaxed">
              {renderMessage(activeSituation.templates[activeLang], buildingName)}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    activeLang,
                    renderMessage(activeSituation.templates[activeLang], buildingName)
                  )
                }
                className="neu-btn px-5 py-2.5 text-sm font-semibold text-[var(--neu-accent)]"
              >
                {copiedLang === activeLang ? "복사됨! 카톡에 붙여넣기 하세요" : "문장 복사하기"}
              </button>
              <button
                type="button"
                onClick={() => handleCopyLink(activeSituation.id)}
                disabled={!origin}
                className="neu-btn px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
              >
                {linkCopied ? "링크 복사됨!" : "안내 링크 복사"}
              </button>
            </div>
            <p className="text-xs text-[var(--neu-text-muted)]">
              &quot;안내 링크 복사&quot;는 이 상황의 안내를 바로 보여주는 링크를 복사합니다.
              카톡 메시지에 문장과 함께 붙여넣으면 학생이 눌러서 확인할 수 있어요.
            </p>
          </div>
        )}

        <div className="neu-raised flex flex-col items-center gap-4 p-5">
          <h2 className="text-base font-semibold">건물 QR 다운로드</h2>
          <p className="text-center text-xs text-[var(--neu-text-muted)]">
            이 QR을 인쇄해서 건물에 붙이면, 스캔 시 배출 규정·공지사항 확인 화면으로
            연결됩니다.
          </p>
          <div ref={qrRef} className="neu-pressed p-4">
            {guideQrValue ? (
              <QRCodeCanvas value={guideQrValue} size={168} bgColor="#e6ebe8" fgColor="#2f3b35" />
            ) : (
              <div className="h-[168px] w-[168px]" />
            )}
          </div>
          <button
            type="button"
            onClick={handleDownloadQr}
            disabled={!guideQrValue}
            className="neu-btn px-5 py-2.5 text-sm font-semibold text-[var(--neu-accent)] disabled:opacity-50"
          >
            PNG로 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
