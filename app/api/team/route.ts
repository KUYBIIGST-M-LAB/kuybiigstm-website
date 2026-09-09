import { NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/teamLoader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json(members, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch team members', details: String(err) },
      { status: 500 }
    );
  }
}
