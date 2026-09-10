import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Koç University Structural Biology & Innovative Drug Development Center (KUYBIIGST-M)',
    short_name: 'KUYBIIGST-M',
    description:
      'Turkey\'s premier research center for structural biology, serial femtosecond X-ray crystallography (SFX), ribosome dynamics, and drug discovery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#7f1d1d',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
