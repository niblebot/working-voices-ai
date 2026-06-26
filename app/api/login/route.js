import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSessionToken } from '@/lib/auth';

// In-memory rate limiter: 5 failed attempts per IP resets after 15 minutes.
// Works per serverless instance — adequate for a low-traffic admin route.
const attempts = new Map();
const MAX = 5;
const WINDOW = 15 * 60 * 1000;

function clientKey(req) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
}

function isLimited(key) {
  const rec = attempts.get(key);
  if (!rec || Date.now() > rec.reset) return false;
  return rec.count >= MAX;
}

function recordFailure(key) {
  const now = Date.now();
  const rec = attempts.get(key);
  if (!rec || now > rec.reset) {
    attempts.set(key, { count: 1, reset: now + WINDOW });
  } else {
    rec.count++;
  }
}

function clearAttempts(key) {
  attempts.delete(key);
}

export async function POST(request) {
  const key = clientKey(request);

  if (isLimited(key)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429 }
    );
  }

  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    recordFailure(key);
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  clearAttempts(key);

  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set('admin_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ ok: true });
}
