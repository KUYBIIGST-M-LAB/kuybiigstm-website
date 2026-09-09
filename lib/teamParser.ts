import { TeamMember } from '@/app/teams/TeamView';

const TR_MAP: Record<string, string> = {
  ı: 'i',
  ğ: 'g',
  ü: 'u',
  ş: 's',
  ö: 'o',
  ç: 'c',
  İ: 'i',
  Ğ: 'g',
  Ü: 'u',
  Ş: 's',
  Ö: 'o',
  Ç: 'c',
  I: 'i',
};

export function cleanTr(text: string): string {
  let result = text;
  for (const [k, v] of Object.entries(TR_MAP)) {
    result = result.replaceAll(k, v);
  }
  return result;
}

export function normalizeText(text: string): string {
  return cleanTr(text.toLowerCase()).replace(/[^a-z0-9]/g, '');
}

export function slugify(text: string): string {
  return cleanTr(text.toLowerCase())
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
}

const HIGH_SCHOOL_NAMES = [
  'hande neslisah uzun',
  'ela nazli akcesme',
  'leyla erturk',
  'melek asya tekelioglu',
  'yakamoz pinar',
];

export function parseCSV(csvText: string): Record<string, string>[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      currentRow.push(currentField);
      currentField = '';
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().replace(/^[\uFEFF]/, ''));
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] ? row[idx].trim() : '';
    });
    return obj;
  });
}

export function parseTeamMembers(
  csvText: string,
  knownLocalSlugs: Set<string> = new Set()
): TeamMember[] {
  const rows = parseCSV(csvText);
  if (rows.length === 0) return [];

  const members: TeamMember[] = [];

  for (const row of rows) {
    const name = (row['Name Surname'] || row['Ad Soyad'] || '').trim();
    const rawPosition = (row['Position'] || row['Pozisyon'] || '').trim();
    const photoUrl = (row['Your Photo'] || row['Fotoğrafınız'] || '').trim();
    let bio = (row['Biography'] || row['Biyografi'] || '').trim();
    const timestamp = row['Zaman damgası'] || '';

    if (!name) continue;

    bio = bio.replace(/[\u200B\uFEFF]/g, '').trim();

    // Name casing formatting
    const nameParts = name.split(/\s+/);
    const formattedName = nameParts
      .map((part) =>
        part.length > 1 && part === part.toUpperCase()
          ? part[0].toUpperCase() + part.slice(1).toLowerCase()
          : part
      )
      .join(' ');

    const slug = slugify(formattedName);
    const normName = normalizeText(formattedName);
    const posLower = rawPosition.toLowerCase();

    // Categorization
    let position = 'Researcher Intern';
    let category = 'Researcher Interns';
    let order = 5;

    if (posLower.includes('phd') || posLower.includes('doktora')) {
      position = 'PhD Student';
      category = 'PhD Students';
      order = 3;
    } else if (
      posLower.includes('msc') ||
      posLower.includes('master') ||
      posLower.includes('yüksek lisans')
    ) {
      position = 'MSc Student';
      category = 'MSc Students';
      order = 4;
    } else if (
      HIGH_SCHOOL_NAMES.some((hs) => normName.includes(normalizeText(hs))) ||
      posLower.includes('high school')
    ) {
      position = 'High School Intern';
      category = 'High School Interns';
      order = 6;
    } else {
      position = 'Researcher Intern';
      category = 'Researcher Interns';
      order = 5;
    }

    // Clean title references in bios
    bio = bio.replace(/Prof\.\s*(?:Dr\.)?\s*Hasan\s*DeMirci/gi, 'Dr. Hasan DeMirci');
    bio = bio.replace(/Prof\.\s*(?:Dr\.)?\s*Hasan\s*Demirci/gi, 'Dr. Hasan Demirci');

    // Resolve photo
    let imagePath: string | null = null;
    if (knownLocalSlugs.has(slug)) {
      imagePath = `/img/team/${slug}.webp`;
    } else if (photoUrl) {
      const driveMatch = photoUrl.match(/(?:id=|file\/d\/)([a-zA-Z0-9_-]+)/);
      if (driveMatch) {
        imagePath = `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
      }
    }

    members.push({
      id: slug,
      name: formattedName,
      position,
      category,
      order,
      bio,
      image: imagePath,
      timestamp,
    });
  }

  members.sort((a, b) => a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' }));
  return members;
}
