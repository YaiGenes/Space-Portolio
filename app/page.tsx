import Hero from "@/components/main/Hero";
import About from "@/components/main/About";
import Experience from "@/components/main/Experience";
import Skills from "@/components/main/Skills";
import Projects from "@/components/main/Projects";
import SandboxLab from "@/components/main/SandboxLab";
import Contact from "@/components/main/Contact";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <SandboxLab />
        <Contact />
      </div>
    </main>
  );
}
