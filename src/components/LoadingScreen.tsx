"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps): React.ReactElement | null {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing spatial canvas...",
    "Loading artistic elements...",
    "Preparing visual experience...",
    "Almost ready..."
  ];

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return Math.min(prev + Math.random() * 12 + 8, 100);
      });
    }, 150);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        >
          <div className="text-center space-y-8 max-w-md mx-auto px-6">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full h-24">
                {["M", "E", "H", "D", "I"].map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.1,
                      ease: "circOut",
                    }}
                    className="type-display-lg absolute"
                    style={{
                      left: `${20 + i * 15}%`,
                      transform: `translateX(-${20 + i * 15}%)`,
                      color: i % 2 === 0 ? "var(--foreground)" : "var(--artistic-red)",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="w-full h-px bg-border">
                <motion.div
                  className="h-full bg-artistic-red origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 right-0 type-caption text-muted"
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="h-6"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="type-body-sm text-muted"
                >
                  {loadingTexts[currentText]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Artistic Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ 
                  opacity: [0, 0.05, 0.02], 
                  scale: [0.8, 1.2, 1], 
                  rotate: [-15, 15, 0] 
                }}
                transition={{ duration: 3, delay: 1 }}
                className="absolute top-1/4 right-1/4 w-64 h-64 bg-artistic-blue rounded-full blur-3xl"
              />
              
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ 
                  opacity: [0, 0.03, 0.01], 
                  x: [-100, 50, 0] 
                }}
                transition={{ duration: 4, delay: 1.5 }}
                className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-artistic-yellow blur-2xl"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing loading state
export function useLoadingScreen(duration: number = 2000) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return { isLoading, setIsLoading };
}
