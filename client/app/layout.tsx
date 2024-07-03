import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {
  fontMono,
  fontSans,
  fontPoppins,
  fontLato,
  fontManrope,
  fontCaveat,
} from "@/lib/fonts"
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/logo-dark-mode.svg"
  },
  title: "Kaiandkaro search",
  description: "Gen AI search engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "min-h-screen bg-gray-800 text-white antialiased scrollbar-thin scrollbar-thumb-slate-800 scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl",
        fontSans.variable,
        fontMono.variable,
        fontPoppins.variable,
        fontLato.variable,
        fontManrope.className,
        fontCaveat.variable
      )}
    >  
      {children}
      <Toaster  />
    </body>
  </html>
  </ClerkProvider>
  );
}
