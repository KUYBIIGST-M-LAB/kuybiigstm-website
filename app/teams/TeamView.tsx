'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { parseTeamMembers } from '@/lib/teamParser';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  category?: string;
  order?: number;
  bio: string;
  image: string | null;
  timestamp?: string;
}

interface TeamViewProps {
  members: TeamMember[];
  sheetUrl?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function MemberAvatar({
  image,
  name,
  size = 'md',
}: {
  image: string | null;
  name: string;
  size?: 'md' | 'lg';
}) {
  const [prevImage, setPrevImage] = useState(image);
  const [hasError, setHasError] = useState(false);

  if (prevImage !== image) {
    setPrevImage(image);
    setHasError(false);
  }

  if (image && !hasError) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden ${
          size === 'lg'
            ? 'h-28 w-28 rounded-2xl border-4 border-slate-100 bg-slate-100 shadow-md'
            : 'h-20 w-20 rounded-2xl border-2 border-slate-100 bg-slate-100 shadow-2xs'
        }`}
      >
        <Image
          src={image}
          alt={name}
          fill
          unoptimized={image.startsWith('http')}
          sizes={size === 'lg' ? '112px' : '80px'}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800 font-bold text-white shadow-2xs border-2 border-red-500/20 ${
        size === 'lg' ? 'h-28 w-28 text-2xl shadow-md' : 'h-20 w-20 text-lg'
      }`}
    >
      {getInitials(name)}
    </div>
  );
}

export default function TeamView({ members: initialMembers, sheetUrl }: TeamViewProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  // Client-side live fetch (checks same-origin /api/team first, then direct sheetUrl)
  useEffect(() => {
    const fetchFreshData = async () => {
      try {
        const res = await fetch(`/api/team?_t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const liveMembers = await res.json();
          if (Array.isArray(liveMembers) && liveMembers.length > 0) {
            setMembers(liveMembers);
            return;
          }
        }
      } catch {
        // Fallback for static hosting without API routes
      }

      if (sheetUrl) {
        try {
          const separator = sheetUrl.includes('?') ? '&' : '?';
          const res = await fetch(`${sheetUrl}${separator}_t=${Date.now()}`, { cache: 'no-store' });
          if (res.ok) {
            const csvText = await res.text();
            const knownSlugs = new Set(initialMembers.map((m) => m.id));
            const liveMembers = parseTeamMembers(csvText, knownSlugs);
            if (liveMembers && liveMembers.length > 0) {
              setMembers(liveMembers);
            }
          }
        } catch (err) {
          console.warn('Live Google Sheets fetch failed, using cached team data:', err);
        }
      }
    };

    fetchFreshData();
  }, [sheetUrl, initialMembers]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMember]);

  // Filter and automatically sort everyone in alphabetical order (A-Z)
  const sortedAndFilteredMembers = useMemo(() => {
    let list = members;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter((member) => {
        const matchName = member.name.toLowerCase().includes(q);
        const matchPos = member.position.toLowerCase().includes(q);
        const matchBio = member.bio.toLowerCase().includes(q);
        return matchName || matchPos || matchBio;
      });
    }

    return [...list].sort((a, b) =>
      a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' })
    );
  }, [members, searchQuery]);

  return (
    <div className="mt-8">
      {/* Search & Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold text-slate-800">
            {sortedAndFilteredMembers.length} Members
          </span>
          <span className="text-xs text-slate-400 font-medium">
            (Alphabetical Order A–Z)
          </span>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by name, research or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-8 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs focus:border-red-600 focus:outline-hidden focus:ring-1 focus:ring-red-600"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Members Grid */}
      {sortedAndFilteredMembers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-base font-semibold text-slate-700">
            No team members match &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 inline-flex items-center text-sm font-bold text-red-700 hover:text-red-900 cursor-pointer"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredMembers.map((member) => {
            const hasLongBio = member.bio.length > 150;
            return (
              <article
                key={member.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <MemberAvatar image={member.image} name={member.name} size="md" />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-900">
                        {member.name}
                      </h3>
                      <span className="mt-1 inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-800 border border-red-200/60">
                        {member.position}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-4">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    KUYBIIGST-M
                  </span>
                  {hasLongBio && (
                    <button
                      onClick={() => setActiveMember(member)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700 transition hover:text-red-900 cursor-pointer"
                    >
                      <span>Read Bio</span>
                      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Full Bio Modal */}
      {activeMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setActiveMember(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveMember(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-700 cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left pr-8">
              <MemberAvatar image={activeMember.image} name={activeMember.name} size="lg" />

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {activeMember.name}
                </h2>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-800 border border-red-200">
                    {activeMember.position}
                  </span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Biography & Research Interests
              </h4>
              <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700">
                {activeMember.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
