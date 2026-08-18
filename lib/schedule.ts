import { RECYCLING_DAYS } from "@/lib/data/categories";

export function isRecyclingDay(date: Date = new Date()): boolean {
  return RECYCLING_DAYS.includes(date.getDay());
}
