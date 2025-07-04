"use client";

import { AboutCard } from "@/components/ui/AboutCard";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
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
      className="relative min-h-screen w-full snap-start px-5 sm:px-20 pb-32 sm:pb-20 lg:pb-24 pt-10 sm:pt-28 lg:pt-24 lg:pr-56"
    >
      <VerticalLine />
      <h3 className="sr-only">À propos</h3>

      <div className="w-full lg:w-[90%] flex flex-col gap-16">
        <AboutCard title="Développeuse web passionnée par la création d'interfaces modernes et accessibles">
          <a
            href="https://fr.linkedin.com/in/joanne-bazin?trk=people-guest_people_search-card"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-5 sm:hidden text-accent-50 hover:text-accent transition-colors duration-200"
            aria-label="Voir mon profil LinkedIn"
            data-testid="footer-linkedin-link"
          >
            <LinkedinIcon />
          </a>
          {isAboutPending ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : aboutError ? (
            <div className="flex items-center justify-center">
              <p className="text-red">{aboutError.message}</p>
            </div>
          ) : (
            <div className="space-y-4 leading-relaxed text-sm lg:text-base">
              {about.split("/n").map((line, i) => (
                <p key={i} className="mb-6" data-testid="about-item">
                  {line}
                </p>
              ))}
            </div>
          )}
        </AboutCard>

        <AboutCard title={"Technologies"}>
          <a
            href="https://github.com/JoanneBazin"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 sm:hidden text-accent-50 hover:text-accent transition-colors duration-200"
            aria-label="Visiter ma page Github"
            data-testid="footer-github-link"
          >
            <GithubIcon />
          </a>
          {isSkillPending ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : skillError ? (
            <div className="flex items-center justify-center">
              <p className="text-red">{skillError.message}</p>
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
