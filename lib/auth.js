import { createHmac, timingSafeEqual } from 'crypto';

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export function createSessionToken() {
  const payload = Buffer.from(JSON.stringify({
    v: 1,
    exp: Date.now() + SESSION_MS,
  })).toString('base64url');

  const sig = createHmac('sha256', process.env.ADMIN_PASSWORD)
    .update(payload)
    .digest('base64url');

  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  try {
    const expected = createHmac('sha256', process.env.ADMIN_PASSWORD)
      .update(payload)
      .digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}
