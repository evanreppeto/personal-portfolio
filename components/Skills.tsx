"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Brain, Wrench } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages & Core",
    accent: "indigo",
    skills: [
      "Python",
      "JavaScript",
      "C++",
      "Java",
      "R",
      "SQL",
      "MATLAB",
    ],
  },
  {
    icon: Brain,
    title: "AI & Data",
    accent: "violet",
    skills: [
      "LLM Integration",
      "Autonomous Agents",
      "Machine Learning",
      "ETL Pipelines",
      "Data Analysis",
      "Business Intelligence",
      "Data Visualization",
    ],
  },
  {
    icon: Wrench,
    title: "Tools & Frameworks",
    accent: "cyan",
    skills: [
      "Git",
      "REST APIs & Webhooks",
      "Microsoft SQL Server",
      "Next.js / React",
      "Tableau",
      "OOP",
    ],
  },
];

const accentMap: Record<
  string,
  { pill: string; icon: string; border: string; glow: string }
> = {
  indigo: {
    pill: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-400/40",
    icon: "text-indigo-400 bg-indigo-500/10",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    glow: "hover:shadow-indigo-500/10",
  },
  violet: {
    pill: "bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-400/40",
    icon: "text-violet-400 bg-violet-500/10",
    border: "border-violet-500/20 hover:border-violet-500/40",
    glow: "hover:shadow-violet-500/10",
  },
  cyan: {
    pill: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/40",
    icon: "text-cyan-400 bg-cyan-500/10",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    glow: "hover:shadow-cyan-500/10",
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="py-24 sm:py-32 bg-slate-900/40 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What I Work With
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          <p className="mt-5 text-slate-400 text-sm max-w-xl mx-auto">
            My stack is built around AI-first development — from training and
            prompting LLMs to deploying full-stack applications.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            const accent = accentMap[category.accent];
            return (
              <div
                key={category.title}
                className={`card-shine rounded-2xl border ${accent.border} bg-slate-900/60 p-7 transition-all duration-500 hover:shadow-xl ${accent.glow} ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${accent.icon}`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-white font-semibold text-base mb-5">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all duration-200 cursor-default ${accent.pill}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
