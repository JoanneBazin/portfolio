import { Project } from "@/lib/types";
import Image from "next/image";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { title, images, size, order } = project;

  const getSizeClass = (size: "small" | "medium" | "large") => {
    const classes = {
      small: "sm:col-span-1 sm:row-span-1",
      medium: "sm:col-span-1 sm:row-span-2",
      large: "sm:col-span-1 sm:row-span-3",
    };

    return classes[size] || classes.medium;
  };

  return (
    <article className={`order-${order} ${getSizeClass(size)} relative`}>
      <Image src={images[0]} alt={title} fill className="object-cover" />
      <h3 className="absolute font-montserrat text-center bg-background w-full h-full opacity-40">
        {title}
      </h3>
    </article>
  );
};
