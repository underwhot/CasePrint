"use client";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, formatPrice } from "@/lib/utils";
import { Rnd } from "react-rnd";
import { useState } from "react";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { BASE_PRICE } from "@/config/products";

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
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  console.log(options);

  return (
    <div className="flex flex-1 gap-4 flex-col md:flex-row">
      <div className="flex flex-auto select-none flex-col items-center justify-center overflow-hidden rounded-lg bg-muted px-4 py-10 sm:p-10 ">
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
              `bg-${options.color.tw}`,
            )}
          />

          <Rnd
            default={{ x: 50, y: 50, width: width / 4, height: height / 4 }}
            lockAspectRatio
            resizeHandleComponent={{
              bottomRight: <HandleComponent />,
              topLeft: <HandleComponent />,
              topRight: <HandleComponent />,
              bottomLeft: <HandleComponent />,
            }}
            enableResizing={{
              top: false,
              right: false,
              bottom: false,
              left: false,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
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

      <div className="flex-[0_0_300px]">
        <h2 className="text-xl">Customize your case</h2>

        <Separator className="my-4" />

        <fieldset>
          <legend className="mb-3">Color: {options.color.label}</legend>
          <div className="flex gap-3">
            {COLORS.map((color) => (
              <label
                key={color.value}
                htmlFor={color.value}
                className={cn(
                  `cursor-pointer border-[3px] focus:outline-none bg-${color.tw} h-8 w-8 flex-[1_0_2rem] rounded-full`,
                  {
                    "border-primary": color.value === options.color.value,
                  },
                )}
              >
                <input
                  type="radio"
                  name="color"
                  id={color.value}
                  value={color.value}
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                  onChange={() => {
                    setOptions((prev) => ({ ...prev, color }));
                  }}
                />
                {/* <p id="size-choice-0-label">{color.label}</p> */}
              </label>
            ))}
          </div>
        </fieldset>

        <Separator className="my-4" />

        <div className="flex items-center gap-4">
          <legend>Model:</legend>
          <Select
            onValueChange={(val) =>
              setOptions((prev) => ({ ...prev, model: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={options.model.label} />
            </SelectTrigger>
            <SelectContent>
              {MODELS.options.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />

        <fieldset>
          <legend className="mb-3">Material:</legend>
          <div className="space-y-3">
            {MATERIALS.options.map((material) => (
              <label
                key={material.value}
                htmlFor={material.value}
                className={cn(
                  `block cursor-pointer rounded-md border-[3px] px-3 py-2 focus:outline-none`,
                  {
                    "border-primary": material.value === options.material.value,
                  },
                )}
              >
                <input
                  type="radio"
                  name="material"
                  id={material.value}
                  value={material.value}
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                  onChange={() => {
                    setOptions((prev) => ({ ...prev, material }));
                  }}
                />
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p>{material.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {material.description}
                    </p>
                  </div>

                  <p>{formatPrice(material.price / 100)}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <Separator className="my-4" />

        <fieldset>
          <legend className="mb-3">Finish:</legend>
          <div className="space-y-3">
            {FINISHES.options.map((finish) => (
              <label
                key={finish.value}
                htmlFor={finish.value}
                className={cn(
                  `block cursor-pointer rounded-md border-[3px] px-3 py-2 focus:outline-none`,
                  {
                    "border-primary": finish.value === options.finish.value,
                  },
                )}
              >
                <input
                  type="radio"
                  name="finish"
                  id={finish.value}
                  value={finish.value}
                  className="sr-only"
                  aria-labelledby="size-choice-0-label"
                  onChange={() => {
                    setOptions((prev) => ({ ...prev, finish }));
                  }}
                />
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p>{finish.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {finish.description}
                    </p>
                  </div>

                  <p>{formatPrice(finish.price / 100)}</p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <Separator className="my-4" />

        <div className="">
          <div className="mb-2 flex justify-between gap-2 text-lg">
            <p className="">Total:</p>
            <p className="text-right">
              {formatPrice(
                (BASE_PRICE + options.material.price + options.finish.price) /
                  100,
              )}
            </p>
          </div>
          <Button className="w-full">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function HandleComponent() {
  return (
    <div className="h-5 w-5 rounded-full border border-zinc-200 bg-primary shadow transition hover:bg-primary/80" />
  );
}
