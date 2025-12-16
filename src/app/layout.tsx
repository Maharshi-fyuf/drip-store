import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import CartDrawer from "@/components/Cart/CartDrawer";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/Layout/SmoothScroll";
import Marquee from "@/components/Vibe/Marquee";
import CustomCursor from "@/components/Vibe/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DRIP | Secure the Hype",
  description: "Next-gen streetwear and tech. Exclusive drops only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-black text-neutral-200`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Marquee />
          <Navbar />
          {children}
          <CartDrawer />
          <Toaster position="bottom-right" theme="dark" toastOptions={{
            style: { background: '#050505', border: '1px solid #CCFF00', color: '#fff' }
          }} />
        </SmoothScroll>
      </body>
    </html>
  );
}
