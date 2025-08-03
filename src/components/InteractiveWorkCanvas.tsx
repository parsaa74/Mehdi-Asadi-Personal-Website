"use client";
import type p5 from "p5";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { type Sketch, type SketchProps } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import works from "@/data/artistic-works.json";
import { motion, AnimatePresence } from "framer-motion";

interface WorkData {
  slug: string;
  title_en: string;
  title_fa: string;
  description_en: string;
  description_fa: string;
  role_en: string;
  role_fa: string;
  year: string;
  location: string;
  images: string[];
}

interface LoadedWork {
  data: WorkData;
  loadedImages: p5.Image[];
}

class WorkStack {
  p5: p5;
  images: p5.Image[];
  slug: string;
  title: string;
  originalPos: p5.Vector;
  pos: p5.Vector;
  targetPos: p5.Vector;
  angle: p5.Vector;
  targetAngle: p5.Vector;
  isUnfolded: boolean = false;
  imagePositions: p5.Vector[] = [];
  targetImagePositions: p5.Vector[] = [];
  imageScales: number[] = [];
  targetImageScales: number[] = [];
  hoveredImageIndex: number = -1;
  opacity: number = 25;
  targetOpacity: number = 25;
  titleOpacity: number = 0;
  targetTitleOpacity: number = 0;
  scale: number = 1;
  targetScale: number = 1;
  gridScale: number = 1;
  targetGridScale: number = 1;
  setHoveredWorkTitle: (title: string | null) => void;

  constructor(
    p5: p5,
    work: LoadedWork,
    x: number,
    y: number,
    z: number,
    setHoveredWorkTitle: (title: string | null) => void,
    language: 'en' | 'fa'
  ) {
    this.p5 = p5;
    this.images = work.loadedImages;
    this.setHoveredWorkTitle = setHoveredWorkTitle;
    this.slug = work.data.slug;
    this.title = language === 'en' ? work.data.title_en : work.data.title_fa;
    this.originalPos = p5.createVector(x, y, z);
    this.pos = p5.createVector(x, y, z);
    this.targetPos = p5.createVector(x, y, z);
    this.angle = p5.createVector(0, 0, 0);
    this.targetAngle = p5.createVector(0, 0, 0);

    this.images.forEach(() => {
      this.imagePositions.push(p5.createVector(0, 0, 0));
      this.targetImagePositions.push(p5.createVector(0, 0, 0));
      this.imageScales.push(1);
      this.targetImageScales.push(1);
    });
  }

  updateHoveredImage(x: number, y: number) {
    if (!this.isUnfolded) {
      this.hoveredImageIndex = -1;
      return;
    }

    const p5 = this.p5;
    let found = false;

    for (let i = this.images.length - 1; i >= 0; i--) {
      const img = this.images[i];
      const pos = this.imagePositions[i];
      const scale = this.gridScale * this.imageScales[i];

      let planeW = 150 * scale;
      let planeH = 150 * scale;
      const imgAspect = img.width / img.height;
      if (imgAspect > 1) {
        planeH = planeW / imgAspect;
      } else {
        planeW = planeH * imgAspect;
      }

      const worldX = this.pos.x + pos.x;
      const worldY = this.pos.y + pos.y;

      if (
        x > worldX - planeW / 2 &&
        x < worldX + planeW / 2 &&
        y > worldY - planeH / 2 &&
        y < worldY + planeH / 2
      ) {
        this.hoveredImageIndex = i;
        found = true;
        break;
      }
    }

    if (!found) {
      this.hoveredImageIndex = -1;
    }
  }

  handleScroll(delta: number) {
    if (this.hoveredImageIndex !== -1) {
      const zoomFactor = 0.3;
      const scaleChange = delta > 0 ? -zoomFactor : zoomFactor;
      
      const newScale = this.p5.constrain(this.targetImageScales[this.hoveredImageIndex] + scaleChange, 1, 2.5);

      if (newScale !== this.targetImageScales[this.hoveredImageIndex]) {
        this.targetImageScales[this.hoveredImageIndex] = newScale;
        const isZoomed = newScale > 1.01;
        
        for (let i = 0; i < this.images.length; i++) {
          if (i !== this.hoveredImageIndex) {
            this.targetImageScales[i] = isZoomed ? 0.7 : 1.0;
          }
        }
      }
    }
  }

  unfold() {
    this.isUnfolded = true;
    this.targetOpacity = 255;
    this.targetScale = 1;

    const p5 = this.p5;
    const cellSize = 170;
    const imgSize = 150;

    const gridContainerX = p5.width / 4;
    const gridContainerWidth = p5.width / 2;
    const gridContainerHeight = p5.height * 0.9;

    let numCols = Math.floor(gridContainerWidth / cellSize);
    numCols = Math.max(1, numCols);

    const numRows = Math.ceil(this.images.length / numCols);

    const gridW = numCols * cellSize - (cellSize - imgSize);
    const gridH = numRows * cellSize - (cellSize - imgSize);

    let scale = 1;
    if (gridH > gridContainerHeight) {
      scale = gridContainerHeight / gridH;
    }
    this.targetGridScale = scale;

    const startX = gridContainerX - (gridW * scale) / 2;
    const startY = -(gridH * scale) / 2;

    this.images.forEach((img, i) => {
      const col = i % numCols;
      const row = Math.floor(i / numCols);
      const x = startX + col * cellSize * scale;
      const y = startY + row * cellSize * scale;
      this.targetImagePositions[i].set(x, y, 100);
    });
  }

  fold() {
    this.isUnfolded = false;
    this.targetScale = 1;
    this.targetGridScale = 1;
    this.images.forEach((img, i) => {
      this.targetImagePositions[i].set(0, 0, i * 8);
      this.targetImageScales[i] = 1;
    });
  }

  update() {
    const p5 = this.p5;
    this.pos.lerp(this.targetPos, 0.15);
    this.angle.lerp(this.targetAngle, 0.15);
    this.opacity = p5.lerp(this.opacity, this.targetOpacity, 0.15);
    this.titleOpacity = p5.lerp(this.titleOpacity, this.targetTitleOpacity, 0.15);
    this.scale = p5.lerp(this.scale, this.targetScale, 0.15);
    this.gridScale = p5.lerp(this.gridScale, this.targetGridScale, 0.15);

    this.imagePositions.forEach((pos, i) => {
      pos.lerp(this.targetImagePositions[i], 0.15);
    });

    this.imageScales.forEach((scale, i) => {
      this.imageScales[i] = p5.lerp(scale, this.targetImageScales[i], 0.18);
    });
  }

  display() {
    const p5 = this.p5;
    p5.push();
    p5.translate(this.pos.x, this.pos.y, this.pos.z);
    p5.scale(this.scale);
    p5.rotateX(this.angle.x);
    p5.rotateY(this.angle.y);

    const imgSize = 150;

    this.images.forEach((img, index) => {
      let planeW = imgSize;
      let planeH = imgSize;
      const imgAspect = img.width / img.height;
      if (imgAspect > 1) {
        planeH = planeW / imgAspect;
      } else {
        planeW = planeH * imgAspect;
      }

      p5.push();
      const pos = this.imagePositions[index];
      p5.translate(pos.x, pos.y, pos.z);
      p5.scale(this.gridScale * this.imageScales[index]);
      p5.noStroke();
      p5.tint(255, this.opacity);
      p5.texture(img);
      p5.plane(planeW, planeH);
      p5.pop();
    });

    p5.pop();
  }

  isClicked(x: number, y: number): boolean {
    return (
      !this.isUnfolded &&
      x > this.pos.x - 150 && x < this.pos.x + 150 &&
      y > this.pos.y - 200 && y < this.pos.y + 200
    );
  }

  isHovered(x: number, y: number): boolean {
    return (
      !this.isUnfolded &&
      x > this.pos.x - 150 && x < this.pos.x + 150 &&
      y > this.pos.y - 200 && y < this.pos.y + 200
    );
  }
}

const sketch: Sketch = (p5) => {
  let loadedWorks: LoadedWork[] = [];
  let workStacks: WorkStack[] = [];
  let centralUnfoldPosition: p5.Vector;
  let setSelectedWork: (work: WorkData | null) => void = () => {};
  let setHoveredWorkTitle: (title: string | null) => void = () => {};
  let currentSelectedWork: WorkData | null = null;
  let theme = 'dark';
  let language: 'en' | 'fa' = 'en';

  interface CustomSketchProps extends SketchProps {
    setSelectedWork: (work: WorkData | null) => void;
    selectedWork: WorkData | null;
    setHoveredWorkTitle: (title: string | null) => void;
    theme?: string;
    language?: 'en' | 'fa';
  }

  p5.updateWithProps = (props: SketchProps) => {
    const customProps = props as CustomSketchProps;
    if (customProps.setSelectedWork) {
      setSelectedWork = customProps.setSelectedWork;
    }
    if (customProps.setHoveredWorkTitle) {
      setHoveredWorkTitle = customProps.setHoveredWorkTitle;
    }
    if (customProps.theme) {
      theme = customProps.theme;
    }
    if (customProps.language && customProps.language !== language) {
      language = customProps.language;
      workStacks.forEach(stack => {
        const workData = loadedWorks.find(w => w.data.slug === stack.slug)?.data;
        if (workData) {
          stack.title = language === 'en' ? workData.title_en : workData.title_fa;
        }
      });
    }
    if (customProps.selectedWork !== currentSelectedWork) {
      currentSelectedWork = customProps.selectedWork;
      if (currentSelectedWork) {
        const selectedStack = workStacks.find(ws => ws.slug === currentSelectedWork?.slug);
        workStacks.forEach(ws => {
          if (ws === selectedStack) {
            ws.targetPos.set(centralUnfoldPosition);
            ws.unfold();
          } else {
            ws.targetPos.set(ws.originalPos);
            ws.fold();
            ws.targetOpacity = 25;
            ws.targetScale = 0.8;
          }
        });
      } else {
        workStacks.forEach(ws => {
          ws.targetPos.set(ws.originalPos);
          ws.fold();
          ws.targetOpacity = 25;
          ws.targetScale = 1;
        });
      }
    }
  };

  p5.preload = () => {
    for (const work of works) {
      const loadedImages = work.images.map(src => p5.loadImage(src));
      loadedWorks.push({ data: work as WorkData, loadedImages });
    }
  };

  const gheynStack = workStacks.find(ws => ws.slug === "gheyn-jack-jimmy-david-performance");
  if (gheynStack) {
    centralUnfoldPosition = gheynStack.originalPos.copy();
  } else {
    centralUnfoldPosition = p5.createVector(0, 0, 0);
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    const gridCols = 4;
    const gridSpacing = 280;
    
    loadedWorks.forEach((work, index) => {
      const col = index % gridCols;
      const row = Math.floor(index / gridCols);
      const x = (col - (gridCols - 1) / 2) * gridSpacing;
      const y = (row - Math.floor((loadedWorks.length -1) / gridCols) / 2) * gridSpacing * 1.5;
      const stack = new WorkStack(p5, work, x, y, 0, setHoveredWorkTitle, language);
      stack.fold();
      workStacks.push(stack);
    });
  };

  p5.draw = () => {
    p5.background(theme === 'dark' ? [15, 15, 15] : [240, 240, 240]);

    if (currentSelectedWork) {
      p5.ortho(-p5.width / 2, p5.width / 2, -p5.height / 2, p5.height / 2, 0, 2000);
      p5.camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
    } else {
      const fov = p5.PI / 3.0;
      const camZ = (p5.height / 2.0) / p5.tan(fov / 2.0);
      p5.perspective(fov, p5.width / p5.height, camZ * 0.01, camZ * 10);

      const camX = p5.map(p5.mouseX, 0, p5.width, -150, 150);
      const camY = p5.map(p5.mouseY, 0, p5.height, -150, 150);
      p5.camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

    }

    const mouseX = p5.mouseX - p5.width / 2;
    const mouseY = p5.mouseY - p5.height / 2;
    let anyHovered = false;

    workStacks.forEach(stack => {
      if (currentSelectedWork === null) {
        if (stack.isHovered(mouseX, mouseY)) {
          anyHovered = true;
          setHoveredWorkTitle(stack.title);
          stack.targetAngle.y = p5.map(mouseX - stack.pos.x, -150, 150, -p5.PI / 24, p5.PI / 24);
          stack.targetAngle.x = p5.map(mouseY - stack.pos.y, -200, 200, p5.PI / 24, -p5.PI / 24);
          stack.targetOpacity = 255;
        } else {
          stack.targetAngle.set(0, 0, 0);
          stack.targetOpacity = 25;
        }
      } else {
        stack.targetAngle.set(0, 0, 0);
      }
      
      if (stack.isUnfolded) {
        stack.updateHoveredImage(mouseX, mouseY);
      }

      stack.update();
      stack.display();
    });

    if (!anyHovered) {
      setHoveredWorkTitle(null);
    }
  };

  p5.mouseClicked = () => {
    if (currentSelectedWork) {
      setSelectedWork(null);
      return;
    }
    const mouseX = p5.mouseX - p5.width / 2;
    const mouseY = p5.mouseY - p5.height / 2;
    
    for (const stack of workStacks) {
      if (stack.isClicked(mouseX, mouseY)) {
        setSelectedWork(loadedWorks.find(w => w.data.slug === stack.slug)?.data || null);
        break;
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.mouseWheel = (event: WheelEvent) => {
    const selectedStack = workStacks.find(ws => ws.slug === currentSelectedWork?.slug);
    if (selectedStack && selectedStack.isUnfolded) {
      selectedStack.handleScroll(event.deltaY);
    }
  };
};

export default function InteractiveWorkCanvas() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [selectedWork, setSelectedWork] = useState<WorkData | null>(null);
  const [hoveredWorkTitle, setHoveredWorkTitle] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh',
          zIndex: 10,
          cursor: selectedWork ? 'zoom-out' : 'grab'
        }}
        className={selectedWork ? 'backdrop-blur-sm' : ''}
      >
        <NextReactP5Wrapper
          sketch={sketch}
          selectedWork={selectedWork}
          setSelectedWork={setSelectedWork}
          setHoveredWorkTitle={setHoveredWorkTitle}
          theme={theme}
          language={language}
        />
      </div>
     <AnimatePresence>
       {(hoveredWorkTitle || selectedWork) && (
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.3 }}
           className={`absolute top-32 z-20 font-moderat text-2xl ${selectedWork ? 'left-16 text-left w-2/5' : 'left-1/2 -translate-x-1/2'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}
           style={{
             fontWeight: selectedWork ? 'bold' : 'normal',
           }}
         >
           {selectedWork ? (language === 'en' ? selectedWork.title_en : selectedWork.title_fa) : hoveredWorkTitle}
         </motion.div>
       )}
     </AnimatePresence>
     <AnimatePresence>
       {selectedWork && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="absolute top-48 left-16 z-20 w-2/5 font-moderat"
         >
           <div className="max-w-lg text-left">
             <p className={`text-base ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
               {language === 'en' ? selectedWork.description_en : selectedWork.description_fa}
             </p>
           </div>
         </motion.div>
       )}
     </AnimatePresence>
    <AnimatePresence>
      {selectedWork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 font-moderat text-sm ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}
        >
          {language === 'en' ? 'Scroll on images to magnify' : 'برای بزرگنمایی روی تصاویر اسکرول کنید'}
        </motion.div>
      )}
    </AnimatePresence>
   </>
 );
}