"use client";

import { Loader } from "@/components/ui/Loader";
import { useAbout } from "@/hooks/api/useAbout";
import { useSkills } from "@/hooks/api/useSkills";
import Image from "next/image";

export const About = () => {
  const { about, isPending, error } = useAbout();
  const { skills, isPending: isSkillPending, error: skillError } = useSkills();
  return (
    <section
      id="about"
      className="min-h-screen m-10 sm:m-15 lg:m-20 flex flex-col justify-center gap-20"
    >
      <div>
        <h3 className="font-montserrat mb-4">Profil</h3>
        {isPending ? (
          <Loader />
        ) : error ? (
          <p className="text-lg text-medium text-red-900">{error.message}</p>
        ) : (
          <p>{about}</p>
        )}
      </div>
      <div>
        <h3 className="font-montserrat mb-4">Compétences</h3>
        {isSkillPending ? (
          <Loader />
        ) : skillError ? (
          <p className="text-lg text-medium text-red-900">
            {skillError.message}
          </p>
        ) : (
          <div className="text-6xl flex gap-6 flex-wrap">
            {skills.map((skill) => (
              <div key={skill.id}>
                <Image
                  src={skill.logo}
                  width={60}
                  height={60}
                  alt={skill.name}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
