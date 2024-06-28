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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaiandkaro search",
  description: "Gen AI search engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "min-h-screen bg-background antialiased scrollbar-thin scrollbar-thumb-slate-800 scrollbar-thumb-rounded-xl scrollbar-track-rounded-xl",
        fontSans.variable,
        fontMono.variable,
        fontPoppins.variable,
        fontLato.variable,
        fontManrope.className,
        fontCaveat.variable
      )}
    >    
      {children}
    </body>
  </html>
  );
}
