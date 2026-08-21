"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useBuilding } from "@/lib/building-context";
import { t } from "@/lib/i18n";
import { TenantHeader } from "@/components/TenantHeader";
import { createClient } from "@/lib/supabase/client";

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
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
          {t(lang, "inquiryErrorNoBuilding")}
        </div>
      )}

      {buildingId && sent && (
        <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-8 text-center">
          <div className="text-5xl mb-3">✅</div>
          <h2 className="text-lg font-extrabold mb-2">{t(lang, "inquirySuccessTitle")}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            {t(lang, "inquirySuccessDesc")}
          </p>
          <Link
            href="/search"
            className="text-sm font-semibold text-green-700 underline underline-offset-2"
          >
            {t(lang, "backToSearchButton")}
          </Link>
        </div>
      )}

      {buildingId && !sent && (
        <>
          <div className="rounded-3xl border border-neutral-200 bg-white shadow-sm p-6">
            <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
              {t(lang, "inquirySubtitle")}
            </p>

            <label className="block text-xs font-semibold text-neutral-500 mb-1">
              {t(lang, "inquiryPhoneLabel")}
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t(lang, "inquiryPhonePlaceholder")}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm mb-4"
            />

            <label className="block text-xs font-semibold text-neutral-500 mb-1">
              {t(lang, "inquiryMessageLabel")}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder={t(lang, "inquiryMessagePlaceholder")}
              className="w-full rounded-lg border border-neutral-300 p-3 text-sm mb-4 resize-none"
            />

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={sending || !phone.trim() || !message.trim()}
              className="w-full px-4 py-3 rounded-lg bg-green-600 text-white text-sm font-bold hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {sending ? t(lang, "inquirySubmitting") : t(lang, "inquirySubmitButton")}
            </button>
          </div>

          <div className="mt-6">
            <Link
              href="/search"
              className="text-sm font-semibold text-green-700 underline underline-offset-2"
            >
              {t(lang, "backToSearchButton")}
            </Link>
          </div>
        </>
      )}

      <footer className="text-xs text-neutral-400 text-center leading-relaxed mt-10">
        {t(lang, "footerDisclaimer")}
      </footer>
    </main>
  );
}
