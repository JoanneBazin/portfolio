import { useState } from "react";
import { ProjectImage } from "@/app/types";
import Image from "next/image";

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
    <div className="flex h-2/3 w-full">
      {images?.length > 1 && (
        <>
          <button
            className="h-full w-[5%]"
            onClick={handlePrevImg}
            aria-label="Photo précédente"
          >
            <i className="fa-solid fa-angle-left text-accent lg:text-2xl"></i>
          </button>
        </>
      )}
      {images?.length > 0 && (
        <div className="relative h-full w-[90%]">
          <Image
            src={activeSlide.url}
            alt={activeSlide.alt}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}
      {images?.length > 1 && (
        <button
          className="h-full min-h-32 w-[5%]"
          onClick={handleNextImg}
          aria-label="Photo suivante"
        >
          <i className="fa-solid fa-angle-right text-accent lg:text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default Slideshow;
