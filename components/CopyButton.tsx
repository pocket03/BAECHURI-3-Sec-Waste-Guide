"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label,
  copiedLabel,
  className = "",
}: {
  text: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 API를 쓸 수 없는 환경을 위한 대체 처리
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
      }
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
