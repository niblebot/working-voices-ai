import { NextResponse } from 'next/server';
import { logAttempt, getAggregateStats } from '@/lib/db';

const MIN_SAMPLE = 25;

export async function GET() {
  try {
    const { total, correctCount } = await getAggregateStats();
    if (total < MIN_SAMPLE) {
      return NextResponse.json({ ready: false, total });
    }
    const wrongPct = Math.round(((total - correctCount) / total) * 100);
    return NextResponse.json({ ready: true, total, wrongPct });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { itemType, correct } = await request.json();
  if (!['video', 'audio'].includes(itemType) || typeof correct !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await logAttempt(itemType, correct);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
