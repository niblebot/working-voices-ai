import { NextResponse } from 'next/server';
import { logSession, getSessionStats } from '@/lib/db';

const MIN_SAMPLE = 1;

export async function GET() {
  try {
    const { total, perfectCount } = await getSessionStats();
    if (total < MIN_SAMPLE) {
      return NextResponse.json({ ready: false, total });
    }
    const perfectPct = Math.round((perfectCount / total) * 100);
    const failPct = Math.round(((total - perfectCount) / total) * 100);
    return NextResponse.json({ ready: true, total, perfectPct, failPct });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { correctCount, totalRounds } = await request.json();
  if (typeof correctCount !== 'number' || typeof totalRounds !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await logSession(correctCount, totalRounds);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
