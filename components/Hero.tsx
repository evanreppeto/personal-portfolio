"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const roles = ["AI Developer", "Data Scientist", "Automation Developer", "Agent Builder"];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const id = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          75
        );
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setTyping(false), 2000);
      return () => clearTimeout(id);
    } else {
      if (displayed.length > 0) {
        const id = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(id);
      }
      setRoleIndex((i) => (i + 1) % roles.length);
      setTyping(true);
    }
  }, [displayed, typing, roleIndex]);

  return (
    <span className="text-indigo-400 font-semibold">
      {displayed}
      <span className="inline-block w-[2px] h-[0.85em] bg-indigo-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.5,
        a: Math.random() * 0.5 + 0.15,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gentle mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.13 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-pattern">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-950/40 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-slide-up"
          style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
        >
          <span className="text-white">Evan</span>{" "}
          <span className="gradient-text">Reppeto</span>
        </h1>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light mb-4 animate-slide-up"
          style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
        >
          CS Student &amp; <TypewriterRole />
        </p>

        <p
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        >
          CS student, Division II student-athlete, and applied AI developer —
          building LLM-driven automation, ETL pipelines, and intelligent agents
          that solve real business problems.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-slide-up"
          style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}
        >
          <a
            href="#projects"
            className="group w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            View Projects
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 hover:border-indigo-500/60 bg-slate-900/50 hover:bg-slate-800/60 text-slate-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-5 animate-slide-up"
          style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}
        >
          <a
            href="https://github.com/evanreppeto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/evan-reppeto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:evan.reppeto5928@gmail.com"
            aria-label="Email"
            className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-indigo-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </a>
    </section>
  );
}
