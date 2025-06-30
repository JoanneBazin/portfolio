"use client";

import Image from "next/image";
import { Skill } from "@/types";

export const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <div
      className="backdrop-blur-md rounded-2xl shadow-[0_0_10px_rgba(255,215,0,0.1)] flex flex-col items-center justify-center pb-2 sm:pb-4"
      data-testid="skill-item"
    >
      <div className="relative w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20">
        <Image
          src={skill.logo}
          fill
          sizes="(max-width: 640px) 32px, (max-width: 1024px) 48px, 64px"
          alt={`Logo ${skill.name}`}
          className="object-contain px-2 sm:px-4"
        />
      </div>
      <p className="text-xs lg:text-sm">{skill.name}</p>
    </div>
  );
};
