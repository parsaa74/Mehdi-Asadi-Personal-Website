"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorProps {
  isActive?: boolean;
  variant?: 'default' | 'hover' | 'click' | 'text';
}

export default function CustomCursor({ isActive = true, variant = 'default' }: CursorProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, mounted, isActive]);

  if (!mounted || !isActive) return null;

  const getCursorSize = () => {
    switch (variant) {
      case 'hover': return 'w-12 h-12';
      case 'click': return 'w-6 h-6';
      case 'text': return 'w-1 h-6';
      default: return 'w-8 h-8';
    }
  };

  const getCursorStyles = () => {
    switch (variant) {
      case 'hover':
        return 'bg-artistic-red/20 border-2 border-artistic-red/40';
      case 'click':
        return 'bg-artistic-red border border-artistic-red';
      case 'text':
        return 'bg-foreground';
      default:
        return 'bg-foreground/80 backdrop-blur-sm';
    }
  };

  return (
    <motion.div
      className={`
        fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference
        ${getCursorSize()} ${getCursorStyles()}
        ${variant === 'text' ? '' : 'rounded-full'}
        transition-all duration-200 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
    >
      {/* Inner dot for precision */}
      {variant === 'default' && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-background rounded-full"
          style={{ translateX: '-50%', translateY: '-50%' }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Ripple effect for hover state */}
      {variant === 'hover' && (
        <motion.div
          className="absolute inset-0 border border-artistic-red/20 rounded-full"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </motion.div>
  );
}

// Hook for managing cursor variants
export function useCursor() {
  const [variant, setVariant] = useState<CursorProps['variant']>('default');

  const setCursorVariant = (newVariant: CursorProps['variant']) => {
    setVariant(newVariant);
  };

  return { variant, setCursorVariant };
}
