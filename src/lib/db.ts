import { neon } from "@neondatabase/serverless";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Create a Neon Postgres database from your Vercel dashboard (Storage > Create Database > Neon Postgres) and link it to this project."
    );
  }
  return neon(databaseUrl);
}

export async function initializeDb(): Promise<void> {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items TEXT NOT NULL,
      total_amount NUMERIC NOT NULL,
      currency TEXT NOT NULL DEFAULT 'USD',
      payment_method TEXT NOT NULL DEFAULT 'COD',
      status TEXT NOT NULL DEFAULT 'confirmed',
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT,
      customer_address TEXT NOT NULL,
      customer_city TEXT NOT NULL,
      customer_country TEXT NOT NULL,
      agent_id TEXT,
      estimated_delivery TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `;
}
