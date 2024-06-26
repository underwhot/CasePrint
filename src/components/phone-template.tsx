"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

type PhoneTemplateProps = {
  imageSrc: string;
  bg?: string;
};

export default function PhoneTemplate({ imageSrc, bg }: PhoneTemplateProps) {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`relative ${bg ? `bg-${bg}` : ""}`}>
      <Image
        src={imageSrc}
        width="0"
        height="0"
        sizes="100vw"
        alt="Image example"
        className="h-auto w-full object-cover"
        priority
      />
      <Image
        className="absolute inset-0 z-10 h-auto w-full object-cover"
        src={
          theme === "light"
            ? "/phone-template-white-edges.png"
            : "/phone-template-dark-edges.png"
        }
        width="0"
        height="0"
        sizes="100vw"
        alt="Case example"
        priority
      />
    </div>
  );
}
