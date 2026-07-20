import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a number with a "+" or exact tabular display, e.g. 14 -> "14". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** Formats an ISO date string as "Mon YYYY". */
export function formatMonthYear(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}
