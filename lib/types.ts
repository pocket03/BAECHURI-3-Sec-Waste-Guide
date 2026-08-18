export type Lang = "ko" | "en" | "zh" | "vi";

export const LANGS: Lang[] = ["ko", "en", "zh", "vi"];

export const LANG_LABEL: Record<Lang, string> = {
  ko: "한국어",
  en: "English",
  zh: "中文",
  vi: "Tiếng Việt",
};

export const LANG_FLAG: Record<Lang, string> = {
  ko: "🇰🇷",
  en: "🇺🇸",
  zh: "🇨🇳",
  vi: "🇻🇳",
};

export type LocalizedText = Record<Lang, string>;

export type CategoryId =
  | "plastic"
  | "paper"
  | "glass"
  | "can"
  | "vinyl"
  | "styrofoam"
  | "general";

export interface CategoryInfo {
  id: CategoryId;
  recyclable: boolean;
  label: LocalizedText;
  guide: LocalizedText;
}

export interface Item {
  id: string;
  icon: string;
  category: CategoryId;
  name: LocalizedText;
  note?: LocalizedText;
  tricky?: boolean;
}

export interface FaqEntry {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export type TemplateGroup = "trash" | "moveout" | "notice";

export interface MessageTemplate {
  id: string;
  group: TemplateGroup;
  title: LocalizedText;
  body: LocalizedText;
  legalNotice?: boolean;
}

export interface Place {
  id: string;
  name: LocalizedText;
  categories: CategoryId[];
  description: LocalizedText;
}
