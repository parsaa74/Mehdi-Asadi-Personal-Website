"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SpatialCanvas from "@/components/SpatialCanvasNew";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // This is a simple fallback for the initial mount, you can style it as you wish
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="type-body text-muted animate-pulse">
          Initializing...
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <div>
        <Navbar />
        <main className="flex flex-col">
          <SpatialCanvas />
        </main>
        <Footer />
      </div>
    </>
  );
}
