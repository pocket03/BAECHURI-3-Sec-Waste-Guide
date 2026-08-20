"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Notice } from "@/lib/notices";
import { CopyButton } from "@/components/CopyButton";
import { QrCodeImage } from "@/components/QrCodeImage";

interface Translations {
  en: string;
  zh: string;
  vi: string;
}

async function translate(text: string): Promise<Translations> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "번역에 실패했습니다");
  return json;
}

export function NoticeManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [origin, setOrigin] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [bodyKo, setBodyKo] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<Record<string, string>>({});

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const loadNotices = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .eq("landlord_id", userId)
      .order("updated_at", { ascending: false });
    if (!error && data) setNotices(data as Notice[]);
    setLoadingList(false);
  };

  useEffect(() => {
    loadNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setBodyKo("");
    setError(null);
  };

  const startEdit = (notice: Notice) => {
    setEditingId(notice.id);
    setTitle(notice.title);
    setBodyKo(notice.body_ko);
    setError(null);
  };

  const handleSave = async () => {
    if (!title.trim() || !bodyKo.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const { en, zh, vi } = await translate(bodyKo);

      if (editingId) {
        const { error } = await supabase
          .from("notices")
          .update({
            title,
            body_ko: bodyKo,
            body_en: en,
            body_zh: zh,
            body_vi: vi,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("notices").insert({
          landlord_id: userId,
          title,
          body_ko: bodyKo,
          body_en: en,
          body_zh: zh,
          body_vi: vi,
        });
        if (error) throw error;
      }

      resetForm();
      await loadNotices();
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장에 실패했습니다");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("이 공지사항을 삭제할까요?")) return;
    await supabase.from("notices").delete().eq("id", id);
    if (editingId === id) resetForm();
    await loadNotices();
  };

  const handleSendSms = async (id: string) => {
    setSendingId(id);
    setSendResult((prev) => ({ ...prev, [id]: "" }));
    try {
      const res = await fetch(`/api/notices/${id}/send-sms`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "문자 발송에 실패했습니다");
      const modeLabel = json.mock ? " (Mock 모드 — 실제 발송 아님, 콘솔 로그 확인)" : "";
      const errors = (json.results as { to: string; success: boolean; error?: string }[])
        .filter((r) => !r.success)
        .map((r) => `${r.to}: ${r.error || "알 수 없는 오류"}`)
        .join(" / ");
      setSendResult((prev) => ({
        ...prev,
        [id]: `${json.sent}/${json.total}명에게 발송 완료${modeLabel}${
          errors ? ` — 실패: ${errors}` : ""
        }`,
      }));
    } catch (e) {
      setSendResult((prev) => ({
        ...prev,
        [id]: e instanceof Error ? e.message : "문자 발송에 실패했습니다",
      }));
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-neutral-200 bg-white p-4">
        <h2 className="font-bold mb-3">
          {editingId ? "공지사항 수정" : "새 공지사항 작성"}
        </h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="공지 제목 (예: 엘리베이터 점검 안내)"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm mb-2"
        />
        <textarea
          value={bodyKo}
          onChange={(e) => setBodyKo(e.target.value)}
          rows={3}
          placeholder="공지 내용을 한국어로 입력하세요. 저장하면 3개 언어로 자동 번역됩니다."
          className="w-full rounded-lg border border-neutral-300 p-3 text-sm mb-3 resize-none"
        />
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !title.trim() || !bodyKo.trim()}
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "저장 중..." : editingId ? "수정 저장" : "번역 후 저장"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-600 text-sm font-semibold hover:bg-neutral-50 transition-colors"
            >
              취소
            </button>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-3">
          작성된 공지사항 {loadingList ? "" : `(${notices.length})`}
        </h2>
        {loadingList && (
          <p className="text-sm text-neutral-400">불러오는 중...</p>
        )}
        {!loadingList && notices.length === 0 && (
          <p className="text-sm text-neutral-400">
            아직 작성된 공지사항이 없습니다.
          </p>
        )}
        <div className="flex flex-col gap-3">
          {notices.map((notice) => {
            const link = `${origin}/result?custom=${notice.id}`;
            return (
              <div
                key={notice.id}
                className="rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold">{notice.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(notice)}
                      className="text-xs font-semibold text-green-700 underline underline-offset-2"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="text-xs font-semibold text-red-600 underline underline-offset-2"
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <p className="text-sm text-neutral-700 whitespace-pre-line mb-3">
                  {notice.body_ko}
                </p>
                <div className="mb-3">
                  <button
                    onClick={() => handleSendSms(notice.id)}
                    disabled={sendingId === notice.id}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 disabled:opacity-50 transition-colors"
                  >
                    {sendingId === notice.id ? "발송 중..." : "📱 문자로 발송"}
                  </button>
                  {sendResult[notice.id] && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {sendResult[notice.id]}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <QrCodeImage
                    value={link}
                    size={100}
                    downloadLabel="QR 다운로드"
                    fileName={`baechuri-notice-${notice.id}.png`}
                  />
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value={link}
                        className="flex-1 min-w-0 rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-600"
                      />
                      <CopyButton
                        text={link}
                        label="링크 복사"
                        copiedLabel="복사됨"
                        className="px-3 py-2 rounded-lg border border-green-600 text-green-700 text-xs font-semibold hover:bg-green-50 transition-colors whitespace-nowrap"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
