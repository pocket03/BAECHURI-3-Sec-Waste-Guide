"use client";

import { useEffect, useState } from "react";
import { QrCodeImage } from "@/components/QrCodeImage";
import { CopyButton } from "@/components/CopyButton";

export function BuildingQrCard({ userId }: { userId: string }) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const link = `${origin}/guide?b=${userId}`;

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <h2 className="font-bold mb-1">우리 건물 QR · 링크</h2>
      <p className="text-xs text-neutral-500 mb-3">
        이 QR·링크로 들어온 세입자에게는 여기서 등록한 FAQ와 공지사항이
        표시됩니다.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <QrCodeImage
          value={link}
          downloadLabel="QR 다운로드"
          fileName="baechuri-my-building-qr.png"
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
    </section>
  );
}
