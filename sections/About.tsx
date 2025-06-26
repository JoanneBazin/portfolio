"use client";

import { AboutCard } from "@/components/ui/AboutCard";
import { Loader } from "@/components/ui/Loader";
import { SkillCard } from "@/components/ui/SkillCard";
import { useAbout } from "@/hooks/api/useAbout";
import { useSkills } from "@/hooks/api/useSkills";

export const About = () => {
  const { about, isPending: isAboutPending, error: aboutError } = useAbout();
  const { skills, isPending: isSkillPending, error: skillError } = useSkills();
  return (
    <section
      id="about"
      className="min-h-screen w-full snap-start px-12 pb-28 sm:pb-20 lg:pb-24 pt-10 sm:pt-24 lg:pt-16 pr-0 lg:pr-56 flex items-center justify-center"
    >
      <div className="grid xl:grid-cols-2 gap-12 items-stretch">
        <AboutCard title="Mon parcours">
          {isAboutPending ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : aboutError ? (
            <div className="flex items-center justify-center">
              <p className="text-lg text-red">{aboutError.message}</p>
            </div>
          ) : (
            <div className="space-y-4 leading-relaxed text-base sm:text-lg">
              {about.split("/n").map((line, i) => (
                <p key={i} className="mb-6">
                  {line}
                </p>
              ))}
            </div>
          )}
        </AboutCard>

        <AboutCard title={"Technologies"} reverse={true}>
          {isSkillPending ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : skillError ? (
            <div className="flex items-center justify-center">
              <p className="text-lg text-red">{skillError.message}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </AboutCard>
      </div>
    </section>
  );
};
