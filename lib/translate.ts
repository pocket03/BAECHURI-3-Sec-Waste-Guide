const GOOGLE_LANG: Record<string, string> = { ko: "ko", en: "en", zh: "zh-CN", vi: "vi" };

export async function translateText(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const key = process.env.GOOGLE_TRANSLATE_KEY;
  if (!key) throw new Error("translation is not configured");

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: GOOGLE_LANG[source] ?? source,
        target: GOOGLE_LANG[target] ?? target,
        format: "text",
      }),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "translation failed");
  return json.data.translations[0].translatedText as string;
}
