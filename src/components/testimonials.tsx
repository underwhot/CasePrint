import { Check, Star } from "lucide-react";
import Image from "next/image";
import TagH2 from "./tag-h2";
import { wrapAccentInSpan } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Jonathan",
    text: "The case feels durable and I even got a compliment on the design. Had the case for two and a half months now and the image is super clear, on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it.",
    imageSrc: "/users/user-1.jpg",
    accent: "the image is super clear",
  },
  {
    name: "Josh",
    text: "I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one looks brand new after about half a year. I dig it.",
    imageSrc: "/users/user-4.jpg",
    accent: "looks brand new after about half a year",
  },
];

export default function Testimonials() {
  return (
    <section className="container py-10 md:py-20">
      <TagH2 accent="customers">What our customers say</TagH2>

      <div className="flex flex-col gap-10 sm:flex-row lg:justify-evenly [&>*]:[flex:0_1_50%] lg:[&>*]:[flex:0_1_40%]">
        {TESTIMONIALS.map((testimonial, idx) => (
          <TestimonialCard key={testimonial.name + idx} {...testimonial}>
            {testimonial.text}
          </TestimonialCard>
        ))}
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  name: string;
  children: string;
  imageSrc: string;
  accent: string;
};

export function TestimonialCard({
  name,
  children,
  imageSrc,
  accent,
}: TestimonialCardProps) {
  const highlightClasses = "p-0.5 bg-foreground text-background";
  const highlightedText = wrapAccentInSpan(children, accent, highlightClasses);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className="size-5 text-primary"
            fill="currentColor"
          />
        ))}
      </div>

      <p
        className="flex-1"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      ></p>

      <div className="flex items-center gap-4">
        <div className="flex-[0_0_48px] overflow-hidden rounded-full">
          <Image src={imageSrc} width="48" height="48" alt="" />
        </div>
        <div>
          <p>{name}</p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Check className="h-4 w-4 shrink-0 text-primary" />
            Verified Purchase
          </p>
        </div>
      </div>
    </div>
  );
}
