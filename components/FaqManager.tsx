"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Faq } from "@/lib/faq";

async function translate(text: string): Promise<{ en: string; zh: string; vi: string }> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "번역에 실패했습니다");
  return json;
}

export function FaqManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [questionKo, setQuestionKo] = useState("");
  const [answerKo, setAnswerKo] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFaqs = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("landlord_id", userId)
      .order("sort_order", { ascending: true });
    if (!error && data) setFaqs(data as Faq[]);
    setLoadingList(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setQuestionKo("");
    setAnswerKo("");
    setError(null);
  };

  const startEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setQuestionKo(faq.question_ko);
    setAnswerKo(faq.answer_ko);
    setError(null);
  };

  const handleSave = async () => {
    if (!questionKo.trim() || !answerKo.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const [q, a] = await Promise.all([translate(questionKo), translate(answerKo)]);

      if (editingId) {
        const { error } = await supabase
          .from("faqs")
          .update({
            question_ko: questionKo,
            question_en: q.en,
            question_zh: q.zh,
            question_vi: q.vi,
            answer_ko: answerKo,
            answer_en: a.en,
            answer_zh: a.zh,
            answer_vi: a.vi,
          })
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("faqs").insert({
          landlord_id: userId,
          question_ko: questionKo,
          question_en: q.en,
          question_zh: q.zh,
          question_vi: q.vi,
          answer_ko: answerKo,
          answer_en: a.en,
          answer_zh: a.zh,
          answer_vi: a.vi,
          sort_order: faqs.length,
        });
        if (error) throw error;
      }

      resetForm();
      await loadFaqs();
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장에 실패했습니다");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("이 FAQ를 삭제할까요?")) return;
    await supabase.from("faqs").delete().eq("id", id);
    if (editingId === id) resetForm();
    await loadFaqs();
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="font-bold mb-1 flex items-center gap-1.5">
        <span>💬</span> {editingId ? "FAQ 수정" : "새 FAQ 작성"}
      </h2>
      <p className="text-xs text-neutral-500 mb-3">
        여기서 등록한 FAQ는 우리 건물 QR로 들어온 세입자에게만 보입니다.
        비워두면 기본 FAQ 4개가 대신 표시됩니다.
      </p>
      <input
        value={questionKo}
        onChange={(e) => setQuestionKo(e.target.value)}
        placeholder="질문 (예: 분리수거장 위치가 어디인가요?)"
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm mb-2"
      />
      <textarea
        value={answerKo}
        onChange={(e) => setAnswerKo(e.target.value)}
        rows={2}
        placeholder="답변을 한국어로 입력하세요. 저장하면 3개 언어로 자동 번역됩니다."
        className="w-full rounded-lg border border-neutral-300 p-3 text-sm mb-3 resize-none"
      />
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          disabled={saving || !questionKo.trim() || !answerKo.trim()}
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

      {loadingList && <p className="text-sm text-neutral-400">불러오는 중...</p>}
      {!loadingList && faqs.length === 0 && (
        <p className="text-sm text-neutral-400">
          등록된 FAQ가 없습니다 (기본 FAQ 4개가 대신 표시됩니다).
        </p>
      )}
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-xl bg-neutral-50 px-3 py-2.5 text-sm flex items-start justify-between gap-3"
          >
            <div>
              <p className="font-semibold">{faq.question_ko}</p>
              <p className="text-neutral-500">{faq.answer_ko}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => startEdit(faq)}
                className="text-xs font-semibold text-green-700 underline underline-offset-2"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="text-xs font-semibold text-red-600 underline underline-offset-2"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
