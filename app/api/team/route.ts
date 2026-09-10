import { NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/teamLoader';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json(members);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch team members', details: String(err) },
      { status: 500 }
    );
  }
}
