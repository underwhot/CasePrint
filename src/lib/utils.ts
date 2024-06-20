import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

export function wrapAccentInSpan(
  text: string,
  accent: string,
  className: string,
): string {
  const regex = new RegExp(`(${accent})`, "gi");
  return text.replace(regex, `<span class="${className}">$1</span>`);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}