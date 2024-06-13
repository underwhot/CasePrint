import { wrapAccentInSpan } from "@/lib/utils";

type TagH2Props = {
  children: string;
  accent: string;
};

export default function TagH2({ children, accent }: TagH2Props) {
  const highlightClasses =
    "inline-block bg-primary py-1 px-2 text-white leading-tight relative -z-10";
  const highlightedText = wrapAccentInSpan(children, accent, highlightClasses);

  return (
    <h2
      className="mx-auto mb-8 max-w-[700px] text-center text-3xl font-bold leading-snug md:text-4xl lg:text-5xl"
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    ></h2>
  );
}
