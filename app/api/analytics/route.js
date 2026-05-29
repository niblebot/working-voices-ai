import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const PROJECT_ID = 'prj_tF7flqv1kYBVXUHeYWQR5qM9a2pg';
const TEAM_ID = 'team_1aVKo0jXtFmu45LUAH5nJKJG';

function isAuthed(cookieStore) {
  return cookieStore.get('admin_auth')?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isAuthed(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'no_token' }, { status: 503 });
  }

  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 29);

  const params = new URLSearchParams({
    projectId: PROJECT_ID,
    teamId: TEAM_ID,
    from: from.toISOString(),
    to: to.toISOString(),
    environment: 'production',
    filter: JSON.stringify({}),
  });

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const [tsRes, pvRes] = await Promise.all([
      fetch(`https://vercel.com/api/web-analytics/timeseries?${params}`, { headers }),
      fetch(`https://vercel.com/api/web-analytics/page-views?${params}&limit=10`, { headers }),
    ]);

    const tsJson = await tsRes.json();
    const pvJson = await pvRes.json();

    if (!tsRes.ok) {
      return NextResponse.json({ error: tsJson.error?.message ?? 'Vercel API error' }, { status: 502 });
    }

    return NextResponse.json({
      timeseries: tsJson.data ?? [],
      pages: pvJson.data ?? [],
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
