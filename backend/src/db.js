import Database from 'better-sqlite3';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const db = new Database(join(dataDir, 'app.db'));

db.exec(`
CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  term TEXT NOT NULL,      -- key
  definition TEXT NOT NULL, -- value
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_cards_term ON cards(term);
`);

export default db;
