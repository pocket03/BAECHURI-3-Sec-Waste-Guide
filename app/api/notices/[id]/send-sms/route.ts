import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendSms } from "@/lib/sms";
import { Notice } from "@/lib/notices";
import { Tenant } from "@/lib/tenants";
import { Lang } from "@/lib/types";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { data: notice, error: noticeError } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .single();
  if (noticeError || !notice) {
    return NextResponse.json({ error: "공지사항을 찾을 수 없습니다" }, { status: 404 });
  }
  if ((notice as Notice).landlord_id !== user.id) {
    return NextResponse.json({ error: "본인 소유의 공지사항이 아닙니다" }, { status: 403 });
  }

  const { data: tenants, error: tenantsError } = await supabase
    .from("tenants")
    .select("*")
    .eq("landlord_id", user.id);
  if (tenantsError) {
    return NextResponse.json({ error: "세입자 목록을 불러오지 못했습니다" }, { status: 500 });
  }

  const bodyByLang: Record<Lang, string | null> = {
    ko: (notice as Notice).body_ko,
    en: (notice as Notice).body_en,
    zh: (notice as Notice).body_zh,
    vi: (notice as Notice).body_vi,
  };

  const results = await Promise.all(
    ((tenants as Tenant[]) ?? []).map((tenant) => {
      const text = bodyByLang[tenant.lang] || (notice as Notice).body_ko;
      return sendSms(tenant.phone, text);
    })
  );

  return NextResponse.json({
    total: results.length,
    sent: results.filter((r) => r.success).length,
    mock: results.length > 0 ? results[0].mock : false,
    results,
  });
}
