import Link from "next/link";

const footerLinks = [
  { title: "Terms", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Cookie Policy", href: "/cookie-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container flex flex-col-reverse items-center justify-between gap-4 border-t py-4 text-sm text-muted-foreground sm:flex-row">
      <p>© {year}. All rights reserved.</p>
      <ul className="flex flex-wrap justify-center gap-4">
        {footerLinks.map((link) => (
          <li key={link.title}>
            <Link href={link.href} className="transition hover:text-foreground">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
