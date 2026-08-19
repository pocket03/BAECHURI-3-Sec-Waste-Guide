import { NextResponse } from "next/server";

const TARGETS = ["en", "zh-CN", "vi"] as const;

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const key = process.env.GOOGLE_TRANSLATE_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "translation is not configured" },
      { status: 500 }
    );
  }

  try {
    const [en, zh, vi] = await Promise.all(
      TARGETS.map(async (target) => {
        const res = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${key}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: text,
              source: "ko",
              target,
              format: "text",
            }),
          }
        );
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error?.message || "translation failed");
        }
        return json.data.translations[0].translatedText as string;
      })
    );

    return NextResponse.json({ en, zh, vi });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "translation failed" },
      { status: 502 }
    );
  }
}
