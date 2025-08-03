"use client";
import type p5 from "p5";
import React, { useEffect, useState, useRef } from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

// The entire sketch is defined outside the component to create a single, persistent instance.
const sketch: Sketch = (p5) => {
  let particles: Particle[] = [];
  const poemText_en = "POETRY IS BREATH\nGIVEN FORM";
  const poemText_fa = "شعر نفس است\nدر قالب فرم";
  let poemText = poemText_en;

  let font: p5.Font | null = null;
  let font_fa: p5.Font | null = null;
  let fontLoaded = false;
  
  // This colors object is part of the persistent sketch scope.
  let colors: { text: [number, number, number]; background: [number, number, number, number] } = {
    text: [255, 255, 255], // Default color
    background: [0, 0, 0, 0]
  };
  
  let currentTheme: string | undefined = undefined;
  let currentLanguage: string | undefined = 'en';

  class Particle {
    pos: p5.Vector;
    originalPos: p5.Vector;
    vel: p5.Vector;
    acc: p5.Vector;
    char: string;
    size: number;
    alpha: number;
    flowInfluence: number;
    randomOffset: number;
    isBreathParticle: boolean;
    
    constructor(x: number, y: number, z: number, char: string, size: number, isBreathParticle: boolean = false) {
      this.pos = p5.createVector(x, y, z);
      this.originalPos = p5.createVector(x, y, z);
      this.vel = p5.createVector(p5.random(-0.3, 0.3), p5.random(-0.3, 0.3), p5.random(-0.3, 0.3));
      this.acc = p5.createVector();
      this.char = char;
      this.size = size;
      this.alpha = p5.random(180, 255);
      this.flowInfluence = p5.random(0.6, 1.0);
      this.randomOffset = p5.random(p5.TWO_PI);
      this.isBreathParticle = isBreathParticle;
    }

    update(mouseX: number, mouseY: number, mouseActive: boolean) {
      if (mouseActive) {
        const mousePos = p5.createVector(mouseX - p5.width / 2, mouseY - p5.height / 2, 0);
        const dir = this.pos.copy().sub(mousePos);
        const d = dir.mag();
        
        if (d < 150) {
          dir.normalize();
          
          const flowStrength = p5.map(d, 0, 150, 0.4, 0.05);
          const flowDir = p5.createVector(-dir.y, dir.x, 0).normalize().mult(flowStrength * 0.5);
          
          const repelStrength = p5.map(d, 0, 150, 0.15, 0.02);
          const repelDir = dir.copy().mult(repelStrength);
          
          this.applyForce(flowDir);
          this.applyForce(repelDir);
        }
      }
      
      const returnStrength = this.isBreathParticle ? 0.003 : 0.008;
      const dir = this.originalPos.copy().sub(this.pos);
      const d = dir.mag();
      
      if (d > 0) {
        const strength = p5.map(d, 0, 200, returnStrength * 1.5, returnStrength);
        dir.setMag(strength);
        this.applyForce(dir);
      }
      
      this.vel.add(this.acc);
      this.vel.limit(this.isBreathParticle ? 1.2 : 1.8);
      this.pos.add(this.vel);
      this.acc.mult(0);
      
      if (this.isBreathParticle) {
        this.pos.x += p5.sin(p5.frameCount * 0.015 + this.randomOffset) * 0.6;
        this.pos.y += p5.cos(p5.frameCount * 0.012 + this.randomOffset) * 0.4;
        this.pos.z += p5.cos(p5.frameCount * 0.01 + this.randomOffset) * 0.3;
      } else {
        this.pos.x += p5.sin(p5.frameCount * 0.007 + this.randomOffset) * 0.2;
        this.pos.y += p5.cos(p5.frameCount * 0.005 + this.randomOffset) * 0.1;
        this.pos.z += p5.sin(p5.frameCount * 0.006 + this.randomOffset) * 0.15;
      }
    }

    applyForce(force: p5.Vector) {
      this.acc.add(force);
    }

    show() {
      p5.push();
      p5.fill(colors.text[0], colors.text[1], colors.text[2], this.alpha);
      p5.noStroke();
      
      const scaleFactor = p5.map(this.pos.z, -100, 100, 0.8, 1.2);
      p5.textSize(this.size * scaleFactor);
      p5.textAlign(p5.CENTER, p5.CENTER);
      
      p5.translate(this.pos.x, this.pos.y, this.pos.z);
      
      const rotation = this.isBreathParticle
        ? p5.sin(p5.frameCount * 0.005 + this.randomOffset) * 0.2
        : p5.sin(p5.frameCount * 0.002 + this.randomOffset) * 0.05;
      
      p5.rotate(rotation);
      
      p5.text(this.char, 0, 0);
      p5.pop();
    }
  }

  const setupParticles = () => {
    particles = [];
    if (!fontLoaded || !font) {
      createFallbackParticles();
      return;
    }
    try {
      const currentFont = currentLanguage === 'fa' ? font_fa : font;
      if (!currentFont) {
        createFallbackParticles();
        return;
      }
      p5.textFont(currentFont);
      p5.textSize(72);
      p5.textAlign(p5.CENTER, p5.CENTER);
      const lines = poemText.split('\n');
      const totalChars = poemText.replace(/\s/g, '').length;
      const radius = Math.min(p5.width, p5.height) * 0.28;
      let charIndex = 0;
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        for (let i = 0; i < line.length; i++) {
          if (line[i] === ' ') continue;
          const angle = p5.map(charIndex, 0, totalChars - 1, 0, p5.TWO_PI);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = p5.random(-100, 100);
          let size = 72;
          const isKeyWord = ['BREATH', 'FORM'].some(word => poemText.includes(word) && charIndex > poemText.indexOf(word));
          if (isKeyWord) size = 76;
          size *= p5.random(0.97, 1.03);
          particles.push(new Particle(x, y, z, line[i], size));
          charIndex++;
        }
      }
      for (let i = 0; i < 40; i++) {
        const angle = p5.random(p5.TWO_PI);
        const r = radius * 0.7 + p5.random(radius * 0.2);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        const z = p5.random(-120, 120);
        particles.push(new Particle(x, y, z, p5.random() > 0.5 ? "•" : "·", p5.random(12, 24), true));
      }
    } catch (e) {
      console.error("Typography setup failed", e);
      createFallbackParticles();
    }
  };

  const createFallbackParticles = () => {
    particles = [];
    const shapes = ["P", "O", "E", "T", "R", "Y", "•", "·", "I", "S", "B", "R", "E", "A", "T", "H", "F", "O", "R", "M"];
    const radius = Math.min(p5.width, p5.height) * 0.25;
    for (let i = 0; i < 50; i++) {
      const angle = p5.map(i, 0, 50, 0, p5.TWO_PI);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = p5.random(-100, 100);
      particles.push(new Particle(x, y, z, shapes[i % shapes.length], p5.random(18, 32)));
      if (i % 5 === 0) {
        const x2 = x + p5.random(-30, 30);
        const y2 = y + p5.random(-30, 30);
        const z2 = z + p5.random(-30, 30);
        particles.push(new Particle(x2, y2, z2, p5.random() > 0.7 ? "•" : "·", p5.random(10, 20), true));
      }
    }
  };

  // This is the sole communication channel from React to p5.
  p5.updateWithProps = (props: { theme?: string, language?: string }) => {
    if (props.theme && props.theme !== currentTheme) {
      currentTheme = props.theme;
      // Mutating the colors object here updates the running sketch.
      if (props.theme === 'dark') {
        colors.text = [255, 255, 255];
      } else {
        colors.text = [30, 30, 30];
      }
    }
    if (props.language && props.language !== currentLanguage) {
      currentLanguage = props.language;
      poemText = currentLanguage === 'fa' ? poemText_fa : poemText_en;
      setupParticles();
    }
  };

  p5.preload = () => {
    try {
      font = p5.loadFont('/fonts/Moderat-Regular.otf');
      font_fa = p5.loadFont('/fonts/Vazirmatn-Regular.ttf');
    } catch (e) {
      console.error("Font loading failed", e);
      fontLoaded = false;
    }
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.colorMode(p5.RGB, 255);
    const currentFont = currentLanguage === 'fa' ? font_fa : font;
    if (currentFont && typeof (currentFont as any).textToPoints === 'function') {
      fontLoaded = true;
    }
    p5.clear();
    setTimeout(() => {
      setupParticles();
    }, 100);
  };

  p5.draw = () => {
    p5.background(colors.background[0], colors.background[1], colors.background[2], 0);
    p5.clear();
    
    const fov = p5.PI / 4.0;
    const cameraZ = (p5.height / 2.0) / p5.tan(fov / 2.0);
    p5.perspective(fov, p5.width / p5.height, cameraZ * 0.01, cameraZ * 10);
    
    const camX = p5.map(p5.mouseX, 0, p5.width, -100, 100);
    const camY = p5.map(p5.mouseY, 0, p5.height, -100, 100);
    p5.camera(camX, camY, cameraZ, 0, 0, 0, 0, 1, 0);
    
    const mouseActive = p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height;
    
    for (let i = 0; i < particles.length; i++) {
      try {
        particles[i].update(p5.mouseX, p5.mouseY, mouseActive);
        particles[i].show();
      } catch (e) {
        console.error("Particle rendering failed", e);
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    setupParticles();
  };
};

export default function ConcretePoetry() {
  const { resolvedTheme } = useTheme();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        willChange: 'transform, opacity'
      }}
    >
      <NextReactP5Wrapper
        sketch={sketch}
        theme={resolvedTheme}
        language={language}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}