"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-8 left-8 z-50"
    >
      <Link
        href={href}
        className="group flex items-center space-x-2 text-muted hover:text-foreground transition-colors"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
        <span className="text-sm uppercase tracking-wider">{t.back}</span>
      </Link>
    </motion.div>
  );
}