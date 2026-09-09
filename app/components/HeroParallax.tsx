"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
  image: string;
  children: React.ReactNode;
}

export default function HeroParallax({ image, children }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check for user preference for reduced motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      if (imgRef.current) {
        imgRef.current.style.transform = 'none';
      }
      return;
    }

    let ticking = false;
    let shiftRange = 35;
    let heroHeight = 700;

    const setupDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      heroHeight = vh * 0.85;

      // Subtle horizontal shift distance:
      // Mobile (< 640px): 12-16px shift
      // Tablet / Desktop: 30-40px shift
      const isMobile = vw < 640;
      shiftRange = isMobile
        ? Math.round(Math.min(vw * 0.035, 16))
        : Math.round(Math.min(vw * 0.03, 40));
    };

    const updateParallax = () => {
      if (!imgRef.current) {
        ticking = false;
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset || 0;

      // Progress from 0 (at the top of the page) to 1 (when hero section leaves view)
      const rawProgress = heroHeight > 0 ? scrollY / heroHeight : 0;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Smooth easing (easeOutQuad) for organic, gentle movement
      const easeProgress = progress * (2 - progress);

      // Subtle horizontal shift (GPU accelerated transform only - no layout reflow)
      const translateX = easeProgress * shiftRange;

      // Very subtle vertical depth movement (~2% of hero height)
      const translateY = easeProgress * (heroHeight * 0.02);

      imgRef.current.style.transform = `translate3d(${translateX.toFixed(1)}px, ${translateY.toFixed(1)}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    const onResize = () => {
      setupDimensions();
      onScroll();
    };

    setupDimensions();
    updateParallax();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[72vh] sm:min-h-[80vh] lg:min-h-[86vh] overflow-hidden"
    >
      {/* Background Parallax Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          ref={imgRef}
          className="absolute -inset-x-8 -inset-y-4 will-change-transform"
        >
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="object-cover object-[center_42%] sm:object-[center_46%] md:object-[center_48%]"
          />
        </div>
      </div>

      {/* Subtle gradient overlay to ensure text contrast while keeping the sea and campus vivid */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Hero Content - positioned top-left */}
      <div className="relative mx-auto flex min-h-[72vh] sm:min-h-[80vh] lg:min-h-[86vh] max-w-7xl items-start px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-14 pb-12">
        <div className="w-full text-left">
          {children}
        </div>
      </div>
    </section>
  );
}
