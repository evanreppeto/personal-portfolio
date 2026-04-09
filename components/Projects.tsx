"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, FlaskConical, LayoutDashboard, Bot } from "lucide-react";

const projects = [
  {
    icon: FlaskConical,
    label: "Capstone — AI Research",
    title: "Autonomous AI Scientist",
    description:
      "An LLM-powered autonomous research system capable of generating hypotheses, designing experiments, and iterating on results without human oversight. Built to demonstrate the full agentic loop: plan → act → observe → reflect.",
    tags: ["Autonomous Agents", "LLM", "Python", "Research"],
    accent: "indigo",
    link: null, // Add your GitHub link here: "https://github.com/evanreppeto/..."
  },
  {
    icon: LayoutDashboard,
    label: "Full-Stack SaaS",
    title: "BSR Manager",
    description:
      "A production SaaS project management platform powering real client workflows. Built end-to-end with Next.js — from database design to deployment — giving teams a clean, fast interface for planning and delivery.",
    tags: ["Next.js", "TypeScript", "Full-Stack", "SaaS"],
    accent: "violet",
    link: "https://bigshouldersmanager.com",
  },
  {
    icon: Bot,
    label: "AI Business Automation",
    title: "Restoration Claims AI Agent",
    description:
      "A deployed LLM agent that fully automates client-facing operations for a restoration company — handling intake, claim tracking, scheduling, and communication. Reduced manual overhead and improved response time.",
    tags: ["AI Agent", "LLM", "Automation", "Business Ops"],
    accent: "cyan",
    link: null,
  },
];

const accentMap: Record<string, {
  border: string;
  glow: string;
  icon: string;
  badge: string;
  tag: string;
  gradient: string;
  link: string;
}> = {
  indigo: {
    border: "border-indigo-500/20 hover:border-indigo-500/50",
    glow: "hover:shadow-indigo-500/10",
    icon: "text-indigo-400 bg-indigo-500/10",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    tag: "bg-indigo-500/10 text-indigo-300",
    gradient: "from-indigo-500/10 via-transparent",
    link: "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-400/50",
  },
  violet: {
    border: "border-violet-500/20 hover:border-violet-500/50",
    glow: "hover:shadow-violet-500/10",
    icon: "text-violet-400 bg-violet-500/10",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    tag: "bg-violet-500/10 text-violet-300",
    gradient: "from-violet-500/10 via-transparent",
    link: "text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 border-violet-500/30 hover:border-violet-400/50",
  },
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    glow: "hover:shadow-cyan-500/10",
    icon: "text-cyan-400 bg-cyan-500/10",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    tag: "bg-cyan-500/10 text-cyan-300",
    gradient: "from-cyan-500/10 via-transparent",
    link: "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-400/50",
  },
};

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What I&apos;ve Built
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, i) => {
            const Icon = project.icon;
            const accent = accentMap[project.accent];
            return (
              <div
                key={project.title}
                className={`card-shine relative rounded-2xl border ${accent.border} bg-slate-900/70 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl ${accent.glow} ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Gradient top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${accent.gradient} to-transparent`}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${accent.icon}`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-medium ${accent.badge}`}
                    >
                      {project.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-3 leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${accent.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 ${accent.link}`}
                    >
                      View Live <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg border border-slate-700/50 text-slate-500 text-xs font-semibold cursor-default">
                      Available on Request
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
