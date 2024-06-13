import TagH2 from "./tag-h2";
import FeaturesList from "./featuresList";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const mainFeatures = [
  {
    title: "High-quality silicone material",
  },
  {
    title: "Scratch- and fingerprint resistant coating",
  },
  {
    title: "Wireless charging compatible",
  },
  {
    title: "5 year print warranty",
  },
];

export default function Features() {
  return (
    <section className="container flex flex-col items-center gap-4 py-10 md:gap-8 md:py-20">
      <TagH2 accent="your own case">
        Upload your photo and get your own case now
      </TagH2>

      <div className="flex items-center justify-evenly gap-1">
        <div className="flex max-h-[550px] items-center overflow-hidden rounded-3xl [flex:0_1_384px]">
          <Image
            src="/testimonials/1.jpg"
            width="0"
            height="0"
            sizes="100vw"
            alt="Example picture"
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <div>
          <Image src="/arrow.png" width="126" height="31" alt="" />
        </div>
        <div>
          <Image
            src="/phone-template.png"
            width="240"
            height="490"
            alt="Picture on case"
            className="h-auto w-full"
          />
        </div>
      </div>

      <FeaturesList features={mainFeatures} xl />

      <Button asChild variant="default">
        <Link href="/create" className="flex gap-2">
          Create your case now <ArrowRight />
        </Link>
      </Button>
    </section>
  );
}
