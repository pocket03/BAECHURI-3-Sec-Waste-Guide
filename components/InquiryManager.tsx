"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Inquiry } from "@/lib/inquiries";
import { LANG_FLAG } from "@/lib/types";
import { MailIcon } from "@/components/icons";

export function InquiryManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<Record<string, string>>({});

  const loadInquiries = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .eq("landlord_id", userId)
      .order("created_at", { ascending: false });
    if (!error && data) setInquiries(data as Inquiry[]);
    setLoadingList(false);
  };

  useEffect(() => {
    loadInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReply = async (id: string) => {
    const reply = (replyDrafts[id] || "").trim();
    if (!reply) return;
    setSendingId(id);
    setSendResult((prev) => ({ ...prev, [id]: "" }));
    try {
      const res = await fetch(`/api/inquiries/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "답장 발송에 실패했습니다");
      setSendResult((prev) => ({
        ...prev,
        [id]: json.mock
          ? "답장을 발송했습니다 (Mock 모드 — 실제 발송 아님, 콘솔 로그 확인)"
          : "답장을 발송했습니다",
      }));
      setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
      await loadInquiries();
    } catch (e) {
      setSendResult((prev) => ({
        ...prev,
        [id]: e instanceof Error ? e.message : "답장 발송에 실패했습니다",
      }));
    } finally {
      setSendingId(null);
    }
  };

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  return (
    <section>
      <h2 className="font-bold mb-3 flex items-center gap-1.5 text-[color:var(--w-label-normal)]">
        <span style={{ color: "var(--w-primary)" }}>
          <MailIcon size={20} />
        </span>{" "}
        세입자 문의{" "}
        {!loadingList &&
          `(${inquiries.length}${unreadCount > 0 ? ` · 미답변 ${unreadCount}` : ""})`}
      </h2>
      {loadingList && <p className="text-sm text-[color:var(--w-label-assistive)]">불러오는 중...</p>}
      {!loadingList && inquiries.length === 0 && (
        <p className="text-sm text-[color:var(--w-label-assistive)]">아직 접수된 문의가 없습니다.</p>
      )}
      <div className="flex flex-col gap-3">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="rounded-2xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-4"
            style={{ boxShadow: "var(--w-shadow-normal)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold mr-2 ${
                    inquiry.status === "answered"
                      ? "bg-[color:var(--w-status-positive-wash)] text-[color:var(--w-status-positive)]"
                      : "bg-[color:var(--w-status-caution-wash)] text-[color:var(--w-status-caution)]"
                  }`}
                >
                  {inquiry.status === "answered" ? "답변완료" : "미답변"}
                </span>
                <span className="text-sm font-semibold text-[color:var(--w-label-normal)]">
                  {LANG_FLAG[inquiry.lang]} {inquiry.phone}
                </span>
              </div>
              <span className="text-xs text-[color:var(--w-label-assistive)] shrink-0">
                {new Date(inquiry.created_at).toLocaleString("ko-KR")}
              </span>
            </div>

            <p className="text-sm text-[color:var(--w-label-neutral)] whitespace-pre-line mb-3 rounded-xl bg-[color:var(--w-fill)] p-3">
              {inquiry.message_ko}
            </p>

            {inquiry.reply && (
              <p className="text-sm text-[color:var(--w-status-positive)] whitespace-pre-line mb-3 rounded-xl bg-[color:var(--w-status-positive-wash)] p-3">
                💬 {inquiry.reply}
              </p>
            )}

            <div className="flex gap-2">
              <input
                value={replyDrafts[inquiry.id] ?? ""}
                onChange={(e) =>
                  setReplyDrafts((prev) => ({ ...prev, [inquiry.id]: e.target.value }))
                }
                placeholder="답장 내용을 입력하세요 (한국어로 작성하면 세입자 언어로 번역되어 발송됩니다)"
                className="flex-1 min-w-0 rounded-xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] px-3 py-2 text-sm text-[color:var(--w-label-normal)]"
              />
              <button
                onClick={() => handleReply(inquiry.id)}
                disabled={sendingId === inquiry.id || !(replyDrafts[inquiry.id] || "").trim()}
                className="px-3 py-2 rounded-xl bg-[color:var(--w-primary)] text-white text-xs font-semibold hover:bg-[color:var(--w-primary-strong)] disabled:opacity-50 transition-colors whitespace-nowrap"
              >
                {sendingId === inquiry.id ? "발송 중..." : "📱 문자로 답장"}
              </button>
            </div>
            {sendResult[inquiry.id] && (
              <p className="text-xs text-[color:var(--w-label-alt)] mt-1">{sendResult[inquiry.id]}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
