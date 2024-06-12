import Link from "next/link";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="relative z-50 font-bold">
          Case<span className="text-primary">Cobra</span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
