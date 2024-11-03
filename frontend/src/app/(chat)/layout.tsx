import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../../app/globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/header/navbar/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Study Buddy",
  description: "Chat With Your Study Material Effortlessly",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen overflow-hidden bg-background bg-zinc-900 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
