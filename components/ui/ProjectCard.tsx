import { Project } from "@/lib/types";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  mode?: "read" | "admin";
}

export const ProjectCard = ({ project, mode = "read" }: ProjectCardProps) => {
  const { title, size, order, images } = project;

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
      )} bg-zinc-800/10 backdrop-blur-md border border-yellow-500/20 rounded-2xl h-60 w-full p-6 shadow-[0_0_30px_rgba(255,215,0,0.1)] transition-all hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] relative`}
    >
      <Image
        src={images[0].url}
        alt={title}
        fill
        className="object-cover rounded-xl"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
      />
      <div className="p-4 absolute bottom-0 left-0 bg-background opacity-90 w-full h-1/2 flex flex-col justify-center gap-3">
        <h3 className="font-montserrat font-semibold mb-2 text-sm sm:text-lg">
          {title}
        </h3>

        {mode === "read" && (
          <div className="flex justify-between items-center">
            <button className="bg-gold-light text-background px-3 py-1 my-2 text-sm rounded-md hover:bg-gold-dark transition-colors">
              Voir le projet
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
