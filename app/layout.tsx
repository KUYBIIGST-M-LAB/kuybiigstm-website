import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from '@/lib/i18n';

const siteUrl = 'https://kuybiigstm.ku.edu.tr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KUYBIIGST-M | Koç University Structural Biology & Innovative Drug Development Center',
    template: '%s | KUYBIIGST-M - Koç University',
  },
  description:
    'Koç University Structural Biology & Innovative Drug Development Center (KUYBIIGST-M) is Turkey\'s premier research center for macromolecular crystallography, cryo-EM, serial femtosecond X-ray crystallography (SFX), ribosome dynamics, and structure-guided drug discovery, led by Dr. Hasan DeMirci.',
  keywords: [
    'KUYBIIGST-M',
    'KUYBİİGST-M',
    'Koç University',
    'Koc University',
    'Koç Üniversitesi',
    'Structural Biology',
    'Yapısal Biyoloji',
    'Innovative Drug Development',
    'İlaç Geliştirme',
    'Hasan Demirci',
    'Hasan DeMirci',
    'Serial Femtosecond Crystallography',
    'SFX',
    'XFEL',
    'X-ray Free Electron Laser',
    'Cryo-EM',
    'Ribosome Structure',
    'Ribosome Dynamics',
    'Antibiotic Resistance',
    'Biomacromolecules',
    'Protein Crystallography',
    'Stanford University',
    'Duke University',
    'Brown University',
    'SLAC National Accelerator Laboratory',
    'Protein Marker',
  ],
  authors: [{ name: 'Dr. Hasan DeMirci', url: 'https://scholar.google.com/citations?user=duLs4CkAAAAJ&hl=en' }],
  creator: 'KUYBIIGST-M',
  publisher: 'Koç University',
  category: 'Science & Technology',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'KUYBIIGST-M | Koç University Structural Biology Center',
    description:
      'First comprehensive structural biology center in Turkey. Unraveling 3D structures of biomacromolecules, ribosome complexes, and pioneering ambient-temperature serial femtosecond X-ray crystallography (SFX).',
    url: siteUrl,
    siteName: 'KUYBIIGST-M | Koç University',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    type: 'website',
    images: [
      {
        url: '/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KUYBIIGST-M Koç University Structural Biology & Innovative Drug Development Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KUYBIIGST-M | Koç University Structural Biology Center',
    description:
      'First comprehensive structural biology center in Turkey. Ambient-temperature serial femtosecond X-ray crystallography (SFX) & ribosome dynamics.',
    images: ['/img/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ResearchOrganization', 'EducationalOrganization'],
      '@id': `${siteUrl}/#organization`,
      name: 'Koç University Structural Biology & Innovative Drug Development Center (KUYBIIGST-M)',
      alternateName: [
        'KUYBIIGST-M',
        'KUYBİİGST-M',
        'Koç Üniversitesi Yapısal Biyoloji ve Yenilikçi İlaç Geliştirme Merkezi',
        'Koc University Structural Biology Center',
      ],
      url: siteUrl,
      logo: `${siteUrl}/img/logo.webp`,
      image: `${siteUrl}/img/og-image.png`,
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'Koç University',
        url: 'https://www.ku.edu.tr',
      },
      founder: {
        '@id': `${siteUrl}/#hasan-demirci`,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rumelifeneri Yolu',
        addressLocality: 'Sarıyer',
        addressRegion: 'Istanbul',
        postalCode: '34450',
        addressCountry: 'TR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'vpri@ku.edu.tr',
        telephone: '+90-212-338-1000',
        contactType: 'research center office',
      },
      sameAs: [
        'https://research.ku.edu.tr/research-infrastructure/laboratories/',
        'https://twitter.com/kocuniversity',
      ],
      knowsAbout: [
        'Structural Biology',
        'Serial Femtosecond Crystallography (SFX)',
        'X-ray Free Electron Laser (XFEL)',
        'Ribosome Dynamics',
        'Antibiotic Resistance',
        'Cryo-EM',
        'Structure-Guided Drug Discovery',
        'Biomacromolecular Crystallography',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#hasan-demirci`,
      name: 'Dr. Hasan DeMirci',
      alternateName: ['Hasan Demirci', 'Hasan DeMirci'],
      jobTitle: 'Associate Professor & Center Director',
      worksFor: {
        '@id': `${siteUrl}/#organization`,
      },
      alumnusOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Brown University',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Boğaziçi University',
        },
      ],
      sameAs: [
        'https://scholar.google.com/citations?user=duLs4CkAAAAJ&hl=en',
        'https://med.stanford.edu/structuralbio.html',
      ],
      email: 'hdemirci@ku.edu.tr',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'KUYBIIGST-M | Koç University',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: ['en-US', 'tr-TR'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-red-800 selection:text-white overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 min-w-0 max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
