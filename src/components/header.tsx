import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="container flex justify-between items-center gap-4 py-3 fixed top-0 inset-x-0 z-50 bg-background/90">
      <Link href="/" className="font-bold">
        Case<span className="text-primary">Cobra</span>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Button asChild variant="ghost">
              <Link href="/signup">Sign up</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
          </li>
          <Separator orientation="vertical" className="h-auto" />
          <li>
            <ThemeToggle />
          </li>
          <Separator orientation="vertical" className="h-auto" />
          <li>
            <Button asChild variant="default">
              <Link href="/create" className="flex gap-2">
                Create case <ArrowRight />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
