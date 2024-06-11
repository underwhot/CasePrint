import { Check, Star } from "lucide-react";
import Image from "next/image";

const features = [
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
    <section className="container flex md:flex-row flex-col gap-10 items-center py-10 md:py-20 lg:py-24">
      <div className="space-y-8 flex-[0_0_60%] text-center md:text-left">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-snug">
          Your Image on a{" "}
          <span className="bg-primary px-2 text-white inline-block">
            Custom
          </span>{" "}
          Phone Case
        </h1>

        <p>
          Capture your favorite memories with your own, one-of-one phone case.
          CaseCobra allows you to protect your memories, not just your phone
          case.
        </p>

        <ul className="inline-block">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex gap-1 items-center text-left"
            >
              <Check className="h-5 w-5 shrink-0 text-primary" />
              {feature.title}
            </li>
          ))}
        </ul>

        <div className="flex gap-3 items-center justify-center md:justify-start flex-wrap">
          <ul className="flex -space-x-4">
            {Array.from({ length: 5 }, (_, index) => (
              <li
                key={index}
                className="rounded-full overflow-hidden border-2 border-border flex-[0_0_40px] box-content"
              >
                <Image
                  className="object-cover size-10"
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
                  className="text-primary size-4"
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

      <div className="flex justify-center flex-1">
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
            className="absolute w-36 left-56 -top-16 sm:-top-20 select-none hidden min-[1350px]:block sm:w-52"
          />
          <img
            src="/line.png"
            alt=""
            className="absolute w-20 -left-6 -bottom-6 select-none"
          />
        </div>
      </div>
    </section>
  );
}
