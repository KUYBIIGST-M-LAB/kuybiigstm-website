'use client';

import React from 'react';

interface CloudHeroCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function CloudHeroCard({ children, className = '' }: CloudHeroCardProps) {
  return (
    <div className={`relative inline-block w-full max-w-sm sm:max-w-md lg:max-w-xl select-text mt-2 sm:mt-4 ${className}`}>
      {/* Gentle Floating Levitation */}
      <div className="animate-cloud-float">
        <div className="relative flex items-center justify-center">
          {/* Fluffy Cloud Silhouette Layer */}
          <div
            className="absolute -inset-x-10 -top-7 -bottom-6 sm:-inset-x-14 sm:-top-10 sm:-bottom-8 lg:-inset-x-16 lg:-top-12 lg:-bottom-10 pointer-events-none select-none bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/img/fluffy_cloud_vector.webp')",
              backgroundSize: 'contain',
              filter:
                'drop-shadow(0 20px 25px rgba(15, 23, 42, 0.14)) drop-shadow(0 8px 10px rgba(15, 23, 42, 0.07)) drop-shadow(0 0 35px rgba(255, 255, 255, 0.8))',
            }}
            aria-hidden="true"
          />

          {/* Foreground Content Layer - shifted rightward to nest cleanly inside the cloud */}
          <div className="relative z-10 w-full pl-12 pr-4 py-5 sm:pl-16 sm:pr-6 sm:py-7 lg:pl-20 lg:pr-8 lg:py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

