import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

let tablesReady = null;

function ensureTables() {
  if (!tablesReady) {
    tablesReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS quiz_attempts (
          id SERIAL PRIMARY KEY,
          item_type TEXT NOT NULL,
          correct BOOLEAN NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL,
          headcount INTEGER,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return tablesReady;
}

export async function logAttempt(itemType, correct) {
  await ensureTables();
  await sql`INSERT INTO quiz_attempts (item_type, correct) VALUES (${itemType}, ${correct})`;
}

export async function getAggregateStats() {
  await ensureTables();
  const rows = await sql`
    SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE correct)::int AS correct_count
    FROM quiz_attempts
  `;
  return { total: rows[0].total, correctCount: rows[0].correct_count };
}

export async function saveLead(email, headcount) {
  await ensureTables();
  await sql`INSERT INTO leads (email, headcount) VALUES (${email}, ${headcount})`;
}
