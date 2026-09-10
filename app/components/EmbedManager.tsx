'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

interface EmbedContextType {
  isEmbed: boolean;
}

const EmbedContext = createContext<EmbedContextType>({ isEmbed: false });

export function EmbedProvider({ children }: { children: React.ReactNode }) {
  const [isEmbed, setIsEmbed] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      let inIframe = false;
      try {
        inIframe = window.self !== window.top;
      } catch {
        inIframe = true;
      }

      let hasEmbedQuery = false;
      try {
        const params = new URLSearchParams(window.location.search);
        hasEmbedQuery =
          params.get('embed') === 'true' ||
          params.get('embed') === '1' ||
          params.get('widget') === 'true' ||
          window.location.hash.includes('embed');
      } catch {
        // ignore
      }

      const active = inIframe || hasEmbedQuery;
      setIsEmbed(active);

      if (active) {
        document.documentElement.classList.add('is-embed');
      }
    } catch {
      // never crash
    }
  }, []);

  return (
    <EmbedContext.Provider value={{ isEmbed }}>
      {children}
      {isEmbed && (
        <aside
          aria-label="Language selection"
          className="fixed top-3 right-3 z-50 flex items-center rounded-full border border-red-800/80 bg-red-950/90 p-0.5 text-xs font-bold text-white shadow-lg backdrop-blur-md transition hover:scale-105"
        >
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
        </aside>
      )}
    </EmbedContext.Provider>
  );
}

export function useEmbed() {
  return useContext(EmbedContext);
}
