"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useBuilding } from "@/lib/building-context";
import { t } from "@/lib/i18n";
import { TenantHeader } from "@/components/TenantHeader";
import { createClient } from "@/lib/supabase/client";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@/components/icons";

export default function InquiryPage() {
  const { lang, ready: langReady } = useLanguage();
  const { buildingId, ready: buildingReady } = useBuilding();

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (!langReady || !buildingReady) return null;

  const handleSubmit = async () => {
    if (!phone.trim() || !message.trim() || !buildingId) return;
    setSending(true);
    setError(null);
    try {
      let messageKo = message.trim();
      if (lang !== "ko") {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message.trim(), source: lang, target: "ko" }),
        });
        const json = await res.json();
        if (res.ok && json.ko) messageKo = json.ko;
      }

      const supabase = createClient();
      const { error: insertError } = await supabase.from("inquiries").insert({
        landlord_id: buildingId,
        phone: phone.trim(),
        lang,
        message: message.trim(),
        message_ko: messageKo,
      });
      if (insertError) throw insertError;
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : t(lang, "inquiryErrorGeneric"));
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-16">
      <TenantHeader lang={lang} title={t(lang, "inquiryTitle")} />

      {!buildingId && (
        <div className="rounded-2xl p-4 flex gap-2 items-start bg-[color:var(--w-status-caution-wash)]">
          <span className="shrink-0 mt-0.5 text-[color:var(--w-status-caution)]">
            <ExclamationTriangleIcon size={18} />
          </span>
          <p className="text-sm leading-relaxed text-[color:var(--w-label-normal)]">
            {t(lang, "inquiryErrorNoBuilding")}
          </p>
        </div>
      )}

      {buildingId && sent && (
        <div
          className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-8 text-center"
          style={{ boxShadow: "var(--w-shadow-normal)" }}
        >
          <div className="mb-3 flex justify-center text-[color:var(--w-status-positive)]">
            <CheckCircleIcon size={44} />
          </div>
          <h2 className="text-lg font-extrabold mb-2">{t(lang, "inquirySuccessTitle")}</h2>
          <p className="text-sm leading-relaxed mb-6 text-[color:var(--w-label-neutral)]">
            {t(lang, "inquirySuccessDesc")}
          </p>
          <Link
            href="/search"
            className="text-sm font-semibold underline underline-offset-2 text-[color:var(--w-primary)]"
          >
            {t(lang, "backToSearchButton")}
          </Link>
        </div>
      )}

      {buildingId && !sent && (
        <>
          <div
            className="rounded-3xl border border-[color:var(--w-line)] bg-[color:var(--w-bg-card)] p-6"
            style={{ boxShadow: "var(--w-shadow-normal)" }}
          >
            <p className="text-sm mb-4 leading-relaxed text-[color:var(--w-label-neutral)]">
              {t(lang, "inquirySubtitle")}
            </p>

            <label className="block text-xs font-semibold mb-1 text-[color:var(--w-label-alt)]">
              {t(lang, "inquiryPhoneLabel")}
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t(lang, "inquiryPhonePlaceholder")}
              className="w-full rounded-xl border border-[color:var(--w-line)] px-3 py-2 text-sm mb-4"
            />

            <label className="block text-xs font-semibold mb-1 text-[color:var(--w-label-alt)]">
              {t(lang, "inquiryMessageLabel")}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder={t(lang, "inquiryMessagePlaceholder")}
              className="w-full rounded-xl border border-[color:var(--w-line)] p-3 text-sm mb-4 resize-none"
            />

            {error && <p className="text-sm mb-3 text-[color:var(--w-status-negative)]">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={sending || !phone.trim() || !message.trim()}
              className="w-full px-4 py-3 rounded-xl bg-[color:var(--w-primary)] text-white text-sm font-bold hover:bg-[color:var(--w-primary-strong)] disabled:opacity-50 transition-colors"
            >
              {sending ? t(lang, "inquirySubmitting") : t(lang, "inquirySubmitButton")}
            </button>
          </div>

          <div className="mt-6">
            <Link
              href="/search"
              className="text-sm font-semibold underline underline-offset-2 text-[color:var(--w-primary)]"
            >
              {t(lang, "backToSearchButton")}
            </Link>
          </div>
        </>
      )}

      <footer className="text-xs text-center leading-relaxed mt-10 text-[color:var(--w-label-assistive)]">
        {t(lang, "footerDisclaimer")}
      </footer>
    </main>
  );
}
