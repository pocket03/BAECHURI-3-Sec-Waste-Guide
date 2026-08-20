export interface BuildingSettings {
  landlord_id: string;
  recycling_days: number[];
  banner_ko: string | null;
  banner_en: string | null;
  banner_zh: string | null;
  banner_vi: string | null;
  updated_at: string;
}

export const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
