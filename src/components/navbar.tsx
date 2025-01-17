"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme-toggle";
import { ArrowRight, Menu, X } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";
import { getScrollbarWidth } from "@/lib/utils";

type NavbarProps = {
  signInUrl: string;
  signUpUrl: string;
  user: any;
  handleSignOut: () => Promise<void>;
  isAdmin: boolean;
};

export default function Navbar({
  signInUrl,
  signUpUrl,
  user,
  handleSignOut,
  isAdmin,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const navBtn = useRef(null);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside([navRef, navBtn], handleClickOutside);

  // let scrollBarWidth = 0;
  // useEffect(() => {
  //   scrollBarWidth = getScrollbarWidth();

  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //     // document.body.style.touchAction = "none";
  //     document.body.style.paddingRight = scrollBarWidth + "px";
  //     document.getElementsByTagName("header")[0].style.paddingRight =
  //       scrollBarWidth + "px";
  //   } else {
  //     document.body.style.overflow = "";
  //     document.body.style.paddingRight = "0px";
  //     document.getElementsByTagName("header")[0].style.paddingRight = "0px";
  //   }
  // }, [isOpen]);

  return (
    <>
      <Button
        ref={navBtn}
        variant="ghost"
        onClick={toggleNavbar}
        className="relative z-50 w-9 overflow-hidden sm:hidden"
      >
        <Menu
          className={`absolute transition duration-500 ${isOpen ? "translate-y-[120%]" : ""}`}
        />
        <X
          className={`absolute transition duration-500 ${!isOpen ? "translate-y-[-120%]" : ""}`}
        />
      </Button>

      <nav
        ref={navRef}
        className={`sm:!backdrop-blur-nonesm:!backdrop-blur-none invisible fixed inset-x-0 -top-[100%] z-40 w-full bg-background px-10 pb-14 pt-20 opacity-0 shadow-lg shadow-foreground/20 transition-all duration-500 sm:!visible sm:relative sm:top-0 sm:w-auto sm:!bg-transparent sm:px-0 sm:pb-0 sm:pt-0 sm:!opacity-100 sm:shadow-none ${
          isOpen ? "!visible !top-0 !opacity-100" : ""
        }`}
      >
        <ul className="flex flex-col items-center gap-4 overflow-auto bg-transparent sm:flex-row">
          {!user && (
            <>
              <li>
                <Button asChild variant="ghost">
                  <Link href={signInUrl}>Login</Link>
                </Button>
              </li>

              <li>
                <Button asChild variant="ghost">
                  <Link href={signUpUrl}>Sign up</Link>
                </Button>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <p className="text-sm">
                  {!isAdmin ? (
                    user.email
                  ) : (
                    <Button asChild variant="secondary">
                      <Link href="/dashboard">{user.email}</Link>
                    </Button>
                  )}
                </p>
              </li>
              <li>
                <form action={handleSignOut}>
                  <Button type="submit" variant="ghost">
                    Sign out
                  </Button>
                </form>
              </li>
            </>
          )}

          <Separator orientation="vertical" className="h-auto self-stretch" />

          <li>
            <ThemeToggle />
          </li>

          <Separator orientation="vertical" className="h-auto self-stretch" />

          <li>
            <Button
              asChild
              variant="default"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link href="/upload" className="flex gap-2">
                Create case <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
