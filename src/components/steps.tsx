"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    name: "Step 1: Upload image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/summary",
  },
];

export default function Steps() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap gap-4 [&>*]:flex-[1_1_200px]">
      {STEPS.map((step) => (
        <li
          key={step.name}
          className={cn("rounded-lg bg-muted p-4 text-center opacity-50", {
            "opacity-100": step.url === pathname,
          })}
        >
          <div className="text-lg">{step.name}</div>
          <div className="text-sm text-muted-foreground">
            {step.description}
          </div>
        </li>
      ))}
    </ul>
  );
}
