import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>
          © {new Date().getFullYear()} Evan Reppeto — AI Developer &amp; CS Student.
          Built with Next.js &amp; Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
