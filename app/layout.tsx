import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'KUYBIIGST-M | Koç University',
  description: 'Koç University Structural Biology & Innovative Drug Development Center (KUYBIIGST-M)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-red-800 selection:text-white overflow-x-hidden">
        <Navbar />

        <main className="flex-1 min-w-0 max-w-full overflow-x-hidden">{children}</main>

        <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <p className="text-lg font-bold text-white">KUYBIIGST-M</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Rumelifeneri Yolu, 34450 Sarıyer, Istanbul, Turkey
              </p>
              <p className="mt-1 text-sm text-slate-400">
                <a href="mailto:vpri@ku.edu.tr" className="hover:text-white">vpri@ku.edu.tr</a> | Tel: +90 212 338 10 00
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end">
              <p lang="en" className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick Links</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
                <a href="#research" className="hover:text-white">Research</a>
                <a href="#publications" className="hover:text-white">Publications</a>
                <a href="#team" className="hover:text-white">Team</a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Koç University KUYBIIGST-M. Custom built with TypeScript.
          </div>
        </footer>
      </body>
    </html>
  );
}
