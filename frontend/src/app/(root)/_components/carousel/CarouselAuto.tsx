import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/carousel/slide-1.png",
  "/carousel/slide-2.png",
  "/carousel/slide-3.png",
  "/carousel/slide-4.png",
];

export default function CarouselAuto() {
  return (
    <Carousel className="w-[1000px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="rounded-xl">
                {
                  <img
                    className="w-full h-[500px] object-cover  rounded-xl"
                    src={image}
                    alt="Loading"
                  />
                }
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
