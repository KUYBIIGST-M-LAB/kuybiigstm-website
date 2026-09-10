'use client';

import { useEffect } from 'react';

export default function IframeAutoResizer() {
  useEffect(() => {
    // Only execute if embedded inside an iframe
    if (typeof window === 'undefined' || window.self === window.top) {
      return;
    }

    const postHeight = () => {
      try {
        const height = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        window.parent.postMessage({ type: 'KUYBI_RESIZE', height }, '*');
      } catch {
        // ignore cross-origin access errors
      }
    };

    // Send initial height immediately
    postHeight();

    // Listen for window resize events
    window.addEventListener('resize', postHeight);

    // Watch for DOM layout changes (expanding cards, search filters, images loaded)
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(postHeight);
      if (document.body) {
        observer.observe(document.body);
      }
    }

    // Safety checks during initial asset & font loading
    const interval = setInterval(postHeight, 400);
    const timeout = setTimeout(() => clearInterval(interval), 4000);

    return () => {
      window.removeEventListener('resize', postHeight);
      if (observer) observer.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
