"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    handle: "github.com/evanreppeto",
    href: "https://github.com/evanreppeto",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/evan-reppeto",
    href: "https://linkedin.com/in/evan-reppeto",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "evan.reppeto5928@gmail.com",
    href: "mailto:evan.reppeto5928@gmail.com",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      // Note: "success" here means the API accepted the form.
      // Wire up Resend in app/api/contact/route.ts so messages actually arrive.
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-slate-900/40 relative">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Get In Touch
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          <p className="mt-6 text-slate-400 text-base max-w-md mx-auto">
            Whether you have an opportunity, a question, or just want to connect
            — my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-slate-300 text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-slate-300 text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity or project..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} />
                  Message received! I&apos;ll be in touch soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Socials sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-start lg:pt-0 pt-2">
            <p className="text-slate-400 text-sm mb-2">
              Prefer to reach out directly? Find me on:
            </p>
            {socials.map(({ icon: Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="card-shine group flex items-center gap-4 p-4 rounded-xl border border-slate-800 hover:border-indigo-500/40 bg-slate-900/50 hover:bg-slate-800/60 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-slate-500 text-xs">{handle}</p>
                </div>
              </a>
            ))}

            <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-slate-900/30">
              <p className="text-slate-400 text-xs leading-relaxed">
                <span className="text-slate-300 font-medium">Based in Columbus, OH</span>
                <br />
                Open to remote and hybrid roles nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
