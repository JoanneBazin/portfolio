import { Project } from "@/lib/types";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

export const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
  const { title, images } = project;

  return (
    <article
      className={`bg-zinc-800/10 backdrop-blur-md border border-yellow-500/20 rounded-2xl h-60 w-full p-6 shadow-[0_0_30px_rgba(255,215,0,0.1)] transition-all hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] relative`}
    >
      <Image
        src={images[0].url}
        alt={title}
        fill
        className="object-cover rounded-xl"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
      />

      <button
        onClick={() => onEdit(project)}
        aria-label="Modifier ou supprimer le projet"
        className="p-4 absolute bottom-0 left-0 bg-background opacity-90 w-full h-1/2"
      >
        <h3 className="font-montserrat sm:font-medium text-sm sm:text-base">
          {title}
        </h3>
      </button>
    </article>
  );
};
