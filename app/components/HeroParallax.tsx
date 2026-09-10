'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  image: string;
  children: React.ReactNode;
}

export default function HeroParallax({ image, children }: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* Static Background Wallpaper */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          quality={65}
          sizes="100vw"
          className="object-cover object-[center_40%] sm:object-[center_45%]"
        />
      </div>

      {/* Elegant dark gradient overlay for text readability & vivid campus contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35 pointer-events-none" />

      {/* Hero Content - sleek, proportional banner without endless scrolling */}
      <div className="relative mx-auto flex max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="w-full text-left">
          {children}
        </div>
      </div>
    </section>
  );
}
