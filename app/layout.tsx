import type { Metadata } from "next";
import { Sora, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "JACKET JUNCTION | Elite Motorbike Couture",
  description: "The epitome of premium motorcycle gear. Artisanal craftsmanship meets peak protection. Discover the Jacket Junction collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${playfair.variable} dark`}>
      <body className="antialiased selection:bg-accent selection:text-white" suppressHydrationWarning>
        <Preloader />
        {children}
        <Footer />
      </body>
    </html>
  );
}

