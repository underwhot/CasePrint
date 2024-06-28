"use client";

import { getPaymentStatus } from "@/app/thank-you/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Separator } from "./ui/separator";
import PhonePreview from "./phone-preview";
import { formatPrice } from "@/lib/utils";

export default function ThankYou() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus(orderId),
    retry: true,
    retryDelay: 1000,
  });

  if (data === undefined) return <Loading />;
  if (data === false) return <Verifying />;

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  return (
    <div className="container space-y-4 py-4">
      <div>
        <h2 className="text-primary">Thank you!</h2>
        <p className="text-lg">Your case is on the way!</p>
        <p className="text-muted-foreground">
          We've received your order and are now processing it.
        </p>
      </div>

      <Separator />

      <div>
        <p>
          Order ID: <span className="text-primary">{orderId}</span>
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg">You made a great choice!</h3>
        <p className="text-muted-foreground">
          We at CasePrint believe that a phone case doesn't only need to look
          good, but also last you for the years to come. We offer a 5-year print
          guarantee: If you case isn't of the highest quality, we'll replace it
          for free.
        </p>
      </div>

      <Separator />

      <PhonePreview
        croppedImageUrl={configuration.croppedImageUrl!}
        color={color!}
      />

      <Separator />

      <div className="-mx-3 flex flex-col flex-wrap min-[500px]:flex-row [&>*]:flex-[1_1_50%] [&>*]:px-3 [&>*]:py-1.5">
        <div>
          <h4 className="mb-2">Shipping address:</h4>
          <address className="text-sm not-italic text-muted-foreground">
            <span className="block">{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</span>
            <span className="block">{shippingAddress?.street}</span>
            <span className="block">
              {shippingAddress?.postalCode} {shippingAddress?.city}
            </span>
          </address>
        </div>
        <div>
          <h4 className="mb-2">Billing address:</h4>
          <address className="text-sm not-italic text-muted-foreground">
            <span className="block">{`${billingAddress?.firstName} ${billingAddress?.lastName}`}</span>
            <span className="block">{billingAddress?.street}</span>
            <span className="block">
              {billingAddress?.postalCode} {billingAddress?.city}
            </span>
          </address>
        </div>
      </div>

      <Separator />

      <div className="-mx-3 flex flex-col flex-wrap min-[500px]:flex-row [&>*]:flex-[1_1_50%] [&>*]:px-3 [&>*]:py-1.5">
        <div>
          <h4 className="mb-2">Payment status:</h4>
          <div className="text-sm not-italic text-muted-foreground">
            <p>Paid</p>
          </div>
        </div>
        <div>
          <h4 className="mb-2">Shipping Method:</h4>
          <div className="text-sm not-italic text-muted-foreground">
            <p>DHL, takes up to 3 working days</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="mx-auto max-w-[500px] space-y-3 rounded-lg bg-muted p-5">
        <div className="flex justify-between">
          <h4>Subtotal:</h4>
          <p>{formatPrice(amount)}</p>
        </div>
        <div className="flex justify-between">
          <h4>Shipping:</h4>
          <p>{formatPrice(0)}</p>
        </div>

        <Separator className="bg-primary"/>
        <div className="flex justify-between">
          <h4 className="text-lg">Total:</h4>
          <p className="text-lg">{formatPrice(amount)}</p>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
      <Loader2 className="size-8 animate-spin text-primary" />
      <h2 className="text-lg">Loading your order...</h2>
      <p className="text-muted-foreground">Please wait</p>
    </div>
  );
}

function Verifying() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
      <Loader2 className="size-8 animate-spin text-primary" />
      <h2 className="text-lg">Verifying your payment...</h2>
      <p className="text-muted-foreground">This might take a moment</p>
    </div>
  );
}
