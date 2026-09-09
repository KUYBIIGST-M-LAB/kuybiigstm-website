'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeroParallax from './components/HeroParallax';
import PublicationsSection from './components/PublicationsSection';
import CloudHeroCard from './components/CloudHeroCard';
import YouTubeFacade from './components/YouTubeFacade';
import { useLanguage } from '@/lib/i18n';



const institutionalPartners = [
  {
    name: 'Stanford University',
    sub: 'School of Medicine & SLAC',
    subTr: 'Tıp Fakültesi & SLAC',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford University Logo',
    url: 'https://med.stanford.edu/structuralbio.html',
    badge: 'Stanford, USA',
  },
  {
    name: 'Duke University',
    sub: 'School of Medicine',
    subTr: 'Tıp Fakültesi',
    logo: '/img/rna-institute-logo.jpg',
    logoAlt: 'Duke University School of Medicine Logo',
    url: 'https://medicine.duke.edu/profile/paul-f-agris',
    badge: 'Durham, NC, USA',
  },
  {
    name: 'Koç University',
    sub: 'Research Laboratories Infrastructure',
    subTr: 'Araştırma Laboratuvarları Altyapısı',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University Logo',
    url: 'https://research.ku.edu.tr/research-infrastructure/laboratories/',
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
    url: 'https://puglisi.stanford.edu/',
    badge: 'Stanford Medicine',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Pioneering single-molecule fluorescence and structural dynamics of translation mechanisms, ribosome kinetics, and antibiotic inhibition.',
    descriptionTr:
      'Translasyon mekanizmalarının, ribozom kinetiğinin ve antibiyotik inhibisyonunun tek molekül floresansı ve yapısal dinamikleri üzerine öncü araştırmalar.',
  },
  {
    name: 'Wakatsuki Laboratory',
    pi: 'Prof. Soichi Wakatsuki',
    institution: 'Stanford School of Medicine & SLAC',
    department: 'Department of Structural Biology & Photon Science Directorate',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford Medicine & SLAC Logo',
    url: 'https://med.stanford.edu/wakatsukilab/Members.html',
    badge: 'Stanford / SLAC',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Advancing multi-scale structural biology, serial femtosecond crystallography (SFX) methods, and synchrotron/XFEL applications.',
    descriptionTr:
      'Çok ölçekli yapısal biyoloji, seri femtosaniye kristalografi (SFX) yöntemleri ile senkrotron ve XFEL uygulamalarında ileri düzey çalışmalar.',
  },
  {
    name: 'Levitt Laboratory',
    pi: 'Prof. Michael Levitt',
    honor: '2013 Nobel Laureate in Chemistry',
    institution: 'Stanford School of Medicine',
    department: 'Department of Structural Biology',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford University Levitt Lab Logo',
    url: 'https://med.stanford.edu/levitt.html',
    badge: 'Nobel Laureate / Stanford',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    description:
      'Computational structural biology, multiscale modeling of complex macromolecular assemblies, protein folding, and allosteric transitions.',
    descriptionTr:
      'Hesaplamalı yapısal biyoloji, karmaşık makromoleküler yapıların çok ölçekli modellenmesi, protein katlanması ve allosterik geçişler.',
  },
  {
    name: 'Cheng Research Laboratory',
    pi: 'Prof. Alan G. Cheng',
    institution: 'Stanford School of Medicine',
    department: 'Department of Otolaryngology — Head & Neck Surgery',
    logo: '/img/stanford-logo.svg',
    logoAlt: 'Stanford Medicine Logo',
    url: 'https://med.stanford.edu/achenglab',
    badge: 'Stanford Medicine',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Investigating inner ear sensory mechanisms and collaborating on developing non-ototoxic aminoglycoside antibiotics.',
    descriptionTr:
      'İç kulak duyusal mekanizmalarının araştırılması ve ototoksik olmayan aminoglikozit antibiyotiklerin geliştirilmesi üzerine ortak çalışmalar.',
  },
  {
    name: 'Otsuka Medicinal Chemistry Laboratory',
    pi: 'Prof. Masami Otsuka',
    institution: 'Kumamoto University & Science Farm Co.',
    department: 'Medicinal Chemistry & Drug Discovery',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Kumamoto University / Science Farm Logo',
    url: 'https://sciprofiles.com/profile/133914',
    badge: 'Kumamoto Univ / Japan',
    badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    description:
      'Design, synthesis, and mechanistic evaluation of novel therapeutic small molecules targeting kinase and zinc finger domains.',
    descriptionTr:
      'Kinaz ve çinko parmağı domainlerini hedefleyen yeni terapötik küçük moleküllerin tasarımı, sentezi ve etki mekanizmalarının değerlendirilmesi.',
  },
  {
    name: 'Agris RNA Research Laboratory',
    pi: 'Prof. Paul F. Agris',
    institution: 'Duke University School of Medicine',
    department: 'Department of Medicine & The RNA Institute',
    logo: '/img/rna-institute-logo.jpg',
    logoAlt: 'Duke University School of Medicine Logo',
    url: 'https://medicine.duke.edu/profile/paul-f-agris',
    badge: 'Duke Medicine',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    description:
      'Investigating the functional role of RNA chemical modifications in tRNA decoding accuracy, ribosome interactions, and therapeutic targeting.',
    descriptionTr:
      'tRNA kod çözme doğruluğunda, ribozom etkileşimlerinde ve terapötik hedeflemede RNA kimyasal modifikasyonlarının işlevsel rolünün incelenmesi.',
  },
  {
    name: 'Neurodegeneration Research Laboratory (NDAL)',
    pi: 'Prof. Dr. A. Nazlı Başak',
    institution: 'Koç University',
    department: 'Suna and İnan Kıraç Foundation Health Sciences & Neurogenetics',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University NDAL Logo',
    url: 'https://research.ku.edu.tr/ndal/about-us/members/ndal-ayse-nazli-basak/',
    badge: 'Koç University / NDAL',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Elucidating molecular, genetic, and structural mechanisms of neurodegenerative disorders including ALS and motor neuron disease.',
    descriptionTr:
      'ALS ve motor nöron hastalıkları dahil nörodejeneratif bozuklukların moleküler, genetik ve yapısal mekanizmalarının aydınlatılması.',
  },
  {
    name: 'Cytoskeleton and Ciliopathy Laboratory',
    pi: 'Assoc. Prof. Elif Nur Fırat-Karalar',
    honor: 'ERC Grantee',
    institution: 'Koç University',
    department: 'Department of Molecular Biology and Genetics',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University ERC Logo',
    url: 'https://research.ku.edu.tr/research-support-offices/sponsored-research-office/international/erc-grants/erc-grantees-projects/elif-nur-firat-karalar/',
    badge: 'Koç Univ / ERC',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    description:
      'Investigating centriole, cilia, and centrosome biology to unravel the molecular etiology of developmental and ciliopathy disorders.',
    descriptionTr:
      'Gelişimsel ve siliyopati bozukluklarının moleküler etiyolojisini aydınlatmak amacıyla sentriyol, silya ve sentrozom biyolojisi araştırmaları.',
  },
  {
    name: 'Cell Biology and Proteomics Laboratory',
    pi: 'Prof. Dr. Nurhan Özlü',
    institution: 'Koç University',
    department: 'Department of Molecular Biology and Genetics',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University Cell Biology & Proteomics Logo',
    url: 'https://research.ku.edu.tr/research-infrastructure/laboratories/cell-biology-and-proteomics-lab/',
    badge: 'Koç University MBGE',
    badgeColor: 'bg-red-50 text-red-800 border-red-200',
    description:
      'Investigating spatial proteomics, mitotic division dynamics, cytoskeletal regulation, and quantitative mass spectrometry workflows.',
    descriptionTr:
      'Uzamsal proteomik, mitotik bölünme dinamikleri, hücre iskeleti regülasyonu ve kantitatif kütle spektrometrisi iş akışlarının incelenmesi.',
  },
  {
    name: 'Koç University Research Laboratories',
    pi: 'Core Facilities Infrastructure',
    institution: 'Koç University',
    department: 'Research, Development and Innovation Directorate',
    logo: '/img/koc-university-logo.svg',
    logoAlt: 'Koç University Research Infrastructure Logo',
    url: 'https://research.ku.edu.tr/research-infrastructure/laboratories/',
    badge: 'Research Infrastructure',
    badgeColor: 'bg-slate-50 text-slate-800 border-slate-200',
    description:
      'Comprehensive advanced instrumentation, structural characterization, imaging suites, and core facility ecosystems across Koç University.',
    descriptionTr:
      'Koç Üniversitesi bünyesinde yer alan ileri düzey cihaz altyapısı, yapısal karakterizasyon, görüntüleme sistemleri ve merkezi laboratuvar ekosistemi.',
  },
];


export default function KuybimPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="px-0 py-0 overflow-x-hidden">
      <HeroParallax image="/img/wallpaper.webp">
        <CloudHeroCard>
          <div className="space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-800 border border-red-200/50">
              {t.hero.institutionBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-900">
              {t.hero.title}
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium max-w-xs sm:max-w-sm lg:max-w-md">
              {t.hero.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href="#research"
              className="rounded-full bg-red-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-red-600 active:scale-95"
            >
              {t.hero.researchBtn}
            </a>
            <a
              href="#team"
              className="rounded-full border border-slate-300 bg-white/95 px-4 py-2 text-xs font-semibold text-slate-800 shadow-xs transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 active:scale-95"
            >
              {t.hero.teamBtn}
            </a>
          </div>
        </CloudHeroCard>
      </HeroParallax>

      <section id="research" className="mt-12 sm:mt-16 scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">{t.research.sectionLabel}</p>
        </div>

        <article className="mt-6 rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7 lg:p-8 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 lg:text-3xl">{t.research.title}</h3>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-700">{t.research.summary}</p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <YouTubeFacade
              videoId="t7jUZwhZdd0"
              title={t.research.video1Title}
            />

            <YouTubeFacade
              videoId="RG-PYmeq2XE"
              title={t.research.video2Title}
            />
          </div>
        </article>
      </section>

      <PublicationsSection />

      <section id="team" className="mt-12 sm:mt-16 scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-slate-200 pb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">{t.nav.team}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{t.pi.role}</h2>
        </div>

        <div className="rounded-2xl sm:rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center text-center md:text-left">
            <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100 shadow-md sm:h-44 sm:w-44 md:mx-0 md:h-48 md:w-48">
              <Image src="/img/hasan-demirci.png" alt={t.pi.title} fill className="object-cover" sizes="(max-width: 768px) 176px, 192px" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{t.pi.title}</h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-red-800">{t.pi.role}</p>
              <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-700">
                {t.pi.bio}
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
          {t.pi.teamButton}
        </Link>
      </div>

      <section id="collaborators" className="mt-16 scroll-mt-24 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">{t.collaborators.sectionLabel}</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">{t.collaborators.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                {t.collaborators.description}
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
                <img src={inst.logo} alt={inst.logoAlt} loading="lazy" className="max-h-10 max-w-full object-contain transition duration-200 group-hover:scale-105" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-red-700 transition">{inst.name}</h4>
                  <span className="text-[10px] font-semibold text-slate-400 shrink-0">{inst.badge}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{lang === 'tr' && inst.subTr ? inst.subTr : inst.sub}</p>
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
                      loading="lazy"
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
                  {lang === 'tr' && collab.descriptionTr ? collab.descriptionTr : collab.description}
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
                  <span>{t.collaborators.visitLab}</span>
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">{t.products.label}</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">{t.products.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
              {t.products.description}
            </p>
          </div>

          <a
            href="https://research.ku.edu.tr/research-infrastructure/kuybiig-m-products/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
          >
            {t.products.btn}
          </a>
        </div>
      </section>
    </div>
  );
}
