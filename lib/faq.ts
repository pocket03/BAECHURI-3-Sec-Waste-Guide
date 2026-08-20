export interface Faq {
  id: string;
  landlord_id: string;
  question_ko: string;
  question_en: string | null;
  question_zh: string | null;
  question_vi: string | null;
  answer_ko: string;
  answer_en: string | null;
  answer_zh: string | null;
  answer_vi: string | null;
  sort_order: number;
  created_at: string;
}
