'use client';

import { useEffect } from 'react';

export default function IframeAutoResizer() {
  useEffect(() => {
    // Only execute if embedded inside an iframe
    let inIframe = false;
    try {
      inIframe = typeof window !== 'undefined' && window.self !== window.top;
    } catch {
      inIframe = true;
    }

    if (!inIframe) {
      return;
    }

    const postHeight = () => {
      try {
        const body = document.body;
        const html = document.documentElement;

        const height = Math.max(
          body ? body.scrollHeight : 0,
          body ? body.offsetHeight : 0,
          body ? body.clientHeight : 0,
          html ? html.scrollHeight : 0,
          html ? html.offsetHeight : 0,
          html ? html.clientHeight : 0
        );

        if (height > 0) {
          // Send all standard formats so WordPress listener catches it regardless of syntax
          window.parent.postMessage({ type: 'KUYBI_RESIZE', height }, '*');
          window.parent.postMessage({ type: 'resize-iframe', height }, '*');
          window.parent.postMessage({ type: 'resize', height }, '*');
          window.parent.postMessage({ height }, '*');
          window.parent.postMessage(height, '*');
        }
      } catch {
        // ignore cross-origin access errors
      }
    };

    // Send immediately
    postHeight();

    // Listen for resize and load events
    window.addEventListener('resize', postHeight);
    window.addEventListener('load', postHeight);

    // If parent sends any message (e.g. ping/request), reply with current height
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'getHeight' || (e.data && e.data.type === 'getHeight')) {
        postHeight();
      }
    };
    window.addEventListener('message', handleMessage);

    // Watch for DOM layout changes
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(postHeight);
      resizeObserver.observe(document.body);
      if (document.documentElement) {
        resizeObserver.observe(document.documentElement);
      }
    }

    // Safety checks during initial dynamic font & image loading
    const interval = setInterval(postHeight, 300);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      window.removeEventListener('resize', postHeight);
      window.removeEventListener('load', postHeight);
      window.removeEventListener('message', handleMessage);
      if (resizeObserver) resizeObserver.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
