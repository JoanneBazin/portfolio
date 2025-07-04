import { useState } from "react";
import { ProjectImage } from "@/types";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slideshow = ({ images }: { images: ProjectImage[] }) => {
  const [activeSlide, setActiveSlide] = useState(images[0]);
  const imgCount = images.length;
  const imgIndex = images.indexOf(activeSlide);

  const handleNextImg = () => {
    const nextIndex = (imgIndex + 1) % imgCount;

    setActiveSlide(images[nextIndex]);
  };
  const handlePrevImg = () => {
    const nextIndex = (imgIndex - 1 + imgCount) % imgCount;

    setActiveSlide(images[nextIndex]);
  };

  return (
    <div className="flex h-44 sm:h-56 w-full">
      {images?.length > 1 && (
        <>
          <button
            className="h-full w-[10%] flex items-center justify-center pr-2"
            onClick={handlePrevImg}
            aria-label="Photo précédente"
          >
            <ChevronLeft
              className="flex-shrink-0"
              color="var(--accent)"
              size={30}
            />
          </button>
        </>
      )}
      {images?.length > 0 && (
        <div className="relative h-full w-[80%]">
          <Image
            src={activeSlide.url}
            alt={activeSlide.alt}
            fill
            sizes="(max-width: 640px) 76.5vw, 67.5vw"
            className="object-contain rounded-xl"
          />
        </div>
      )}
      {images?.length > 1 && (
        <button
          className="h-full min-h-32 w-[10%] flex items-center justify-center pl-2"
          onClick={handleNextImg}
          aria-label="Photo suivante"
        >
          <ChevronRight
            className="flex-shrink-0"
            color="var(--accent)"
            size={30}
          />
        </button>
      )}
    </div>
  );
};

export default Slideshow;
