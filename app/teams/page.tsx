import Image from 'next/image';
import Link from 'next/link';
import TeamView, { TeamMember } from './TeamView';
import { getTeamMembers, DEFAULT_SHEET_URL } from '@/lib/teamLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Our Team | KUYBIIGST-M',
  description: 'Meet the researchers, graduate students, and interns at KUYBIIGST-M, Koç University.',
};

export default async function TeamsPage() {
  const members = await getTeamMembers();
  const sheetUrl =
    process.env.GOOGLE_SHEETS_CSV_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CSV_URL ||
    DEFAULT_SHEET_URL;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              Our Teams
            </p>
            <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
              KUYBIIGST-M Research Team
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Meet the scientists, researchers, graduate students, and interns advancing macromolecular crystallography, structural biology, and drug discovery.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700 shadow-2xs"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Featured Principal Investigator Card */}
        <div className="mb-10 rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center text-center md:text-left">
            <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100 shadow-md sm:h-44 sm:w-44 md:mx-0 md:h-48 md:w-48">
              <Image
                src="/img/hasan-demirci.png"
                alt="Hasan DeMirci"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 176px, 192px"
              />
            </div>

            <div className="flex-1">
              <div className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-800 border border-red-200/60 mb-2">
                Principal Investigator
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Dr. Hasan DeMirci, PhD.
              </h2>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-500">
                Director & Lead Researcher, KUYBIIGST-M | Koç University
              </p>
              <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700">
                I completed my B.Sc. at Bosphorus University in 2002 and later received my Ph.D. in Molecular Biology, Cell Biology and Biochemistry at Brown University in 2007. My research focuses on the structural biology of mutant prokaryotic ribosomes and on developing methods to study large biomacromolecular systems at near-physiological temperatures using serial femtosecond X-ray crystallography (SFX).
              </p>
            </div>
          </div>
        </div>

        {/* Section Divider & Team Members Grid with Filters */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Lab Members & Researchers
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore profiles, research interests, and project involvement across our team.
              </p>
            </div>
            <span className="text-xs font-semibold text-red-800 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full w-fit">
              {members.length} Active Members
            </span>
          </div>

          <TeamView members={members} sheetUrl={sheetUrl} />
        </div>
      </div>
    </main>
  );
}
