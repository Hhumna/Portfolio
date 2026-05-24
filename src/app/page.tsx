import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { CreativePortfolio } from "@/components/sections/creative-portfolio";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CreativePortfolio />
      <Contact />
    </main>
  );
}
