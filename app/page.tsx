import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
// import { Projects } from "@/sections/Projects";
import { NavigationWrapper } from "@/components/layout/navigation/NavigationWrapper";
import { ProjectsDisplay } from "@/sections/ProjectsDisplay";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-scroll">
      <NavigationWrapper />
      <Hero />
      <ProjectsDisplay />
      {/* <Projects /> */}
      <About />
      <Contact />
    </main>
  );
}
