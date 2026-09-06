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
    let shiftRange = 320;
    let heroHeight = 800;

    const setupDimensions = () => {
      if (!sectionRef.current || !imgRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      heroHeight = sectionRef.current.offsetHeight || vh;

      // Responsive horizontal shift distance:
      // Mobile (< 640px): 80-110px shift (smooth, natural thumb scroll)
      // Tablet / Desktop: 220-400px shift (cinematic panoramic pan)
      const isMobile = vw < 640;
      shiftRange = isMobile
        ? Math.round(Math.min(vw * 0.26, 110))
        : Math.round(Math.min(vw * 0.22, 400));

      // Container is wider than the viewport by shiftRange + safety margin
      const totalWidth = vw + shiftRange + 60;
      imgRef.current.style.width = `${totalWidth}px`;
      // Start shifted to the left by shiftRange so sliding right never exposes blank space
      imgRef.current.style.left = `-${shiftRange}px`;
      // Generous vertical headroom for subtle 2-axis parallax
      imgRef.current.style.height = '115%';
      imgRef.current.style.top = '-7.5%';
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

      // Smooth easing (easeOutQuad) for organic, fluid movement
      const easeProgress = progress * (2 - progress);

      // Slide from left to right as you scroll down:
      // At scrollY = 0: translateX = 0
      // As user scrolls down: translateX moves towards +shiftRange (panning right)
      const translateX = easeProgress * shiftRange;

      // Subtle vertical depth movement (~10% of scroll progress)
      const translateY = easeProgress * (heroHeight * 0.10);

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
      className="relative min-h-[90vh] sm:min-h-screen overflow-hidden"
    >
      {/* Background Parallax Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          ref={imgRef}
          className="absolute will-change-transform"
          style={{
            width: '135vw',
            left: '-25vw',
            height: '115%',
            top: '-7.5%',
          }}
        >
          <Image
            src={image}
            alt="KUYBIIGST-M Laboratory Wallpaper"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Subtle overlay for optimal text legibility */}
      <div className="absolute inset-0 bg-slate-950/15 backdrop-brightness-95 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[90vh] sm:min-h-screen max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="w-full text-left">
          {children}
        </div>
      </div>
    </section>
  );
}
