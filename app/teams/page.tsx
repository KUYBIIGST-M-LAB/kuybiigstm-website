import Image from 'next/image';
import Link from 'next/link';

const teamGroups = [
  {
    title: 'Principal Investigator',
    description: 'Principal Investigator and research lead driving structural biology and drug discovery efforts.',
  },
  {
    title: 'Post Docs',
    description: 'Researchers leading advanced methods development, structural interpretation, and collaborative projects.',
  },
  {
    title: 'PhD Students',
    description: 'Doctoral researchers working on macromolecular structure, crystallography, and translational biomolecular studies.',
  },
  {
    title: 'MSc Students',
    description: 'Master’s students contributing to experimental design, sample preparation, and data analysis.',
  },
  {
    title: 'Other Researchers',
    description: 'Visiting scientists, collaborators, and research associates supporting the broader KUYBIIGST-M team.',
  },
];

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Our Teams</p>
            <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">KUYBIIGST-M Research Team</h1>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mb-8 rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center text-center md:text-left">
            <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100 shadow-md sm:h-44 sm:w-44 md:mx-0 md:h-48 md:w-48">
              <Image src="/img/hasan-demirci.png" alt="Hasan DeMirci" fill className="object-cover" sizes="(max-width: 768px) 176px, 192px" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Hasan DeMirci, PhD.</h3>
              <p lang="en" className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-red-800">Principal Investigator</p>
              <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-700">
                I completed my B.Sc. at Bosphorus University in 2002 and later received my Ph.D. in Molecular Biology, Cell Biology and Biochemistry at Brown University in 2007. My research focuses on the structural biology of mutant prokaryotic ribosomes and on developing methods to study large biomacromolecular systems at near-physiological temperatures.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {teamGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-red-800">
                {group.title}
              </div>
              <p className="text-base leading-7 text-slate-700">{group.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
