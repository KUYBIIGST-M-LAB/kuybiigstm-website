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
    structuralBioLab: string;
    contact: string;
    campus: string;
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
    figuresLabel: string;
    doiBtn: string;
    pmcBtn: string;
    itemsCount: string;
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
    visitLab: string;
  };
  products: {
    label: string;
    title: string;
    description: string;
    btn: string;
  };
  footer: {
    address: string;
    quickLinks: string;
    copyright: string;
  };
  teams: {
    sectionLabel: string;
    title: string;
    description: string;
    backHome: string;
    piBadge: string;
    piSubtitle: string;
    membersTitle: string;
    membersSubtitle: string;
    activeMembers: string;
    searchPlaceholder: string;
    alphabetical: string;
    noMatch: string;
    clearSearch: string;
    readMore: string;
    close: string;
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
      structuralBioLab: 'Structural Biology Lab',
      contact: 'Contact: vpri@ku.edu.tr',
      campus: 'Koç University • Rumelifeneri Campus, Istanbul',
    },
    hero: {
      institutionBadge: 'Koç University',
      title: 'KUYBIIGST-M',
      description:
        'The Koc University Structural Biology & Innovative Drug Development Center (KUYBIIGST-M) is the first comprehensive structural biology center in Turkey. Our goal is to unravel the 3D structures of biomacromolecules.',
      researchBtn: 'Explore Research',
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
      figuresLabel: 'Article Figures & Visuals',
      doiBtn: 'DOI / Journal',
      pmcBtn: 'PMC Full Text',
      itemsCount: 'items',
    },
    pi: {
      title: 'Dr. Hasan DeMirci',
      role: 'Principal Investigator',
      bio: 'I completed my B.Sc. at Bosphorus University in 2002 and later received my Ph.D. in Molecular Biology, Cell Biology and Biochemistry at Brown University in 2007. My research focuses on the structural biology of mutant prokaryotic ribosomes and on developing methods to study large biomacromolecular systems at near-physiological temperatures.',
      teamButton: 'Our Team →',
    },
    collaborators: {
      sectionLabel: 'Collaborators & Global Network',
      title: 'Academic and Research Partnerships',
      description:
        'Pioneering collaborations in serial femtosecond crystallography, ribosome dynamics, RNA modifications, and disease mechanics with world-leading universities and laboratories.',
      visitLab: 'Visit Laboratory Page',
    },
    products: {
      label: 'Products',
      title: 'KUYBIIGST-M Protein Marker',
      description:
        'Locally developed, ready-to-use protein ladder (14–100 kDa) designed for use in research laboratories.',
      btn: 'View Product Page',
    },
    footer: {
      address: 'Rumelifeneri Yolu, 34450 Sarıyer, Istanbul, Turkey',
      quickLinks: 'Quick Links',
      copyright: 'Koç University KUYBIIGST-M. All rights reserved.',
    },
    teams: {
      sectionLabel: 'Our Team',
      title: 'KUYBIIGST-M Research Team',
      description:
        'Meet the scientists, researchers, graduate students, and interns advancing macromolecular crystallography, structural biology, and drug discovery.',
      backHome: '← Back to Home',
      piBadge: 'Principal Investigator',
      piSubtitle: 'Director & Lead Researcher, KUYBIIGST-M | Koç University',
      membersTitle: 'Lab Members & Researchers',
      membersSubtitle: 'Explore profiles, research interests, and project involvement across our team.',
      activeMembers: 'Active Members',
      searchPlaceholder: 'Search by name, research, or keyword...',
      alphabetical: '(Alphabetical Order A–Z)',
      noMatch: 'No team members match',
      clearSearch: 'Clear search',
      readMore: 'Read more',
      close: 'Close',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      research: 'Araştırma',
      publications: 'Yayınlar',
      team: 'Ekibimiz',
      collaborators: 'İş Birlikleri',
      structuralBioLab: 'Yapısal Biyoloji Laboratuvarı',
      contact: 'İletişim: vpri@ku.edu.tr',
      campus: 'Koç Üniversitesi • Rumelifeneri Kampüsü, İstanbul',
    },
    hero: {
      institutionBadge: 'Koç Üniversitesi',
      title: 'KUYBİİGST-M',
      description:
        'Koç Üniversitesi Yapısal Biyoloji ve Yenilikçi İlaç Geliştirme Merkezi (KUYBİİGST-M), Türkiye\'nin ilk kapsamlı yapısal biyoloji merkezidir. Temel amacımız biyomakromoleküllerin 3 boyutlu yapılarını aydınlatmaktır.',
      researchBtn: 'Araştırmaları İnceleyin',
      teamBtn: 'Ekibimiz',
    },
    research: {
      sectionLabel: 'Araştırma Alanı',
      title:
        'Ribozom Komplekslerinin Ortam Sıcaklığında Seri Femtosaniye X-Işını Kristalografisi Çalışmaları',
      summary:
        'Kriyo X-ışını kristalografisiyle belirlenen yüksek çözünürlüklü ribozom yapıları, translasyon mekanizmasına dair önemli bilgiler sağlamıştır. Bu çalışmalar şimdiye dek radyasyon hasarını azaltmak için kriyojenik sıcaklıklarda tutulan büyük ribozom kristallerine dayanıyordu. Bizler ortam sıcaklığında sıvı süspansiyon halindeki ribozom mikrokristallerinden kırınım verisi elde etmek için X-ışını serbest elektron lazeri (XFEL) ile seri femtosaniye X-ışını kristalografisi (SFX) kullanıyoruz. Kod çözme kompleksleriyle programlanmış ve antibiyotik bileşikleri veya bunların yeni nesil türevlerine bağlı küçük 30S ribozom alt birimi mikrokristalleri yüksek çözünürlükte kırınım göstermiştir. Sonuçlarımız, ribozomlar ile antibiyotikler ve kod çözme kompleksleri gibi diğer substratlar arasındaki etkileşimlerin altında yatan yapısal mekanizmaları daha iyi anlamak için SFX kullanımının uygulanabilirliğini kanıtlamaktadır. XFEL ışın süresi sırasında rekor düzeyde düşük miktarda numune kullanarak büyük (50S) ribozom alt biriminin yapısını rekor sürede belirledik. Bu yapı, bugüne kadar herhangi bir FEL kaynağı tarafından atomik çözünürlüğe yakın (3 MDa) çözülen en büyük yapıdır. Bu sonuçların, makrolitler ve ketolitler gibi klinik olarak ilişkili antibiyotik sınıflarına bağlı büyük ribozom alt biriminin fizyolojik sıcaklıklara yakın sıcaklıklarda rutin yapısal çalışmalarını sağlayacağını ve yeni nesil antibiyotiklerin geliştirilmesine yardımcı olacağını öngörüyoruz. Genel olarak, fizyolojik sıcaklıklara yakın kırınım verisi toplama yeteneği, ribozomun ve işlevsel komplekslerinin yapısal dinamiklerine dair temel yeni bilgiler sunmaktadır.',
      video1Title:
        'Ribozom Komplekslerinin Ortam Sıcaklığında Seri Femtosaniye X-Işını Kristalografisi',
      video2Title:
        'Translasyonun Yapısal Mekanizmaları ve Dinamikleri',
    },
    publications: {
      sectionLabel: 'Yayınlar & Bilimsel Makaleler',
      title: 'Tüm Bilimsel Yayınlar',
      description:
        'Dr. Hasan DeMirci ve KUYBİİGST-M araştırma ekibi tarafından yayımlanan hakemli makalelerin, yapısal biyoloji çalışmalarının ve yöntemlerin kapsamlı listesi.',
      totalArticles: 'Toplam Yayın',
      searchPlaceholder: 'Başlık, yazar, anahtar kelime, dergi veya PMID ile arayın...',
      allYears: 'Tüm Yıllar',
      sortBy: 'Sıralama',
      sortNewest: 'En Yeniye Göre',
      sortOldest: 'En Eskiye Göre',
      sortTitle: 'Başlığa Göre (A–Z)',
      showing: 'Gösterilen:',
      of: '/',
      inYear: 'yılı',
      matching: 'eşleşen:',
      clearFilters: 'Filtreleri Temizle',
      noResults: 'Aramanızla eşleşen yayın bulunamadı',
      noResultsSub: 'Farklı bir arama terimi veya yıl filtresi deneyebilirsiniz.',
      resetFilters: 'Filtreleri Sıfırla',
      perPage: 'Sayfa başına',
      prev: 'Önceki',
      next: 'Sonraki',
      page: 'Sayfa',
      showAbstract: 'Özeti Göster',
      hideAbstract: 'Özeti Gizle',
      openAccess: 'Açık Erişim',
      fullResolution: 'Yüksek Çözünürlüklü Şekil',
      figuresLabel: 'Makale Şekilleri & Görseller',
      doiBtn: 'DOI / Dergi',
      pmcBtn: 'PMC Tam Metin',
      itemsCount: 'yayın',
    },
    pi: {
      title: 'Dr. Hasan DeMirci',
      role: 'Grup Lideri & Merkez Direktörü',
      bio: '2002 yılında Boğaziçi Üniversitesi\'nde lisans derecemi tamamladım ve 2007\'de Brown Üniversitesi\'nde Moleküler Biyoloji, Hücre Biyolojisi ve Biyokimya alanında doktora derecemi aldım. Araştırmalarım, mutant prokaryotik ribozomların yapısal biyolojisi ve büyük biyomakromoleküler sistemleri fizyolojik sıcaklıklara yakın koşullarda incelemek için yöntemler geliştirmeye odaklanmaktadır.',
      teamButton: 'Tüm Ekibimiz →',
    },
    collaborators: {
      sectionLabel: 'İş Birliklerimiz & Küresel Ağ',
      title: 'Akademik ve Araştırma Ortaklıkları',
      description:
        'Dünyanın önde gelen üniversiteleri ve laboratuvarlarıyla seri femtosaniye kristalografi, ribozom dinamikleri, RNA modifikasyonları ve hastalık mekanizmaları üzerine öncü iş birlikleri.',
      visitLab: 'Laboratuvar Sayfasını Ziyaret Edin',
    },
    products: {
      label: 'Laboratuvar Ürünleri',
      title: 'KUYBİİGST-M Protein Belirteci (Protein Ladder)',
      description:
        'Araştırma laboratuvarlarında kullanılmak üzere yerli olarak geliştirilmiş, kullanıma hazır protein belirteci (14–100 kDa).',
      btn: 'Ürün Sayfasını İnceleyin',
    },
    footer: {
      address: 'Rumelifeneri Yolu, 34450 Sarıyer, İstanbul, Türkiye',
      quickLinks: 'Hızlı Bağlantılar',
      copyright: 'Koç Üniversitesi KUYBİİGST-M. Tüm hakları saklıdır.',
    },
    teams: {
      sectionLabel: 'Ekibimiz',
      title: 'KUYBİİGST-M Araştırma Ekibi',
      description:
        'Makromoleküler kristalografi, yapısal biyoloji ve ilaç keşfi alanlarında çalışan bilim insanları, araştırmacılar, lisansüstü öğrenciler ve stajyerlerimiz.',
      backHome: '← Ana Sayfaya Dön',
      piBadge: 'Merkez Direktörü & Baş Araştırmacı',
      piSubtitle: 'Direktör & Baş Araştırmacı, KUYBİİGST-M | Koç Üniversitesi',
      membersTitle: 'Laboratuvar Üyeleri & Araştırmacılar',
      membersSubtitle: 'Ekip üyelerimizin araştırma alanlarını, profillerini ve projelerini inceleyin.',
      activeMembers: 'Aktif Üye',
      searchPlaceholder: 'İsim, uzmanlık veya anahtar kelime ile arayın...',
      alphabetical: '(Alfabetik Sıralama A–Z)',
      noMatch: 'Aramanızla eşleşen ekip üyesi bulunamadı.',
      clearSearch: 'Aramayı Temizle',
      readMore: 'Devamını Oku',
      close: 'Kapat',
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
