"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginModal({
  isOpen,
  setIsOpen,
  signInUrl,
  signUpUrl,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  signInUrl: string;
  signUpUrl: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="z-[999]">
        <DialogHeader>
          <LogIn className="mx-auto mb-2 size-8 sm:mx-0" />
          <DialogTitle className="text-lg">Log in to continue</DialogTitle>
          <DialogDescription className="text-sm">
            Your configuration will be saved.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3">
          <Button asChild variant="secondary" className="w-full">
            <Link href={signInUrl}>Login</Link>
          </Button>

          <Button asChild variant="default" className="w-full">
            <Link href={signUpUrl}>Sign up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
