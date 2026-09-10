'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  image: string;
  children: React.ReactNode;
}

export default function HeroParallax({ image, children }: Props) {
  return (
    <section
      className="relative isolate overflow-hidden bg-slate-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundPosition: 'center 40%',
      }}
    >
      {/* High-fidelity Next.js Image layer for responsive clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
          className="object-cover object-[center_35%] sm:object-[center_40%]"
        />
      </div>

      {/* Elegant dark gradient overlay for text readability & vivid campus contrast */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/35 via-black/20 to-black/45 pointer-events-none" />

      {/* Hero Content - sleek, proportional banner with sufficient height to showcase campus wallpaper */}
      <div className="relative z-10 mx-auto flex min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="w-full text-left">
          {children}
        </div>
      </div>
    </section>
  );
}
