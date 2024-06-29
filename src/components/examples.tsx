"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TagH2 from "./tag-h2";
import { useTheme } from "next-themes";

export default function Examples() {
  const ref = useRef(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: ref,
    offset: ["start end", "end start"],
  });

  const col1 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const col2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const col3 = useTransform(scrollYProgress, [0, 1], [150, -50]);

  const leftToRight = useTransform(scrollYProgress, [0, 1], [-100, 50]);
  const rightToLeft = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section className="container">
      <TagH2 accent="people">What people are buying</TagH2>
      <div
        ref={ref}
        className="mx-auto flex max-w-[900px] justify-center gap-3 py-[100px] sm:justify-evenly sm:gap-8 [&>*]:[flex:0_1_30%]"
      >
        <motion.div
          className="relative flex flex-col gap-8"
          style={{ y: col1, x: leftToRight }}
        >
          <ExampleImage imageSrc="/testimonials/1.jpg" theme={theme} />
          <ExampleImage imageSrc="/testimonials/2.jpg" theme={theme} />
        </motion.div>
        <motion.div className="flex flex-col gap-8" style={{ y: col2 }}>
          <ExampleImage imageSrc="/testimonials/3.jpg" theme={theme} />
          <ExampleImage imageSrc="/testimonials/4.jpg" theme={theme} />
        </motion.div>
        <motion.div
          className="flex flex-col gap-8"
          style={{ y: col3, x: rightToLeft }}
        >
          <ExampleImage imageSrc="/testimonials/5.jpg" theme={theme} />
          <ExampleImage imageSrc="/testimonials/6.jpg" theme={theme} />
        </motion.div>
      </div>
    </section>
  );
}

type ExampleImageProps = {
  imageSrc: string;
  theme: string | undefined;
};

function ExampleImage({ imageSrc, theme }: ExampleImageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`overflow-hidden rounded-xl p-[5%] sm:rounded-3xl ${theme === "light" ? "bg-white" : "bg-[#1a1a1a]"}`}
    >
      <div className="relative">
        <Image
          // "/testimonials/1.jpg"
          src={imageSrc}
          width="0"
          height="0"
          sizes="100vw"
          alt="Case example"
          className="h-auto w-full object-cover"
          priority
        />
        <Image
          className="absolute right-0 top-0 z-10 h-auto w-full object-cover"
          src={
            theme === "light"
              ? "/phone-template-white-edges.png"
              : "/phone-template-dark-edges.png"
          }
          width="0"
          height="0"
          sizes="100vw"
          alt="Case example"
        />
      </div>
    </div>
  );
}
