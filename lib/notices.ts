export interface Notice {
  id: string;
  title: string;
  body_ko: string;
  body_en: string | null;
  body_zh: string | null;
  body_vi: string | null;
  created_at: string;
  updated_at: string;
}
