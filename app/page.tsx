import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { NavigationWrapper } from "@/components/layout/navigation/NavigationWrapper";

export default function Home() {
  return (
    <main className="lg:mr-20">
      <NavigationWrapper />
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
