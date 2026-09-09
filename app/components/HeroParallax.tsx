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
    let shiftRange = 40;
    let heroHeight = 700;

    const setupDimensions = () => {
      if (!sectionRef.current || !imgRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      heroHeight = sectionRef.current.offsetHeight || vh;

      // Subtle horizontal shift distance:
      // Mobile (< 640px): 15-20px shift
      // Tablet / Desktop: 35-50px shift
      const isMobile = vw < 640;
      shiftRange = isMobile
        ? Math.round(Math.min(vw * 0.04, 20))
        : Math.round(Math.min(vw * 0.035, 50));

      // Container is only slightly wider than viewport by shiftRange + small buffer
      // This avoids excessive zooming and keeps the panoramic campus and sea visible
      const totalWidth = vw + shiftRange + 24;
      imgRef.current.style.width = `${totalWidth}px`;
      imgRef.current.style.left = `-${shiftRange}px`;
      imgRef.current.style.height = '106%';
      imgRef.current.style.top = '-1.5%';
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

      // Subtle horizontal shift
      const translateX = easeProgress * shiftRange;

      // Very subtle vertical depth movement (~2.5% of hero height, approx 18-22px)
      const translateY = easeProgress * (heroHeight * 0.025);

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
          className="absolute will-change-transform"
          style={{
            width: '105vw',
            left: '-2.5vw',
            height: '106%',
            top: '-1.5%',
          }}
        >
          <Image
            src={image}
            alt="Koç University Campus with Black Sea View"
            fill
            priority
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
