import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

import Header from "@/components/header";
import Footer from "@/components/footer";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Case Shop",
  description: "Printful Case Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col overflow-y-scroll`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className="flex flex-1 flex-col">
            <Providers>{children}</Providers>
          </main>

          <Toaster />

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
