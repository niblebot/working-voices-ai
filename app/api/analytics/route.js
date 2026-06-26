import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

const PROJECT_ID = 'prj_tF7flqv1kYBVXUHeYWQR5qM9a2pg';
const TEAM_ID = 'team_1aVKo0jXtFmu45LUAH5nJKJG';

export async function GET() {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get('admin_auth')?.value)) {
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

    const timeseries = Array.isArray(tsJson.data) ? tsJson.data : [];
    const pages = Array.isArray(pvJson.data) ? pvJson.data : [];

    return NextResponse.json({ timeseries, pages, raw: { ts: tsJson, pv: pvJson } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
