import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { SideBar } from "@/components/layout/SideBar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joanne Bazin - Développeuse Web",
  description:
    "Portfolio de Joanne Bazin, développeuse web spécialisée dans la création de sites et d'applications web modernes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <SideBar />
        {children}
        <Footer />
        <Script
          src="https://kit.fontawesome.com/704403949e.js"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
