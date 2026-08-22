"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QrCodeImage({
  value,
  size = 180,
  downloadLabel,
  fileName = "baechuri-qr.png",
}: {
  value: string;
  size?: number;
  downloadLabel: string;
  fileName?: string;
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, { width: size, margin: 1 }).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-lg bg-[color:var(--w-fill)] animate-pulse"
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt="QR code"
        width={size}
        height={size}
        className="rounded-lg border border-[color:var(--w-line)] shadow-sm"
      />
      <a
        href={dataUrl}
        download={fileName}
        className="text-sm font-medium text-[color:var(--w-primary)] underline underline-offset-2"
      >
        {downloadLabel}
      </a>
    </div>
  );
}
