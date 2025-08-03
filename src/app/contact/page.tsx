"use client";

import { useEscapeKey } from "@/hooks/useEscapeKey";
import ContactSection from "@/components/ContactSection";
import BackButton from "@/components/BackButton";

export default function ContactPage() {
  useEscapeKey();
  return (
    <main>
      <BackButton href="/" />
      <ContactSection />
    </main>
  );
}