import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CallToActionProps = {
  text: string;
  className?: string;
};

export default function CallToAction({ text, className }: CallToActionProps) {
  return (
    <Link href="/chat">
      <Button
        variant="outline"
        className={`rounded-xl px-6 py-6 transition duration-300 ease-in-out translate-x-0  hover:scale-105 text-xl font-extrabold ${className}`}
      >
        {text}
      </Button>
    </Link>
  );
}
