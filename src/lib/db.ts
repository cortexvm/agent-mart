import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let db: Database.Database;

function getDbPath(): string {
  // On Vercel serverless, use /tmp for writable storage
  // Locally, use a data/ directory in the project root
  if (process.env.VERCEL) {
    return "/tmp/agentmart.db";
  }
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "agentmart.db");
}

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(getDbPath());
    db.pragma("journal_mode = WAL");
    initializeDb(db);
  }
  return db;
}

function initializeDb(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items TEXT NOT NULL,
      total_amount REAL NOT NULL,
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
  `);
}
