import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const { email, headcount } = await request.json();

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const parsedHeadcount = Number.isFinite(headcount) ? Math.trunc(headcount) : null;

  try {
    await saveLead(email, parsedHeadcount);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
