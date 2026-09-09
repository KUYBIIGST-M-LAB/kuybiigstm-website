'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-lg font-bold text-white">KUYBIIGST-M</p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {t.footer.address}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            <a href="mailto:vpri@ku.edu.tr" className="hover:text-white">vpri@ku.edu.tr</a> | Tel: +90 212 338 10 00
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
            {t.footer.quickLinks}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/#research" className="hover:text-white">{t.nav.research}</Link>
            <Link href="/#publications" className="hover:text-white">{t.nav.publications}</Link>
            <Link href="/teams" className="hover:text-white">{t.nav.team}</Link>
            <Link href="/#collaborators" className="hover:text-white">{t.nav.collaborators}</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {t.footer.copyright}
      </div>
    </footer>
  );
}
