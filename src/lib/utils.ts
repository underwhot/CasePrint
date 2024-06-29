import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
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

export function constructMetadata({
  title = "CasePrint | Printful Cases Shop",
  description = "Print your phone case with ease",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    metadataBase: new URL("https://case-print.vercel.app/"),
  };
}
