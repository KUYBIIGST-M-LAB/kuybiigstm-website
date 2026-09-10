'use client';

import React, { useState, useMemo } from 'react';
import publicationsRaw from '../../data/publications.json';
import { useLanguage } from '@/lib/i18n';
import { withBasePath } from '@/lib/paths';

export interface FigureItem {
  label?: string;
  caption?: string;
  url?: string;
}

export interface TableItem {
  label?: string;
  caption?: string;
  headers?: string[];
  rows?: string[][];
  pmcid?: string;
}

export interface Publication {
  id: string;
  pmid?: string;
  pmcid?: string;
  doi?: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  abstract: string;
  isOpenAccess: boolean;
  pubmedUrl: string;
  doiUrl: string;
  pmcUrl?: string;
  figures: FigureItem[];
  tables: TableItem[];
}

const publications = publicationsRaw as Publication[];

type SortOption = 'newest' | 'oldest' | 'title';

export default function PublicationsSection() {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [modalFigure, setModalFigure] = useState<{ url: string; caption?: string; title?: string } | null>(null);

  // Extract unique years sorted descending and count per year
  const { availableYears, yearCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    publications.forEach((p) => {
      if (p.year) {
        counts[p.year] = (counts[p.year] || 0) + 1;
      }
    });
    const years = Object.keys(counts).sort((a, b) => parseInt(b) - parseInt(a));
    return { availableYears: years, yearCounts: counts };
  }, []);

  // Filter & sort publications
  const filteredAndSortedPublications = useMemo(() => {
    const filtered = publications.filter((pub) => {
      const matchesYear = selectedYear === 'ALL' || pub.year === selectedYear;
      if (!matchesYear) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q) ||
        pub.pmid?.includes(q) ||
        pub.doi?.toLowerCase().includes(q) ||
        pub.year?.includes(q)
      );
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return parseInt(b.year || '0') - parseInt(a.year || '0');
      }
      if (sortBy === 'oldest') {
        return parseInt(a.year || '0') - parseInt(b.year || '0');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, selectedYear, sortBy]);

  // Reset to page 1 whenever filters change
  const [prevFilterKey, setPrevFilterKey] = useState('');
  const currentFilterKey = `${searchQuery}|${selectedYear}|${sortBy}|${pageSize}`;
  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setCurrentPage(1);
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedPublications.length / pageSize) || 1;
  const paginatedPublications = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedPublications.slice(start, start + pageSize);
  }, [filteredAndSortedPublications, currentPage, pageSize]);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredAndSortedPublications.length);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // Smooth scroll to publications header
    const section = document.getElementById('publications');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper to bold Hasan Demirci in author list
  const formatAuthors = (authorsStr: string) => {
    if (!authorsStr) return '';
    const parts = authorsStr.split(/(Demirci\s+H[a-z]*|DeMirci\s+H[a-z]*)/gi);
    return parts.map((part, i) => {
      if (/demirci/i.test(part)) {
        return (
          <span key={i} className="font-bold text-red-700 underline decoration-red-300 underline-offset-2">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Helper for generating pagination buttons list (with ellipsis)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <section id="publications" className="mt-12 sm:mt-16 scroll-mt-24 px-3 sm:px-6 lg:px-8 min-w-0 max-w-full">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              {t.publications.sectionLabel}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 lg:text-4xl">
              {t.publications.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
              {t.publications.description}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-2.5 shadow-sm">
            <span className="text-2xl font-black text-red-800">{publications.length}</span>
            <div className="text-xs font-semibold leading-tight text-red-900">
              {t.publications.totalArticles}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              aria-label={t.publications.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.publications.searchPlaceholder}
              className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-500 shadow-xs transition focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Controls: Year selector & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Year Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="year-select" className="text-xs font-bold text-slate-700">
                {lang === 'tr' ? 'Yıl:' : 'Year:'}
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition hover:border-slate-300 focus:border-red-600 focus:outline-none"
              >
                <option value="ALL">{t.publications.allYears} ({publications.length})</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year} ({yearCounts[year]})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="text-xs font-bold text-slate-700">
                {t.publications.sortBy}:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition hover:border-slate-300 focus:border-red-600 focus:outline-none"
              >
                <option value="newest">{t.publications.sortNewest}</option>
                <option value="oldest">{t.publications.sortOldest}</option>
                <option value="title">{t.publications.sortTitle}</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="page-size-select" className="text-xs font-bold text-slate-700">
                {t.publications.perPage}:
              </label>
              <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs transition hover:border-slate-300 focus:border-red-600 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Year Badges (Top 6 most recent) */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedYear('ALL')}
            className={`rounded-full px-3 py-1 text-xs font-bold transition ${
              selectedYear === 'ALL'
                ? 'bg-red-700 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {t.publications.allYears}
          </button>
          {availableYears.slice(0, 6).map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                selectedYear === year
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {year} <span className={`ml-1 text-[10px] font-semibold ${selectedYear === year ? 'text-red-100' : 'text-slate-600'}`}>({yearCounts[year]})</span>
            </button>
          ))}
        </div>

        {/* Results Counter summary */}
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-600">
          <span>
            {lang === 'tr' ? (
              <>
                Toplam <strong className="text-slate-800">{filteredAndSortedPublications.length}</strong> yayından{' '}
                <strong className="text-slate-800">{filteredAndSortedPublications.length > 0 ? `${startIndex}–${endIndex}` : 0}</strong> arası gösteriliyor
              </>
            ) : (
              <>
                {t.publications.showing}{' '}
                <strong className="text-slate-800">{filteredAndSortedPublications.length > 0 ? `${startIndex}–${endIndex}` : 0}</strong>{' '}
                {t.publications.of}{' '}
                <strong className="text-slate-800">{filteredAndSortedPublications.length}</strong>{' '}
                {t.publications.title.toLowerCase()}
              </>
            )}
            {selectedYear !== 'ALL' && ` (${selectedYear})`}
            {searchQuery && ` "${searchQuery}"`}
          </span>
          {(searchQuery || selectedYear !== 'ALL' || sortBy !== 'newest') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('ALL');
                setSortBy('newest');
              }}
              className="text-xs font-semibold text-red-700 hover:underline"
            >
              {t.publications.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Publications List */}
      <div className="mt-8 space-y-6">
        {paginatedPublications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-bold text-slate-700">{t.publications.noResults}</p>
            <p className="mt-1 text-sm text-slate-600">{t.publications.noResultsSub}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('ALL');
                setSortBy('newest');
              }}
              className="mt-4 inline-flex items-center rounded-full bg-red-700 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600"
            >
              {t.publications.resetFilters}
            </button>
          </div>
        ) : (
          paginatedPublications.map((pub, index) => {
            const isAbstractExpanded = !!expandedAbstracts[pub.id];
            const hasFigures = pub.figures && pub.figures.length > 0;
            const hasTables = pub.tables && pub.tables.length > 0;

            return (
              <article
                key={pub.id || index}
                className="group relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs transition hover:border-slate-300 hover:shadow-md min-w-0 max-w-full overflow-hidden"
              >
                {/* Meta info tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {pub.year && (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-100">
                      {pub.year}
                    </span>
                  )}
                  {pub.isOpenAccess && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t.publications.openAccess}
                    </span>
                  )}
                  {hasFigures && (
                    <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 border border-sky-100">
                      {pub.figures.length} {lang === 'tr' ? 'Şekil' : 'Figures'}
                    </span>
                  )}
                  {hasTables && (
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-100">
                      {pub.tables.length} {lang === 'tr' ? 'Tablo' : 'Tables'}
                    </span>
                  )}
                </div>

                {/* Article Title */}
                <h3 className="mt-3 text-base sm:text-lg lg:text-xl font-black text-slate-900 group-hover:text-red-900 transition leading-snug">
                  {pub.doiUrl ? (
                    <a href={pub.doiUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>

                {/* Authors */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {formatAuthors(pub.authors)}
                </p>

                {/* Journal & Identifiers */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                  {pub.journal && (
                    <span className="font-semibold text-slate-800 italic">
                      {pub.journal}
                    </span>
                  )}
                  {pub.pmid && <span>PMID: <strong className="text-slate-800">{pub.pmid}</strong></span>}
                  {pub.doi && <span>DOI: <strong className="text-slate-800">{pub.doi}</strong></span>}
                </div>

                {/* Abstract Section */}
                {pub.abstract && (
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() => toggleAbstract(pub.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-800 transition"
                    >
                      <span>{isAbstractExpanded ? t.publications.hideAbstract : t.publications.showAbstract}</span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isAbstractExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isAbstractExpanded && (
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 animate-fadeIn">
                        {pub.abstract}
                      </p>
                    )}
                  </div>
                )}

                {/* Figures Gallery */}
                {hasFigures && (
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                      {t.publications.figuresLabel}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {pub.figures.map((fig, fIdx) => (
                        <button
                          key={fIdx}
                          type="button"
                          onClick={() => setModalFigure({ url: fig.url || '', caption: fig.caption, title: pub.title })}
                          className="group/fig relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50 hover:border-red-400 hover:shadow-xs transition"
                          aria-label={fig.label || `Figure ${fIdx + 1}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={withBasePath(fig.url)}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-300 group-hover/fig:scale-105"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 px-1 py-0.5 text-[10px] font-semibold text-white text-center truncate" aria-hidden="true">
                            {fig.label || `Fig ${fIdx + 1}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Links */}
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                  {pub.doiUrl && (
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-red-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-red-600"
                    >
                      <span>{t.publications.doiBtn}</span>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {pub.pubmedUrl && (
                    <a
                      href={pub.pubmedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    >
                      PubMed
                    </a>
                  )}
                  {pub.pmcUrl && (
                    <a
                      href={pub.pmcUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    >
                      {t.publications.pmcBtn}
                    </a>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Numbered Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Publications pagination" className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <div className="text-xs font-medium text-slate-600">
            {t.publications.page} <strong className="text-slate-900">{currentPage}</strong> / <strong className="text-slate-900">{totalPages}</strong> ({filteredAndSortedPublications.length} {t.publications.itemsCount})
          </div>

          <div className="flex items-center gap-1">
            {/* Previous Page Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t.publications.prev}</span>
            </button>

            {/* Page Number Buttons */}
            {getPageNumbers().map((p, idx) => {
              if (p === '...') {
                return (
                  <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs font-bold text-slate-600">
                    ...
                  </span>
                );
              }
              const pageNum = p as number;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => handlePageChange(pageNum)}
                  className={`h-8 w-8 rounded-full text-xs font-bold transition ${
                    isActive
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <span>{t.publications.next}</span>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </nav>
      )}

      {/* Modal / Lightbox for viewing high-res figures */}
      {modalFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2.5 sm:p-4 backdrop-blur-xs"
          onClick={() => setModalFigure(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl w-full mx-2 overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-6 shadow-2xl min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3 min-w-0">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">{modalFigure.title}</h3>
                <p className="text-xs text-slate-600">{t.publications.fullResolution}</p>
              </div>
              <button
                type="button"
                onClick={() => setModalFigure(null)}
                aria-label="Kapat"
                className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 shrink-0"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative mt-4 flex max-h-[60vh] sm:max-h-[65vh] items-center justify-center overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(modalFigure.url)}
                alt=""
                aria-hidden="true"
                className="max-h-[60vh] sm:max-h-[65vh] max-w-full w-auto rounded-lg object-contain"
              />
            </div>

            {modalFigure.caption && (
              <p className="mt-4 max-h-24 overflow-y-auto text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                {modalFigure.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
