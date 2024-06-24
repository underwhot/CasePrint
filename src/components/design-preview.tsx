"use client";

import { Configuration } from "@prisma/client";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

type DesignPreviewProps = {
  configuration: Configuration;
};

export default function DesignPreview({ configuration }: DesignPreviewProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[999] flex h-full select-none items-center justify-center overflow-hidden"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="flex flex-auto select-none flex-col items-center justify-center overflow-hidden rounded-lg bg-muted px-4 py-10 sm:p-10">
          
        </div>
      </div>
    </>
  );
}
