import React from "react";
import { Button } from "@/components/ui/button";

type NavButtonProps = {
  text: string;
};

export default function NavButton({ text }: NavButtonProps) {
  return (
    <Button
      variant="outline"
      className="bg-inherit rounded-lg px-3 py-3 md:px-4 md:py-4 transition duration-300 ease-in-out translate-x-0 text-transparent hover:scale-105  hover:border-zinc-700"
    >
      <span className="flex items-center justify-center  text-[14px] md:text-[16px] font-bold text-white hover:bg-zinx-100 hover:text-zinc-700">
        {text}
      </span>
    </Button>
  );
}
