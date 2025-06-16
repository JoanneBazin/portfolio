import { Project } from "@/lib/types";
import Image from "next/image";
import { Tag } from "./Tag";
import { Button } from "./Button";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { title, images, tech, githubUrl, size, order } = project;

  const getSizeClass = (size: "small" | "medium" | "large") => {
    const classes = {
      small: "sm:col-span-1 sm:row-span-1",
      medium: "sm:col-span-1 sm:row-span-2",
      large: "sm:col-span-1 sm:row-span-3",
    };

    return classes[size] || classes.small;
  };

  return (
    <article
      className={`order-${order} ${getSizeClass(
        size
      )} rounded-lg border border-dark-gray w-full h-full relative`}
    >
      <div className="absolute w-full h-full bg-background opacity-40 z-60"></div>
      <div className="w-full h-full relative">
        <Image src={images[0]} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4 absolute bottom-0 left-0 bg-background opacity-90 w-full flex flex-col gap-3">
        <h3 className="font-montserrat font-semibold mb-2 text-lg">{title}</h3>
        <div>
          {tech?.map((item, index) => (
            <Tag key={index} item={item} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Button text="Voir le projet" />
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-gold-dark transition-colors duration-200"
          >
            <i className="fa-brands fa-github text-2xl"></i>
          </a>
        </div>
      </div>
    </article>
  );
};
