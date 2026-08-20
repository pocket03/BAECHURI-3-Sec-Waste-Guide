import { Lang } from "@/lib/types";

export interface Tenant {
  id: string;
  landlord_id: string;
  phone: string;
  lang: Lang;
  memo: string | null;
  created_at: string;
}
