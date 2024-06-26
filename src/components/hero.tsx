import { Check, Star } from "lucide-react";
import Image from "next/image";
import FeaturesList from "./featuresList";

const HERO_FEATURES = [
  {
    title: "High-quality, durable material",
  },
  {
    title: "5 year print guarantee",
  },
  {
    title: "Modern iPhone models supported",
  },
];

export default function Hero() {
  return (
    <section className="container flex flex-col items-center gap-10 py-10 md:flex-row md:py-20 lg:py-24">
      <div className="flex-[0_0_60%] space-y-8 text-center md:text-left">
        <h1 className="text-4xl font-bold !leading-tight md:text-5xl lg:text-6xl">
          Your Image on a{" "}
          <span className="inline-block bg-primary px-2 text-white">
            Custom
          </span>{" "}
          Phone Case
        </h1>

        <p>
          Capture your favorite memories with your own, one-of-one phone case.
          CasePrint allows you to protect your memories, not just your phone
          case.
        </p>

        <FeaturesList features={HERO_FEATURES} />

        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <ul className="flex -space-x-4">
            {Array.from({ length: 5 }, (_, index) => (
              <li
                key={index}
                className="box-content flex-[0_0_40px] overflow-hidden rounded-full border-2 border-border"
              >
                <Image
                  className="size-10 object-cover"
                  src={`/users/user-${index + 1}.jpg`}
                  width={40}
                  height={40}
                  alt=""
                />
              </li>
            ))}
          </ul>

          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-4 text-primary"
                  fill="currentColor"
                />
              ))}
            </div>
            <p>
              <span className="font-bold">1.250</span> happy customers
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-center">
        <div className="relative">
          <Image
            src="/phone-template.png"
            alt="Case example"
            width={256}
            height={528}
            priority
          />
          <img
            src="/your-image.png"
            alt=""
            className="absolute -top-16 left-56 hidden w-36 select-none sm:-top-20 sm:w-52 min-[1350px]:block"
          />
          <img
            src="/line.png"
            alt=""
            className="absolute -bottom-6 -left-6 w-20 select-none"
          />
        </div>
      </div>
    </section>
  );
}
