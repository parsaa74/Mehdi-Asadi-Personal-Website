"use client";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle(): JSX.Element {
  const { toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Globe size={20} />
    </button>
  );
}