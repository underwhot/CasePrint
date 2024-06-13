import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type FeaturesListProps = {
  features: {
    title: string;
  }[];
  xl?: boolean;
};

export default function FeaturesList({
  features,
  xl = false,
}: FeaturesListProps) {
  return (
    <ul className={`inline-block ${xl ? "space-y-2" : ""}`}>
      {features.map((feature) => (
        <li
          key={feature.title}
          className={cn("flex items-center gap-1 text-left", {
            "gap-2 text-lg": xl,
          })}
        >
          <Check className="h-5 w-5 shrink-0 text-primary" />
          {feature.title}
        </li>
      ))}
    </ul>
  );
}
