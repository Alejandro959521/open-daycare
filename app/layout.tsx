import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenDayCare · Sala Soles",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
