"use client";

import { AboutCard } from "@/components/ui/AboutCard";
import { Loader } from "@/components/ui/Loader";
import { SkillCard } from "@/components/ui/SkillCard";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { useAbout } from "@/hooks/api/useAbout";
import { useSkills } from "@/hooks/api/useSkills";

export const About = () => {
  const { about, isPending: isAboutPending, error: aboutError } = useAbout();
  const { skills, isPending: isSkillPending, error: skillError } = useSkills();
  return (
    <section
      id="about"
      className="relative min-h-screen w-full snap-start px-8 sm:px-20 pb-32 sm:pb-20 lg:pb-24 pt-10 sm:pt-28 lg:pt-24 lg:pr-56"
    >
      <VerticalLine />
      <h3 className="sr-only">À propos</h3>

      <div className="w-full flex flex-col gap-16">
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
                <p key={i} className="mb-6 about-item">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-5">
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
