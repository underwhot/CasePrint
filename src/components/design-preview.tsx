"use client";

import { Configuration } from "@prisma/client";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import PhoneTemplate from "./phone-template";
import { COLORS, MODELS } from "@/validators/option-validator";
import { Separator } from "./ui/separator";
import { ArrowRight } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/app/(configure)/preview/actions";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import LoginModal from "./login-modal";

type DesignPreviewProps = {
  configuration: Configuration;
  user: any;
  signInUrl: string;
  signUpUrl: string;
};

const HIGHLIGHTS_FEATURES = [
  "Wireless charging compatible",
  "5 year print warranty",
  "High-quality, durable material",
];

export default function DesignPreview({
  configuration,
  user,
  signInUrl,
  signUpUrl,
}: DesignPreviewProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { id } = configuration;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const { color, model, finish, material } = configuration;
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color,
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model,
  )!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrive payment URL");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on the server. Please try again",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (user) {
      createPaymentSession({ configId: id });
    } else {
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

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

      <LoginModal
        isOpen={isLoginModalOpen}
        setIsOpen={setIsLoginModalOpen}
        signInUrl={signInUrl}
        signUpUrl={signUpUrl}
      />

      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="flex flex-auto select-none flex-col items-center justify-center overflow-hidden rounded-lg bg-muted px-4 py-10 sm:p-10">
          <div className="pointer-events-none relative min-h-[488px] w-60 select-none overflow-hidden rounded-[36px]">
            <PhoneTemplate imageSrc={configuration.croppedImageUrl!} bg={tw} />
          </div>
        </div>
        <div className="flex flex-[0_0_300px] flex-col">
          <h2 className="text-xl">Summary</h2>

          <Separator className="my-4" />

          <p className="mb-3">Your {modelLabel} case</p>
          <p className="text-sm text-muted-foreground">
            in stock and ready to ship
          </p>

          <Separator className="my-4" />

          <div>
            <p className="mb-3">
              Material:{" "}
              <span className="capitalize text-muted-foreground">
                {material}
              </span>
            </p>
            <p className="mb-3">
              Finish:{" "}
              <span className="capitalize text-muted-foreground">{finish}</span>
            </p>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="mb-3">Highlights</h3>
            <ul>
              {HIGHLIGHTS_FEATURES.map((feature) => (
                <li key={feature} className="text-sm text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-4" />

          <div className="mb-2 mt-auto flex justify-between gap-2 text-lg">
            <p className="">Total:</p>
            <p className="text-right">{formatPrice(totalPrice / 100)}</p>
          </div>
          <Button onClick={() => handleCheckout()} className="w-full">
            Check out <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
