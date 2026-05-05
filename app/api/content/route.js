import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';
import { defaultContent } from '@/lib/content';
import { readContent, setBlobUrl } from '@/lib/getContent';

function isAuthed(cookieStore) {
  return cookieStore.get('admin_auth')?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const updates = await request.json();
  const safe = {};
  for (const key of Object.keys(defaultContent)) {
    if (updates[key] !== undefined) safe[key] = updates[key];
  }

  try {
    const current = await readContent();
    const merged = { ...current, ...safe };
    const blob = await put('site_content.json', JSON.stringify(merged), {
      access: 'public',
      allowOverwrite: true,
      contentType: 'application/json',
    });
    setBlobUrl(blob.url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
