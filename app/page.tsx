import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { NavigationWrapper } from "@/components/layout/navigation/NavigationWrapper";
import { Projects } from "@/sections/Projects";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen w-screen overflow-scroll overflow-x-hidden">
      <NavigationWrapper />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
