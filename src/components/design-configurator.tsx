"use client";

import NextImage from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, formatPrice } from "@/lib/utils";
import { Rnd } from "react-rnd";
import { useRef, useState } from "react";
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
import { ArrowRight, Loader2 } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
  SaveConfigArgs,
  saveConfig as _saveConfig,
} from "@/app/(configure)/design/actions";
import { useRouter } from "next/navigation";

type DesignConfiguratorProps = {
  configId: string;
  imageUrl: string;
  imageDimensions: {
    width: number;
    height: number;
  };
};

function base64ToBlob(base64: string, mime: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mime });
}

export default function DesignConfigurator({
  configId,
  imageUrl,
  imageDimensions,
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
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });
  const [renderedPosition, setRenderedPosition] = useState({
    x: 50,
    y: 50,
  });
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");
  const { toast } = useToast();

  const router = useRouter();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveCunfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Your design could not be saved. Please try again.",
      });
    },
    onSuccess: () => {
      router.push(`/preview?id=${configId}`);
    },
  });

  const totalPrice = formatPrice(
    (BASE_PRICE + options.material.price + options.finish.price) / 100,
  );

  async function saveCunfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width: caseWidth,
        height: caseHeight,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = caseWidth;
      canvas.height = caseHeight;
      const ctx = canvas.getContext("2d")!;

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height,
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "image.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:flex-row">
      <div className="flex flex-auto select-none flex-col items-center justify-center overflow-hidden rounded-lg bg-muted px-4 py-10 sm:p-10">
        <div ref={containerRef} className="relative w-60 select-none">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none z-40 select-none"
          >
            <NextImage
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
            onResizeStop={(_, __, ref, ___, { x, y }) => {
              setRenderedDimensions({
                width: parseInt(ref.style.width.slice(0, -2)),
                height: parseInt(ref.style.height.slice(0, -2)),
              });

              setRenderedPosition({ x, y });
            }}
            onDragStop={(_, data) => {
              const { x, y } = data;
              setRenderedPosition({ x, y });
            }}
            default={{
              x: 50,
              y: 50,
              width: imageDimensions.width / 4,
              height: imageDimensions.height / 4,
            }}
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
              <NextImage
                src={imageUrl}
                alt="User's image"
                width="0"
                height="0"
                sizes="100vw"
                className="pointer-events-none h-auto w-full"
                priority
              />
            </div>
          </Rnd>
        </div>
      </div>

      <div className="flex flex-[0_0_300px] flex-col">
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
              // @ts-ignore
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

        <div className="mt-auto">
          <div className="mb-2 flex justify-between gap-2 text-lg">
            <p className="">Total:</p>
            <p className="text-right">{totalPrice}</p>
          </div>
          <Button
            disabled={isPending}
            onClick={() =>
              saveConfig({
                configId,
                color: options.color.value,
                model: options.model.value,
                material: options.material.value,
                finish: options.finish.value,
              })
            }
            className="w-full"
          >
            Continue{" "}
            {isPending ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
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
