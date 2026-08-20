import { RECYCLING_DAYS } from "@/lib/data/categories";

export function isRecyclingDay(
  recyclingDays: readonly number[] = RECYCLING_DAYS,
  date: Date = new Date()
): boolean {
  return recyclingDays.includes(date.getDay());
}
