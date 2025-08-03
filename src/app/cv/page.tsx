"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useTranslations } from "@/hooks/useTranslations";

export default function CVPage() {
  useEscapeKey();
  const t = useTranslations();
  const cvData = t.cv;

  return (
    <div className="min-h-screen bg-background">
      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center space-x-2 text-muted hover:text-foreground transition-colors"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm uppercase tracking-wider">{t.back}</span>
        </Link>
      </motion.div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-2">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 mt-2"
        >
          <h1 className="artistic-heading text-2xl md:text-3xl font-medium mb-0.5">
            {t.mehdiAsadi}
          </h1>
          <p className="text-sm text-muted mb-2">
            {t.designerLine}
          </p>
          <div className="h-px bg-artistic-red w-10" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-lg font-medium mb-3 text-artistic-blue">{cvData.education.title}</h2>
              <div className="space-y-3">
                {cvData.education.items.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="border-l-2 border-border pl-3 pb-2"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium">{edu.degree}</h3>
                      <span className="text-xs text-muted">{edu.year}</span>
                    </div>
                    <p className="text-xs text-muted mb-1">{edu.field}</p>
                    <p className="text-xs text-muted">{edu.institution} — {edu.location}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Exhibitions */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-lg font-medium mb-3 text-artistic-yellow">{cvData.exhibitions.title}</h2>
              <div className="space-y-3">
                {cvData.exhibitions.items.map((exhibition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="border-l-2 border-border pl-3 pb-2"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium">{exhibition.title}</h3>
                      <span className="text-xs text-muted">{exhibition.year}</span>
                    </div>
                    <p className="text-xs text-muted mb-1">{exhibition.venue}</p>
                    <p className="text-xs text-muted">{exhibition.type}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-lg font-medium mb-3 text-artistic-red">{cvData.experience.title}</h2>
              <div className="space-y-3">
                {cvData.experience.items.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="border-l-2 border-border pl-3 pb-2"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium">{exp.role}</h3>
                      <span className="text-xs text-muted">{exp.year}</span>
                    </div>
                    <p className="text-xs text-muted mb-1">{exp.organization} — {exp.location}</p>
                    <p className="text-xs text-muted leading-relaxed">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Awards */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-lg font-medium mb-3 text-artistic-blue">{cvData.awards.title}</h2>
              <div className="space-y-3">
                {cvData.awards.items.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="border-l-2 border-border pl-3 pb-2"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium">{award.title}</h3>
                      <span className="text-xs text-muted">{award.year}</span>
                    </div>
                    <p className="text-xs text-muted">{award.organization}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
