import Image from 'next/image';
import Link from 'next/link';
import HeroParallax from './components/HeroParallax';
import PublicationsSection from './components/PublicationsSection';

const researchPillars = [
  {
    title: 'Ambient-Temperature Serial Femtosecond X-ray Crystallography',
    description:
      'We use serial femtosecond X-ray crystallography (SFX) with an X-ray free-electron laser to collect diffraction data from ribosome microcrystals in liquid suspension at near-physiological temperatures.',
  },
  {
    title: 'Ribosome Structure and Antibiotic Resistance',
    description:
      'Our research focuses on elucidating how ribosomal complexes assemble, move, and respond to antibiotics or decoding factors at atomic resolution.',
  },
  {
    title: 'Method Development for Challenging Biomacromolecules',
    description:
      'We develop and apply new structural biology workflows to capture dynamics in large, medically relevant macromolecular complexes.',
  },
];


const institutionalPartners = [
  {
    name: 'Stanford University',
    sub: 'School of Medicine & SLAC',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford University Logo',
    url: 'https://med.stanford.edu/structuralbio.html',
    badge: 'Stanford, USA',
  },
  {
    name: 'University at Albany',
    sub: 'The RNA Institute, SUNY',
    logo: '/img/rna-institute-logo.jpg',
    logoAlt: 'The RNA Institute Logo',
    url: 'https://www.albany.edu/rna-institute',
    badge: 'Albany, USA',
  },
  {
    name: 'Koç University',
    sub: 'College of Sciences & Health',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University Logo',
    url: 'https://ku.edu.tr/',
    badge: 'Istanbul, Turkey',
  },
];

const collaborators = [
  {
    name: 'Puglisi Laboratory',
    pi: 'Prof. Joseph D. Puglisi',
    institution: 'Stanford School of Medicine',
    department: 'Department of Structural Biology',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford University School of Medicine Logo',
    url: 'https://puglisilab.stanford.edu/',
    badge: 'Stanford Medicine',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Pioneering single-molecule fluorescence and structural dynamics of translation mechanisms, ribosome kinetics, and antibiotic inhibition.',
  },
  {
    name: 'Wakatsuki Laboratory',
    pi: 'Prof. Soichi Wakatsuki',
    institution: 'Stanford School of Medicine & SLAC',
    department: 'Department of Structural Biology & Photon Science Directorate',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford Medicine & SLAC Logo',
    url: 'https://med.stanford.edu/wakatsukilab.html',
    badge: 'Stanford / SLAC',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Advancing multi-scale structural biology, serial femtosecond crystallography (SFX) methods, and synchrotron/XFEL applications.',
  },
  {
    name: 'Levitt Laboratory',
    pi: 'Prof. Michael Levitt',
    honor: '2013 Nobel Laureate in Chemistry',
    institution: 'Stanford School of Medicine',
    department: 'Department of Structural Biology',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford University Levitt Lab Logo',
    url: 'https://csb.stanford.edu/levitt/',
    badge: 'Nobel Laureate / Stanford',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    description:
      'Computational structural biology, multiscale modeling of complex macromolecular assemblies, protein folding, and allosteric transitions.',
  },
  {
    name: 'Agris RNA Research Laboratory',
    pi: 'Prof. Paul F. Agris',
    institution: 'The RNA Institute, University at Albany',
    department: 'State University of New York (SUNY)',
    logo: '/img/rna-institute-logo.jpg',
    logoAlt: 'The RNA Institute, University at Albany Logo',
    url: 'https://www.albany.edu/rna-institute',
    badge: 'The RNA Institute',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
    description:
      'Investigating the functional role of RNA chemical modifications in tRNA decoding accuracy, ribosome interactions, and therapeutic targeting.',
  },
  {
    name: 'Neurodegeneration Research Laboratory (NDAL)',
    pi: 'Prof. Dr. A. Nazlı Başak',
    institution: 'Koç University',
    department: 'Suna and İnan Kıraç Foundation Health Sciences & Neurogenetics',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University NDAL Logo',
    url: 'https://kuttam.ku.edu.tr/',
    badge: 'Koç University / NDAL',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Elucidating molecular, genetic, and structural mechanisms of neurodegenerative disorders including ALS and motor neuron disease.',
  },
  {
    name: 'Cell Biology and Proteomics Laboratory',
    pi: 'Prof. Dr. Nurhan Özlü',
    institution: 'Koç University',
    department: 'Department of Molecular Biology and Genetics',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University Cell Biology & Proteomics Logo',
    url: 'https://mbg.ku.edu.tr/',
    badge: 'Koç University MBGE',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Investigating spatial proteomics, mitotic division dynamics, cytoskeletal regulation, and quantitative mass spectrometry workflows.',
  },
];

const stats = [
  { value: '3 MDa', label: 'largest ribosomal structure solved' },
  { value: 'XFEL', label: 'serial femtosecond X-ray platform' },
  { value: '1st', label: 'comprehensive structural biology center in Turkey' },
];

const featuredResearch = {
  title: 'Ambient-Temperature Serial Femtosecond X-ray Crystallographic Studies of Ribosome Complexes',
  summary:
    'High-resolution ribosome structures determined by cryo X-ray crystallography have provided important insights into the mechanism of translation. Such studies have thus far relied on large ribosome crystals kept at cryogenic temperatures to reduce radiation damage. We use the serial femtosecond X-ray crystallography (SFX) with an X-ray free-electron laser (XFEL) to obtain diffraction data from ribosome microcrystals in liquid suspension at ambient temperature. Small 30S ribosomal subunit microcrystals programmed with decoding complexes and bound to either antibiotic compounds or their next-generation derivatives diffracted to high resolution. Our results demonstrate the feasibility of using SFX to better understand the structural mechanisms underpinning the interactions between ribosomes and other substrates such as antibiotics and decoding complexes. We have determined the structure of large (50S) ribosomal subunit in record-short time by using record-low amount of sample during and XFEL beamtime. This structure is the largest one solved to date by any FEL source to near atomic resolution (3 MDa). We expect that these results will enable routine structural studies, at near-physiological temperatures, of the large ribosomal subunit bound to clinically-relevant classes of antibiotics targeting it, e.g. macrolides and ketolides, also with the goal of aiding development of the next generation of these classes of antibiotics. Overall, the ability to collect diffraction data at near-physiological temperatures promises to provide new fundamental insights into the structural dynamics of the ribosome and its functional complexes.',
};


export default function KuybimPage() {
  return (
    <div className="px-0 py-0 overflow-x-hidden">
      <HeroParallax image="/img/wallpaper.webp">
        <div className="max-w-xl rounded-2xl sm:rounded-3xl border border-white/70 bg-white/85 p-6 sm:p-8 lg:p-10 shadow-xl sm:shadow-2xl backdrop-blur-md">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-800">
              Koç University
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              KUYBIIGST-M
            </h1>
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base sm:leading-relaxed lg:text-lg">
              The Koc University Structural Biology &amp; Innovative Drug Development Center (KUYBIIGST-M) is the first comprehensive structural biology center in Turkey. Our goal is to unravel the 3D structures of biomacromolecules.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            <a
              href="#research"
              className="rounded-full bg-red-700 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-red-950/20 transition hover:bg-red-600"
            >
              Research
            </a>
            <a
              href="#team"
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition hover:border-red-300 hover:bg-slate-50 hover:text-red-700"
            >
              Team
            </a>
          </div>
        </div>
      </HeroParallax>

      <section id="research" className="mt-12 sm:mt-16 scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-4">
          <p lang="en" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Research</p>
        </div>

        <article className="mt-6 rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7 lg:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 lg:text-3xl">{featuredResearch.title}</h3>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-700">{featuredResearch.summary}</p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/t7jUZwhZdd0"
                title="Featured research video 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/RG-PYmeq2XE"
                title="Featured research video 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </article>
      </section>

      <PublicationsSection />

      <section id="team" className="mt-12 sm:mt-16 scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-slate-200 pb-4">
          <p lang="en" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Team</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Principal Investigator</h2>
        </div>

        <div className="rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
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

              <div className="mt-5 sm:mt-6 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-red-700">✉</span>
                  <a href="mailto:hdemirci@ku.edu.tr" className="hover:text-red-800">hdemirci@ku.edu.tr</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-700">▣</span>
                  <span>SCI Z59</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-center sm:justify-start px-4 sm:px-6 lg:px-8">
        <Link
          href="/teams"
          className="inline-flex items-center rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/20 transition hover:bg-red-600"
        >
          Our Teams →
        </Link>
      </div>

      <section id="collaborators" className="mt-16 scroll-mt-24 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p lang="en" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Collaborators &amp; Global Network</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Academic and Research Partnerships</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Pioneering collaborations in serial femtosecond crystallography, ribosome dynamics, RNA modifications, and disease mechanics with world-leading universities and laboratories.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Partner Institutions Ribbon */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {institutionalPartners.map((inst) => (
            <a
              key={inst.name}
              href={inst.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-red-200 hover:shadow-md"
            >
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={inst.logo} alt={inst.logoAlt} className="max-h-10 max-w-full object-contain transition duration-200 group-hover:scale-105" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-red-700 transition">{inst.name}</h4>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">{inst.badge}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{inst.sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Research Laboratory Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collaborators.map((collab) => (
            <div
              key={collab.name}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div>
                {/* Logo & Badge Header */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex h-12 w-28 items-center justify-start">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={collab.logo}
                      alt={collab.logoAlt}
                      className="max-h-11 max-w-full object-contain"
                    />
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${collab.badgeColor}`}
                  >
                    {collab.badge}
                  </span>
                </div>

                {/* Lab Title & Lead */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-red-900 sm:text-xl">
                    {collab.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-red-800">
                    {collab.pi}
                  </p>

                  {collab.honor && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/80 px-2.5 py-1 text-[11px] font-bold text-amber-900 shadow-2xs">
                      <span>🏅</span>
                      <span>{collab.honor}</span>
                    </div>
                  )}

                  <p className="mt-2.5 text-xs font-medium text-slate-500">
                    {collab.department} • <span className="font-semibold text-slate-700">{collab.institution}</span>
                  </p>
                </div>

                {/* Research Description */}
                <p className="mt-3.5 text-xs leading-relaxed text-slate-600">
                  {collab.description}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={collab.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 transition hover:text-red-900"
                >
                  <span>Visit Laboratory Page</span>
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[28px] border border-red-100 bg-red-50 p-5 shadow-sm lg:p-7 mx-4 sm:mx-6 lg:mx-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p lang="en" className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Products</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">KUYBIIGST-M Protein Marker</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
              Locally developed, ready-to-use protein ladder (14–100 kDa) designed for use in research laboratories.
            </p>
          </div>

          <a
            href="https://research.ku.edu.tr/research-infrastructure/kuybiig-m-products/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            View Product Page
          </a>
        </div>
      </section>
    </div>
  );
}
