'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';

export type Language = 'en' | 'tr';

export interface Translations {
  nav: {
    home: string;
    research: string;
    publications: string;
    team: string;
    collaborators: string;
  };
  hero: {
    institutionBadge: string;
    title: string;
    description: string;
    researchBtn: string;
    teamBtn: string;
  };
  research: {
    sectionLabel: string;
    title: string;
    summary: string;
    video1Title: string;
    video2Title: string;
  };
  publications: {
    sectionLabel: string;
    title: string;
    description: string;
    totalArticles: string;
    searchPlaceholder: string;
    allYears: string;
    sortBy: string;
    sortNewest: string;
    sortOldest: string;
    sortTitle: string;
    showing: string;
    of: string;
    inYear: string;
    matching: string;
    clearFilters: string;
    noResults: string;
    noResultsSub: string;
    resetFilters: string;
    perPage: string;
    prev: string;
    next: string;
    page: string;
    showAbstract: string;
    hideAbstract: string;
    openAccess: string;
    fullResolution: string;
  };
  pi: {
    title: string;
    role: string;
    bio: string;
    teamButton: string;
  };
  collaborators: {
    sectionLabel: string;
    title: string;
    description: string;
  };
  footer: {
    address: string;
    quickLinks: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      research: 'Research',
      publications: 'Publications',
      team: 'Our Team',
      collaborators: 'Collaborators',
    },
    hero: {
      institutionBadge: 'Koç University',
      title: 'KUYBIIGST-M',
      description:
        'The Koc University Structural Biology & Innovative Drug Development Center (KUYBIIGST-M) is the first comprehensive structural biology center in Turkey. Our goal is to unravel the 3D structures of biomacromolecules.',
      researchBtn: 'Research',
      teamBtn: 'Our Team',
    },
    research: {
      sectionLabel: 'Research',
      title:
        'Ambient-Temperature Serial Femtosecond X-ray Crystallographic Studies of Ribosome Complexes',
      summary:
        'High-resolution ribosome structures determined by cryo X-ray crystallography have provided important insights into the mechanism of translation. Such studies have thus far relied on large ribosome crystals kept at cryogenic temperatures to reduce radiation damage. We use serial femtosecond X-ray crystallography (SFX) with an X-ray free-electron laser (XFEL) to obtain diffraction data from ribosome microcrystals in liquid suspension at ambient temperature. Small 30S ribosomal subunit microcrystals programmed with decoding complexes and bound to either antibiotic compounds or their next-generation derivatives diffracted to high resolution. Our results demonstrate the feasibility of using SFX to better understand the structural mechanisms underpinning the interactions between ribosomes and other substrates such as antibiotics and decoding complexes. We have determined the structure of large (50S) ribosomal subunit in record-short time by using record-low amount of sample during an XFEL beamtime. This structure is the largest one solved to date by any FEL source to near atomic resolution (3 MDa). We expect that these results will enable routine structural studies, at near-physiological temperatures, of the large ribosomal subunit bound to clinically-relevant classes of antibiotics targeting it, e.g. macrolides and ketolides, also with the goal of aiding development of the next generation of these classes of antibiotics. Overall, the ability to collect diffraction data at near-physiological temperatures promises to provide new fundamental insights into the structural dynamics of the ribosome and its functional complexes.',
      video1Title:
        'Ambient-Temperature Serial Femtosecond X-ray Crystallography of Ribosome Complexes',
      video2Title:
        'Structural Mechanisms & Dynamics of Translation',
    },
    publications: {
      sectionLabel: 'Publications & Research Articles',
      title: 'All Research Publications',
      description:
        'Comprehensive list of peer-reviewed articles, structural studies, and methods published by Hasan DeMirci and the KUYBIIGST-M laboratory.',
      totalArticles: 'Total Articles',
      searchPlaceholder: 'Search by title, author, keyword, journal, or PMID...',
      allYears: 'All Years',
      sortBy: 'Sort by',
      sortNewest: 'Newest First',
      sortOldest: 'Oldest First',
      sortTitle: 'Title (A–Z)',
      showing: 'Showing',
      of: 'of',
      inYear: 'in',
      matching: 'matching',
      clearFilters: 'Clear filters',
      noResults: 'No publications found',
      noResultsSub: 'Try adjusting your search terms or year filter.',
      resetFilters: 'Reset Filters',
      perPage: 'Per page',
      prev: 'Previous',
      next: 'Next',
      page: 'Page',
      showAbstract: 'Show Abstract',
      hideAbstract: 'Hide Abstract',
      openAccess: 'Open Access',
      fullResolution: 'Figure Full Resolution',
    },
    pi: {
      title: 'Dr. Hasan DeMirci, PhD.',
      role: 'Principal Investigator',
      bio: 'I completed my B.Sc. at Bosphorus University in 2002 and later received my Ph.D. in Molecular Biology, Cell Biology and Biochemistry at Brown University in 2007. My research focuses on the structural biology of mutant prokaryotic ribosomes and on developing methods to study large biomacromolecular systems at near-physiological temperatures.',
      teamButton: 'Our Team →',
    },
    collaborators: {
      sectionLabel: 'Collaborators & Global Network',
      title: 'Academic and Research Partnerships',
      description:
        'Pioneering collaborations in serial femtosecond crystallography, ribosome dynamics, RNA modifications, and disease mechanics with world-leading universities and laboratories.',
    },
    footer: {
      address: 'Rumelifeneri Yolu, 34450 Sarıyer, Istanbul, Turkey',
      quickLinks: 'Quick Links',
      copyright: 'Koç University KUYBIIGST-M. Custom built with TypeScript.',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      research: 'Araştırma',
      publications: 'Yayınlar',
      team: 'Ekibimiz',
      collaborators: 'İş Birlikleri',
    },
    hero: {
      institutionBadge: 'Koç Üniversitesi',
      title: 'KUYBİİGST-M',
      description:
        'Koç Üniversitesi Yapısal Biyoloji ve Yenilikçi İlaç Geliştirme Merkezi (KUYBİİGST-M), Türkiye\'nin ilk kapsamlı yapısal biyoloji merkezidir. Amacımız biyomakromoleküllerin 3 boyutlu yapılarını aydınlatmaktır.',
      researchBtn: 'Araştırmaları İncele',
      teamBtn: 'Ekibimiz',
    },
    research: {
      sectionLabel: 'Araştırma',
      title:
        'Ribozom Komplekslerinin Ortam Sıcaklığında Seri Femtosaniye X-Işını Kristalografisi Çalışmaları',
      summary:
        'Kriyo X-ışını kristalografisiyle belirlenen yüksek çözünürlüklü ribozom yapıları, translasyon mekanizmasına dair önemli bilgiler sağlamıştır. Bu çalışmalar şimdiye dek radyasyon hasarını azaltmak için kriyojenik sıcaklıklarda tutulan büyük ribozom kristallerine dayanıyordu. Bizler ortam sıcaklığında sıvı süspansiyon halindeki ribozom mikrokristallerinden kırınım verisi elde etmek için X-ışını serbest elektron lazeri (XFEL) ile seri femtosaniye X-ışını kristalografisi (SFX) kullanıyoruz. Kod çözme kompleksleriyle programlanmış ve antibiyotik bileşikleri veya bunların yeni nesil türevlerine bağlı küçük 30S ribozom alt birimi mikrokristalleri yüksek çözünürlükte kırınım göstermiştir. Sonuçlarımız, ribozomlar ile antibiyotikler ve kod çözme kompleksleri gibi diğer substratlar arasındaki etkileşimlerin altında yatan yapısal mekanizmaları daha iyi anlamak için SFX kullanımının uygulanabilirliğini kanıtlamaktadır. XFEL ışın süresi sırasında rekor düzeyde düşük miktarda numune kullanarak büyük (50S) ribozom alt biriminin yapısını rekor sürede belirledik. Bu yapı, bugüne kadar herhangi bir FEL kaynağı tarafından atomik çözünürlüğe yakın (3 MDa) çözülen en büyük yapıdır. Bu sonuçların, makrolitler ve ketolitler gibi klinik olarak ilişkili antibiyotik sınıflarına bağlı büyük ribozom alt biriminin fizyolojik sıcaklıklara yakın sıcaklıklarda rutin yapısal çalışmalarını sağlayacağını ve yeni nesil antibiyotiklerin geliştirilmesine yardımcı olacağını öngörüyoruz. Genel olarak, fizyolojik sıcaklıklara yakın kırınım verisi toplama yeteneği, ribozomun ve işlevsel komplekslerinin yapısal dinamiklerine dair temel yeni bilgiler vaat etmektedir.',
      video1Title:
        'Ribozom Komplekslerinin Ortam Sıcaklığında Seri Femtosaniye X-Işını Kristalografisi',
      video2Title:
        'Translasyonun Yapısal Mekanizmaları ve Dinamikleri',
    },
    publications: {
      sectionLabel: 'Yayınlar & Araştırma Makaleleri',
      title: 'Tüm Bilimsel Yayınlar',
      description:
        'Hasan DeMirci ve KUYBİİGST-M laboratuvarı tarafından yayımlanan hakemli makalelerin, yapısal çalışmaların ve yöntemlerin kapsamlı listesi.',
      totalArticles: 'Toplam Yayın',
      searchPlaceholder: 'Başlık, yazar, anahtar kelime, dergi veya PMID ile ara...',
      allYears: 'Tüm Yıllar',
      sortBy: 'Sırala',
      sortNewest: 'En Yeni',
      sortOldest: 'En Eski',
      sortTitle: 'Başlık (A–Z)',
      showing: 'Gösterilen',
      of: '/',
      inYear: 'yılında',
      matching: 'eşleşen',
      clearFilters: 'Filtreleri temizle',
      noResults: 'Yayın bulunamadı',
      noResultsSub: 'Farklı bir arama terimi veya yıl filtresi deneyin.',
      resetFilters: 'Filtreleri Sıfırla',
      perPage: 'Sayfa başı',
      prev: 'Önceki',
      next: 'Sonraki',
      page: 'Sayfa',
      showAbstract: 'Özeti Göster',
      hideAbstract: 'Özeti Gizle',
      openAccess: 'Açık Erişim',
      fullResolution: 'Şekil Tam Çözünürlük',
    },
    pi: {
      title: 'Doç. Dr. Hasan DeMirci, PhD.',
      role: 'Grup Lideri & Merkez Direktörü',
      bio: '2002 yılında Boğaziçi Üniversitesi\'nde lisans derecemi tamamladım ve 2007\'de Brown Üniversitesi\'nde Moleküler Biyoloji, Hücre Biyolojisi ve Biyokimya alanında doktora derecemi aldım. Araştırmalarım, mutant prokaryotik ribozomların yapısal biyolojisi ve büyük biyomakromoleküler sistemleri fizyolojik sıcaklıklara yakın koşullarda incelemek için yöntemler geliştirmeye odaklanmaktadır.',
      teamButton: 'Ekibimiz →',
    },
    collaborators: {
      sectionLabel: 'İş Birlikleri & Küresel Ağ',
      title: 'Akademik ve Araştırma Ortaklıkları',
      description:
        'Dünyanın önde gelen üniversiteleri ve laboratuvarlarıyla seri femtosaniye kristalografi, ribozom dinamikleri, RNA modifikasyonları ve hastalık mekanikleri üzerine öncü iş birlikleri.',
    },
    footer: {
      address: 'Rumelifeneri Yolu, 34450 Sarıyer, İstanbul, Türkiye',
      quickLinks: 'Hızlı Bağlantılar',
      copyright: 'Koç Üniversitesi KUYBİİGST-M. TypeScript ile geliştirilmiştir.',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

function getLangSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('kuybiigstm_lang');
    if (saved === 'tr' || saved === 'en') return saved;
  } catch {
    // ignore
  }
  return 'en';
}

function getServerSnapshot(): Language {
  return 'en';
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('kuybiigstm_lang_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('kuybiigstm_lang_change', callback);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLangSnapshot, getServerSnapshot);

  const setLang = (newLang: Language) => {
    try {
      localStorage.setItem('kuybiigstm_lang', newLang);
      document.documentElement.lang = newLang;
      window.dispatchEvent(new Event('kuybiigstm_lang_change'));
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
