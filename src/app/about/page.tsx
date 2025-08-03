"use client";
import AboutSection from "@/components/AboutSection";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import BackButton from "@/components/BackButton";

export default function AboutPage() {
  useEscapeKey();
  return (
    <main>
      <BackButton href="/" />
      <AboutSection />
    </main>
  );
}