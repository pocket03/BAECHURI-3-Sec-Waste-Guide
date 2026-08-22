"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { PencilIcon } from "@/components/icons";

interface Translations {
  en: string;
  zh: string;
  vi: string;
}

export function CustomNoticeTranslator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Translations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "번역에 실패했습니다");
      setResult(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "번역에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const combined = result
    ? [
        `🇰🇷 한국어\n${text}`,
        `🇺🇸 English\n${result.en}`,
        `🇨🇳 中文\n${result.zh}`,
        `🇻🇳 Tiếng Việt\n${result.vi}`,
      ].join("\n\n")
    : "";

  return (
    <section
      className="rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-5"
      style={{ boxShadow: "var(--w-shadow-normal)" }}
    >
      <h2 className="font-bold mb-1 flex items-center gap-1.5 text-[color:var(--w-label-normal)]">
        <span style={{ color: "var(--w-primary)" }}>
          <PencilIcon size={20} />
        </span>{" "}
        직접 작성 + 자동번역
      </h2>
      <p className="text-xs text-[color:var(--w-label-alt)] mb-3">
        정해진 템플릿에 없는 공지는 직접 한국어로 작성하면 3개 언어로 자동
        번역됩니다. 기계 번역이니 중요한 내용은 발송 전에 한 번 더
        확인해주세요.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="예: 다음 주 월요일부터 엘리베이터 점검이 있습니다."
        className="w-full rounded-xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-3 text-sm text-[color:var(--w-label-normal)] mb-3 resize-none"
      />
      <button
        onClick={handleTranslate}
        disabled={loading || !text.trim()}
        className="px-4 py-2 rounded-xl bg-[color:var(--w-primary)] text-white text-sm font-semibold hover:bg-[color:var(--w-primary-strong)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "번역 중..." : "번역하기"}
      </button>

      {error && <p className="text-sm text-[color:var(--w-status-negative)] mt-3">{error}</p>}

      {result && (
        <div className="mt-4">
          <div className="rounded-xl bg-[#b2c7da] p-3">
            <div className="rounded-lg rounded-tl-none bg-white px-4 py-3 text-sm whitespace-pre-line leading-relaxed shadow-sm">
              {combined}
            </div>
          </div>
          <div className="mt-3">
            <CopyButton
              text={combined}
              label="전체 복사"
              copiedLabel="복사되었습니다"
            />
          </div>
        </div>
      )}
    </section>
  );
}
