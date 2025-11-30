import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBillingPeriod(billingPeriod: string): string {
  if (billingPeriod.length !== 6) return billingPeriod;

  const year = billingPeriod.slice(0, 4);
  const month = parseInt(billingPeriod.slice(4, 6), 10);

  const date = new Date(Number(year), month - 1);
  return capitalizeFirstLetter(
    date.toLocaleString("default", { month: "numeric", year: "numeric" })
  );
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
