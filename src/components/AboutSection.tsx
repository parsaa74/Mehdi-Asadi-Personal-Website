"use client";

import { useTranslations } from "@/hooks/useTranslations";

export default function AboutSection() {
  const t = useTranslations();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Minimal section indicator */}
        <div className="text-xs font-moderat font-medium tracking-wider text-muted/60 uppercase mb-12">
          {t.about}
        </div>
        <div>
          <p>About me</p>
        </div>
      </div>
    </section>
  );
}
