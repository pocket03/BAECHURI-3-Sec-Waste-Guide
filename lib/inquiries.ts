import { Lang } from "@/lib/types";

export interface Inquiry {
  id: string;
  landlord_id: string;
  phone: string;
  lang: Lang;
  message: string;
  message_ko: string;
  status: "unread" | "answered";
  reply: string | null;
  created_at: string;
  replied_at: string | null;
}
