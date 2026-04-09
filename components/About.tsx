"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GraduationCap, Cpu, Lightbulb, Trophy } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Ohio Dominican University",
    description:
      "Completing a BS in Computer Science with a double minor in Data Science and Mathematics — on an accelerated three-year track, graduating May 2026 with a 3.97 GPA. Honors Program, Dean's List three years running.",
    accent: "text-indigo-400",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
  },
  {
    icon: Trophy,
    title: "NCAA Division II Athlete",
    description:
      "Selected to the All-Conference Academic Team three consecutive years while competing in NCAA Division II Men's Soccer — balancing 20+ hours per week of training and travel with advanced CS coursework.",
    accent: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
  },
  {
    icon: Cpu,
    title: "AI Systems Builder",
    description:
      "Built Python-based data pipelines, LLM-driven automation, and ETL workflows for a restoration company client — integrating APIs, webhooks, and BI reporting into production systems.",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
  },
  {
    icon: Lightbulb,
    title: "Full-Stack Problem Solver",
    description:
      "From capstone AI research systems to a live SaaS platform (BSR Manager) and client-facing automation — I build end-to-end, not just prototypes.",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
];

const stats = [
  { value: "3.97", label: "GPA" },
  { value: "D-II", label: "NCAA Student-Athlete" },
  { value: "3 Yrs", label: "Accelerated Graduation" },
  { value: "LLMs", label: "Agents & Automation" },
];

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

export default function About() {
  const { ref, inView } = useInView();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Who I Am
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </div>

        {/* Intro: photo + paragraph */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8 mb-12">
          {/* Headshot */}
          <div className="flex-shrink-0">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full ring-2 ring-indigo-500/40 ring-offset-4 ring-offset-[#0a0f1e] overflow-hidden shadow-xl shadow-indigo-900/30">
              <Image
                src="/evan.jpg"
                alt="Evan Reppeto"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Paragraph */}
          <p className="text-slate-300 text-lg leading-relaxed text-center sm:text-left">
            I&apos;m a Computer Science student at{" "}
            <span className="text-white font-medium">
              Ohio Dominican University
            </span>{" "}
            — graduating May 2026 with a double minor in Data Science and
            Mathematics.{" "}
            <span className="text-indigo-400 font-medium">
              Applied Data Scientist
            </span>{" "}
            by contract,{" "}
            <span className="text-violet-400 font-medium">NCAA Division II athlete</span>
            , and{" "}
            <span className="text-cyan-400 font-medium">LLM automation developer</span>
            . I build systems that don&apos;t just process data — they reason,
            act, and deliver results.
          </p>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-4 py-5 rounded-2xl border border-slate-800 bg-slate-900/40 transition-all duration-500 ${
                statsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-black gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`card-shine rounded-2xl border ${item.border} ${item.bg} p-6 transition-all duration-500 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${item.bg} border ${item.border}`}
                >
                  <Icon size={18} className={item.accent} />
                </div>
                <h3 className={`font-semibold text-base mb-2 ${item.accent}`}>
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
