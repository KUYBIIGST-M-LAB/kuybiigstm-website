import fs from 'fs';
import path from 'path';
import fallbackTeamData from '@/data/team.json';
import { TeamMember } from '@/app/teams/TeamView';
import { parseTeamMembers } from './teamParser';

export const DEFAULT_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRITGc3yJ9DOhfCmOZHEoCIEACGhcSaqJepW4fKBGFsD8VFxQlMNJb1uINjOC7sJ_yYU6o4rttuYf1C/pub?gid=1925323626&single=true&output=csv';

export function getLocalPhotoSlugs(): Set<string> {
  const localDir = path.join(process.cwd(), 'public', 'img', 'team');
  const slugs = new Set<string>();
  if (fs.existsSync(localDir)) {
    const files = fs.readdirSync(localDir);
    for (const file of files) {
      if (file.endsWith('.webp')) {
        slugs.add(file.replace('.webp', ''));
      }
    }
  }
  return slugs;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const sheetUrl =
    process.env.GOOGLE_SHEETS_CSV_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CSV_URL ||
    DEFAULT_SHEET_URL;

  const localSlugs = getLocalPhotoSlugs();

  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, {
        cache: 'no-store',
      });

      if (res.ok) {
        const csvText = await res.text();
        const members = parseTeamMembers(csvText, localSlugs);

        if (members.length > 0) {
          return members;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch team data from Google Sheets, falling back to local JSON:', err);
    }
  }

  // Fallback to local team.json
  return (fallbackTeamData as TeamMember[]).sort((a, b) =>
    a.name.localeCompare(b.name, 'tr', { sensitivity: 'base' })
  );
}
