'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { withBasePath } from '@/lib/paths';
import { useEmbed } from './EmbedManager';

export default function Navbar() {
  const { isEmbed } = useEmbed();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  if (isEmbed) {
    return null;
  }

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.research, href: '/#research' },
    { label: t.nav.publications, href: '/#publications' },
    { label: t.nav.team, href: '/teams' },
    { label: t.nav.collaborators, href: '/#collaborators' },
  ];

  // Track scroll position for dynamic background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-red-950/40 bg-red-950/98 shadow-md backdrop-blur-md'
          : 'border-red-950/20 bg-red-950/90 backdrop-blur-xs'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-xs transition group-hover:scale-105">
            <Image
              src={withBasePath('/img/logo.webp')}
              alt=""
              aria-hidden="true"
              width={56}
              height={56}
              quality={60}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white transition group-hover:text-red-100">
              KUYBIIGST-M
            </span>
            <span
              className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-red-200"
            >
              {t.nav.structuralBioLab}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation & Language Switcher */}
        <div className="hidden items-center gap-2 lg:gap-3 md:flex">
          <nav className="flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isTeamsPage = item.href === '/teams' && pathname === '/teams';
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    isTeamsPage
                      ? 'bg-red-800 text-white shadow-xs'
                      : 'text-red-100 hover:bg-red-900/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="ml-2 flex items-center rounded-full border border-red-800/80 bg-red-900/60 p-0.5 text-xs font-bold text-white shadow-inner">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-full px-2.5 py-1 transition ${
                lang === 'en'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-red-200 hover:text-white'
              }`}
              aria-label="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('tr')}
              className={`rounded-full px-2.5 py-1 transition ${
                lang === 'tr'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-red-200 hover:text-white'
              }`}
              aria-label="Türkçe"
            >
              TR
            </button>
          </div>
        </div>

        {/* Mobile Header Right: Lang Switcher & Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Quick Lang Switcher */}
          <div className="flex items-center rounded-full border border-red-800/80 bg-red-900/60 p-0.5 text-[11px] font-bold text-white">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-full px-2 py-0.5 transition ${
                lang === 'en'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-red-200'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('tr')}
              className={`rounded-full px-2 py-0.5 transition ${
                lang === 'tr'
                  ? 'bg-white text-red-950 shadow-xs'
                  : 'text-red-200'
              }`}
            >
              TR
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-red-900/60 text-white transition hover:bg-red-900 focus:outline-hidden focus:ring-2 focus:ring-red-400"
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
              <span
                className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[65px] sm:top-[73px] z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex max-h-[calc(100vh-75px)] flex-col overflow-y-auto border-b border-red-900 bg-red-950 p-5 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isTeamsPage = item.href === '/teams' && pathname === '/teams';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition ${
                      isTeamsPage
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'text-red-100 hover:bg-red-900/70 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-red-400 text-sm">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="mt-6 pt-5 border-t border-red-900/70 flex flex-col gap-3">
              <a
                href="mailto:vpri@ku.edu.tr"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-semibold text-red-100 transition hover:bg-white/20"
              >
                <span>✉ {t.nav.contact}</span>
              </a>
              <p className="text-center text-[11px] text-red-300">
                {t.nav.campus}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
