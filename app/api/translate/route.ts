import { NextResponse } from "next/server";
import { translateText } from "@/lib/translate";

const TARGETS = ["en", "zh", "vi"] as const;

export async function POST(req: Request) {
  const { text, source, target } = await req.json();

  if (!text || typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  if (!process.env.GOOGLE_TRANSLATE_KEY) {
    return NextResponse.json(
      { error: "translation is not configured" },
      { status: 500 }
    );
  }

  try {
    // 단일 언어로의 번역 (예: 세입자 문의를 집주인이 읽을 한국어로 번역)
    if (target) {
      const translated = await translateText(text, source || "ko", target);
      return NextResponse.json({ [target]: translated });
    }

    // 기본 동작: 한국어 → 영/중/베 3개 언어 동시 번역
    const [en, zh, vi] = await Promise.all(
      TARGETS.map((t) => translateText(text, "ko", t))
    );
    return NextResponse.json({ en, zh, vi });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "translation failed" },
      { status: 502 }
    );
  }
}
