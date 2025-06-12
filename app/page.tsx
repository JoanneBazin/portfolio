import { About } from "@/sections/About";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
    </main>
  );
}
