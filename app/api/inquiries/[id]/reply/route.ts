import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendSms } from "@/lib/sms";
import { translateText } from "@/lib/translate";
import { Inquiry } from "@/lib/inquiries";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { reply } = await req.json();

  if (!reply || typeof reply !== "string" || !reply.trim()) {
    return NextResponse.json({ error: "답장 내용이 필요합니다" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { data: inquiry, error: inquiryError } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();
  if (inquiryError || !inquiry) {
    return NextResponse.json({ error: "문의를 찾을 수 없습니다" }, { status: 404 });
  }
  if ((inquiry as Inquiry).landlord_id !== user.id) {
    return NextResponse.json({ error: "본인 소유의 문의가 아닙니다" }, { status: 403 });
  }

  const replyText = reply.trim();
  const tenantLang = (inquiry as Inquiry).lang;

  // 세입자가 읽을 수 있도록, 필요하면 답장을 세입자 언어로 번역해서 발송합니다.
  // 번역이 설정되어 있지 않거나 실패해도 한국어 원문으로는 발송을 진행합니다.
  let textToSend = replyText;
  if (tenantLang !== "ko") {
    try {
      textToSend = await translateText(replyText, "ko", tenantLang);
    } catch {
      textToSend = replyText;
    }
  }

  const result = await sendSms((inquiry as Inquiry).phone, textToSend);

  const { error: updateError } = await supabase
    .from("inquiries")
    .update({
      reply: replyText,
      status: "answered",
      replied_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (updateError) {
    return NextResponse.json({ error: "답장 상태 저장에 실패했습니다" }, { status: 500 });
  }

  return NextResponse.json({
    success: result.success,
    mock: result.mock,
    error: result.error,
  });
}
