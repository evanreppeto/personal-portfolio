import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evan Reppeto — CS Student & AI Developer",
  description:
    "Personal portfolio of Evan Reppeto, a Computer Science student at Ohio Dominican University specializing in AI development and software engineering.",
  keywords: ["Evan Reppeto", "portfolio", "AI developer", "computer science", "software engineer"],
  authors: [{ name: "Evan Reppeto" }],
  openGraph: {
    title: "Evan Reppeto — CS Student & AI Developer",
    description:
      "Personal portfolio of Evan Reppeto, a Computer Science student at Ohio Dominican University specializing in AI development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0f1e] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
