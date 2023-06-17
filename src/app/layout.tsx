import { Providers } from "@/lib/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/TailwindIndicator";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Rust & TS Median Cut Benchmarking",
  description: "Rust & TS Median Cut Benchmarking",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("bg-background antialiased", inter.className)}>
          <Providers>
            <main className="relative flex min-h-screen flex-col items-center justify-between p-6 sm:p-12 md:p-24">
              {children}
              <div className="absolute right-6 top-6 sm:right-12 sm:top-12">
                <ThemeToggle />
              </div>
            </main>
            <Toaster />
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
