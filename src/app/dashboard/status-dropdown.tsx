"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { changeOrderStatus } from "./actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

export default function StatusDropdown({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex w-full items-center justify-between gap-3"
        >
          {LABEL_MAP[orderStatus]} <ChevronsUpDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(LABEL_MAP).map(([key, value]) =>
          orderStatus !== key ? (
            <DropdownMenuItem
              key={key}
              onClick={() => mutate({ id, newStatus: key as OrderStatus })}
            >
              {value}
            </DropdownMenuItem>
          ) : null,
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
