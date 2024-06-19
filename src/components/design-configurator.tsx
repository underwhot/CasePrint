"use client";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";

type DesignConfiguratorProps = {
  configId?: string;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
};

export default function DesignConfigurator({
  configId,
  imageUrl,
  imageDimensions: { width, height },
}: DesignConfiguratorProps) {
  return (
    <div className="flex w-full select-none flex-col items-center justify-center overflow-hidden rounded-lg bg-muted p-4 sm:p-10">
      <div className="relative w-60 select-none">
        <AspectRatio
          ratio={896 / 1831}
          className="pointer-events-none z-40 select-none"
        >
          <Image
            src="/case-template.png"
            alt="Phone template"
            className="pointer-events-none z-40 select-none"
            priority
            width={896}
            height={1831}
          />
        </AspectRatio>
        <div className="pointer-events-none absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 select-none rounded-[34px] shadow-[0_0_0_99999px] shadow-muted/90" />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bottom-px left-[3px] right-[3px] top-px select-none rounded-[34px]",
            `bg-slate-500`,
          )}
        />

        <Rnd
          default={{ x: 50, y: 50, width: width / 4, height: height / 4 }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
          }}
          enableResizing={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <div className="relative z-40 h-full w-full">
            <Image
              src={imageUrl}
              alt="User's image"
              fill
              className="pointer-events-none"
              priority
            />
          </div>
        </Rnd>
      </div>
    </div>
  );
}

function HandleComponent() {
  return (
    <div className="h-5 w-5 rounded-full border border-zinc-200 bg-white shadow transition hover:bg-primary" />
  );
}
