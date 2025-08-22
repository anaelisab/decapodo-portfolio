import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const pearSoda = localFont({
  src: "../public/fonts/PearSoda.ttf",
  variable: "--font-pear-soda",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Decápodo Game Design - Portfolio",
  description:
    "Portfolio de Álvaro - Diseñador de videojuegos especializado en narrativa y Unity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.className} ${pearSoda.variable}`}>
      <body>{children}</body>
    </html>
  );
}
