'use client';

import { useState } from 'react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnailQuality?: 'maxresdefault' | 'hqdefault' | 'sddefault';
}

export default function YouTubeFacade({
  videoId,
  title,
  className = '',
  thumbnailQuality = 'maxresdefault',
}: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  const thumbnailUrl = thumbError
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  if (isPlaying) {
    return (
      <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 ${className}`}>
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 ${className}`}>
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden border-none bg-slate-950 p-0 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
        aria-label={`Videoyu oynat: ${title}`}
      >
        {/* Video Thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          onError={() => {
            if (!thumbError) setThumbError(true);
          }}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Darkening Overlay */}
        <div className="absolute inset-0 bg-slate-950/25 transition-colors duration-300 group-hover:bg-slate-950/15" />

        {/* Play Button Icon */}
        <div className="relative z-10 flex h-14 w-20 items-center justify-center rounded-2xl bg-red-600 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700 group-active:scale-95">
          <svg
            className="ml-1 h-7 w-7 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Title Overlay */}
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent p-4 opacity-90 transition-opacity duration-300">
          <p className="line-clamp-1 text-xs sm:text-sm font-medium text-white/95">
            {title}
          </p>
        </div>
      </button>
    </div>
  );
}
