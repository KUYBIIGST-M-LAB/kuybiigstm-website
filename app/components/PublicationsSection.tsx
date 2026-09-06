'use client';

import React, { useState, useMemo } from 'react';
import publicationsRaw from '../../data/publications.json';

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

export default function PublicationsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [visibleCount, setVisibleCount] = useState(8);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [modalFigure, setModalFigure] = useState<{ url: string; caption?: string; title?: string } | null>(null);

  // Extract unique years sorted descending
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year).filter(Boolean)));
    years.sort((a, b) => parseInt(b) - parseInt(a));
    return years;
  }, []);

  // Filter publications based on search and year
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
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
        pub.doi?.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedYear]);

  const displayedPublications = useMemo(() => {
    return filteredPublications.slice(0, visibleCount);
  }, [filteredPublications, visibleCount]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
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

  return (
    <section id="publications" className="mt-12 sm:mt-16 scroll-mt-24 px-3 sm:px-6 lg:px-8 min-w-0 max-w-full">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p lang="en" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              Publications &amp; Research Articles
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 lg:text-4xl">
              All Research Publications
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Comprehensive list of peer-reviewed articles, structural studies, and methods published by Hasan DeMirci and the KUYBIIGST-M laboratory.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-red-100 bg-red-50/80 px-4 py-2.5 shadow-sm">
            <span className="text-2xl font-black text-red-800">{publications.length}</span>
            <div className="text-xs font-semibold leading-tight text-red-900">
              Total<br />Articles
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              placeholder="Search by title, author, keyword, journal, or PMID..."
              className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Year Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => {
                setSelectedYear('ALL');
                setVisibleCount(8);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                selectedYear === 'ALL'
                  ? 'bg-red-700 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              All Years
            </button>
            {availableYears.slice(0, 8).map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  setSelectedYear(year);
                  setVisibleCount(8);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedYear === year
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Counter summary */}
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{displayedPublications.length}</strong> of{' '}
            <strong className="text-slate-800">{filteredPublications.length}</strong> publications
            {selectedYear !== 'ALL' && ` in ${selectedYear}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {(searchQuery || selectedYear !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('ALL');
                setVisibleCount(8);
              }}
              className="text-xs font-semibold text-red-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Publications List - Strictly Vertical (Alt Alta) */}
      <div className="mt-8 space-y-6">
        {displayedPublications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-bold text-slate-700">No publications found</p>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search terms or year filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('ALL');
              }}
              className="mt-4 inline-flex items-center rounded-full bg-red-700 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          displayedPublications.map((pub, index) => {
            const isAbstractExpanded = !!expandedAbstracts[pub.id];
            const hasFigures = pub.figures && pub.figures.length > 0;
            const hasTables = pub.tables && pub.tables.length > 0;

            return (
              <article
                key={pub.id || index}
                className="group relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-6 lg:p-7 shadow-sm transition hover:border-slate-300 hover:shadow-md min-w-0 max-w-full overflow-hidden"
              >
                {/* Meta info tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {pub.year && (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 sm:px-3 py-1 text-xs font-bold text-red-800">
                      {pub.year}
                    </span>
                  )}
                  {pub.isOpenAccess && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 sm:px-3 py-1 text-xs font-bold text-emerald-800">
                      Open Access
                    </span>
                  )}
                  {pub.journal && (
                    <span className="text-xs font-semibold text-slate-700">
                      {pub.journal}
                    </span>
                  )}
                  {pub.pmid && (
                    <span className="ml-auto text-xs font-medium text-slate-600">
                      PMID: <span className="font-mono">{pub.pmid}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg sm:text-xl lg:text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-red-900">
                  <a
                    href={pub.pubmedUrl || pub.doiUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {pub.title}
                  </a>
                </h3>

                {/* Authors */}
                {pub.authors && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {formatAuthors(pub.authors)}
                  </p>
                )}

                {/* Abstract Section (Collapsible) */}
                {pub.abstract && (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-slate-700">
                    <p className={`text-sm leading-relaxed ${isAbstractExpanded ? '' : 'line-clamp-3'}`}>
                      {pub.abstract}
                    </p>
                    {pub.abstract.length > 220 && (
                      <button
                        type="button"
                        onClick={() => toggleAbstract(pub.id)}
                        className="mt-2 text-xs font-bold text-red-700 transition hover:text-red-900"
                      >
                        {isAbstractExpanded ? '▲ Show Less' : '▼ Read Full Abstract'}
                      </button>
                    )}
                  </div>
                )}

                {/* Media Section: Figures & Tables from the article */}
                {(hasFigures || hasTables) && (() => {
                  const isRealFigure = pub.figures[0]?.url && (pub.figures[0].url.endsWith('.jpg') || pub.figures[0].url.endsWith('.png'));
                  const isRealTable = !!pub.tables[0]?.pmcid;

                  return (
                  <div className="mt-5 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 sm:p-4 min-w-0 w-full max-w-full overflow-hidden">
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {isRealFigure ? 'In-Article Figure & Experimental Table' : 'Publication Preview & Indexing'}
                        </span>
                        {isRealFigure && (
                          <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            ✓ Original Figure
                          </span>
                        )}
                      </div>
                      {pub.pmcUrl ? (
                        <a
                          href={pub.pmcUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-red-700 hover:underline shrink-0 self-start sm:self-auto"
                        >
                          View on PubMed Central →
                        </a>
                      ) : pub.doiUrl ? (
                        <a
                          href={pub.doiUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-red-700 hover:underline shrink-0 self-start sm:self-auto"
                        >
                          View Publisher Full-Text →
                        </a>
                      ) : null}
                    </div>

                    <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 min-w-0 w-full max-w-full">
                      {/* Figure item */}
                      {hasFigures && pub.figures[0]?.url && (
                        <div
                          onClick={() =>
                            setModalFigure({
                              url: pub.figures[0].url!,
                              caption: pub.figures[0].caption,
                              title: pub.title,
                            })
                          }
                          className="group/fig relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-xs transition hover:border-red-200 hover:shadow-md min-w-0 w-full max-w-full"
                        >
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center min-w-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={pub.figures[0].url}
                              alt={pub.figures[0].label || 'Article Figure'}
                              loading="lazy"
                              className="h-full w-full object-contain transition duration-300 group-hover/fig:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25 opacity-0 transition group-hover/fig:opacity-100 backdrop-blur-[1px]">
                              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900 shadow-md">
                                🔍 Click to Enlarge
                              </span>
                            </div>
                          </div>
                          <div className="mt-2.5 sm:mt-3 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {pub.figures[0].label || (isRealFigure ? 'Figure 1' : 'Article Preview')}
                              </p>
                              {isRealFigure && (
                                <span className="text-[10px] font-semibold text-emerald-700 shrink-0">
                                  Full Resolution
                                </span>
                              )}
                            </div>
                            {pub.figures[0].caption && (
                              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500 wrap-break-word">
                                {pub.figures[0].caption}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Table item */}
                      {hasTables && (
                        <div className="flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs min-w-0 w-full max-w-full overflow-hidden">
                          <div className="min-w-0 w-full">
                            <div className="flex items-center justify-between gap-2 mb-2 min-w-0">
                              <div className="flex items-center gap-1.5 sm:gap-2 text-red-700 min-w-0">
                                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 truncate">
                                  {pub.tables[0].label || (isRealTable ? 'Table 1' : 'Publication Overview')}
                                </span>
                              </div>
                              {isRealTable ? (
                                <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                  Experimental Table
                                </span>
                              ) : (
                                <span className="shrink-0 text-[10px] text-slate-400">
                                  Overview Table
                                </span>
                              )}
                            </div>
                            {pub.tables[0].caption && (
                              <p className="mb-2 line-clamp-2 text-xs font-medium text-slate-600 wrap-break-word">
                                {pub.tables[0].caption}
                              </p>
                            )}

                            {/* Mobile horizontal scroll hint */}
                            <div className="mb-1.5 flex items-center justify-end sm:hidden">
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400">
                                <svg className="h-2.5 w-2.5 animate-pulse text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                Scrollable table
                              </span>
                            </div>

                            {pub.tables[0].headers && pub.tables[0].headers.length > 0 && (
                              <div className="w-full max-w-full min-w-0 overflow-x-auto rounded-lg sm:rounded-xl border border-slate-200 max-h-52 overflow-y-auto overscroll-contain">
                                <table className="min-w-full divide-y divide-slate-200 text-left text-[11px]">
                                  <thead className="bg-slate-100 sticky top-0 font-bold text-slate-800">
                                    <tr>
                                      {pub.tables[0].headers.map((h, i) => (
                                        <th key={i} className="px-2.5 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap bg-slate-100 text-[10px] sm:text-[11px] font-bold text-slate-800">
                                          {h}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {pub.tables[0].rows?.map((row, rIdx) => (
                                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] text-slate-700 whitespace-nowrap">
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>

                          {pub.pmcUrl && (
                            <a
                              href={pub.pmcUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-flex items-center text-xs font-bold text-red-700 hover:text-red-900 self-start"
                            >
                              View Full Table in PMC →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  );
                })()}

                {/* External links and actions */}
                <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                  {pub.pubmedUrl && (
                    <a
                      href={pub.pubmedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View on PubMed
                    </a>
                  )}

                  {pub.doiUrl && (
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700"
                    >
                      <span>DOI Link</span>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  )}

                  {pub.pmcUrl && (
                    <a
                      href={pub.pmcUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      PMC Full Text
                    </a>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* "Load More" Button */}
      {visibleCount < filteredPublications.length && (
        <div className="mt-10 flex flex-col items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 rounded-full bg-red-700 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-600 active:scale-98"
          >
            <span>Load More Publications (+8)</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <span className="text-xs text-slate-500 font-medium">
            {displayedPublications.length} of {filteredPublications.length} publications shown
          </span>
        </div>
      )}

      {visibleCount >= filteredPublications.length && filteredPublications.length > 0 && (
        <div className="mt-10 text-center text-xs font-semibold text-slate-400">
          ✓ All {filteredPublications.length} publications loaded
        </div>
      )}

      {/* Modal / Lightbox for viewing high-res figures */}
      {modalFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2.5 sm:p-4 backdrop-blur-sm"
          onClick={() => setModalFigure(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl w-full mx-2 overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-6 shadow-2xl min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3 min-w-0">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">{modalFigure.title}</h4>
                <p className="text-xs text-slate-500">Figure Full Resolution</p>
              </div>
              <button
                type="button"
                onClick={() => setModalFigure(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 shrink-0"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative mt-4 flex max-h-[60vh] sm:max-h-[65vh] items-center justify-center overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalFigure.url}
                alt="Figure Full Size"
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
