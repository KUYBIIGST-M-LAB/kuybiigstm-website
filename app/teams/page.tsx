import TeamsHeader from './TeamsHeader';
import TeamView from './TeamView';
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
        <TeamsHeader memberCount={members.length} />
        <TeamView members={members} sheetUrl={sheetUrl} />
      </div>
    </main>
  );
}
