import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";

export default function Home() {
  return (
    <main className="lg:mr-20">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
