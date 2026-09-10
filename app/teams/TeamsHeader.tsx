'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { withBasePath } from '@/lib/paths';

interface TeamsHeaderProps {
  memberCount: number;
}

export default function TeamsHeader({ memberCount }: TeamsHeaderProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            {t.teams.sectionLabel}
          </p>
          <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
            {t.teams.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
            {t.teams.description}
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700 shadow-2xs"
        >
          {t.teams.backHome}
        </Link>
      </div>

      {/* Featured Principal Investigator Card */}
      <div className="mb-10 rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center text-center md:text-left">
          <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100 shadow-md sm:h-44 sm:w-44 md:mx-0 md:h-48 md:w-48">
            <Image
              src={withBasePath('/img/hasan-demirci.png')}
              alt={t.pi.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 176px, 192px"
            />
          </div>

          <div className="flex-1">
            <div className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-800 border border-red-200/60 mb-2">
              {t.teams.piBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.pi.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
              {t.teams.piSubtitle}
            </p>
            <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700">
              {t.pi.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Section Divider & Team Members Grid Heading */}
      <div className="border-t border-slate-200 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.teams.membersTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.teams.membersSubtitle}
            </p>
          </div>
          <span className="text-xs font-semibold text-red-800 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full w-fit">
            {memberCount} {t.teams.activeMembers}
          </span>
        </div>
      </div>
    </>
  );
}
