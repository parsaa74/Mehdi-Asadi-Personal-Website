"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import works from '@/data/artistic-works.json';

export function useArrowKeyNavigation(slug: string) {
  const router = useRouter();
  const currentIndex = works.findIndex((w) => w.slug === slug);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % works.length;
        router.push(`/work/${works[nextIndex].slug}`);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + works.length) % works.length;
        router.push(`/work/${works[prevIndex].slug}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, router]);
}