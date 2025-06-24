import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { NavigationWrapper } from "@/components/layout/navigation/NavigationWrapper";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-scroll pr-0 lg:pr-44 sm:pt-24 lg:pt-0 ">
      <NavigationWrapper />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
