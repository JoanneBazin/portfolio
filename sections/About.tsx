"use client";

import { useAbout } from "@/hooks/api/useAbout";
import { useSkills } from "@/hooks/api/useSkills";
import Image from "next/image";

export const About = () => {
  const { about } = useAbout();
  const { skills } = useSkills();
  return (
    <section
      id="about"
      className="min-h-screen m-10 sm:m-15 lg:m-20 flex flex-col justify-center gap-20"
    >
      <div>
        <h3 className="font-montserrat">Profil</h3>
        <p>{about}</p>
      </div>
      <div>
        <h3 className="font-montserrat">Compétences</h3>
        <div className="text-6xl flex gap-6 flex-wrap justify-center">
          {skills.map((skill) => (
            <div key={skill.id}>
              <Image src={skill.logo} width={60} height={60} alt={skill.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
