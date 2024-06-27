import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

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
    <html lang="en">
    <body className=" max-w-7xl bg-blue-100 mx-auto">
      <main className=" shadow-2xl drop-shadow-2xl">
        <Header />
        {children}
      </main>
    </body>
  </html>
  );
}
