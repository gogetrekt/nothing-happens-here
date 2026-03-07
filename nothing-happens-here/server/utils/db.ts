import Database from 'better-sqlite3'
import { join } from 'path'
import { mkdirSync } from 'fs'

let db: Database.Database | null = null

export function getPoemsDb(): Database.Database {
  if (!db) {
    const dataDir = join(process.cwd(), '.data')
    mkdirSync(dataDir, { recursive: true })
    const dbPath = join(dataDir, 'poems.db')
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.exec(`
      CREATE TABLE IF NOT EXISTS poems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL DEFAULT '',
        year INTEGER NOT NULL DEFAULT 0,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `)
    // Migrate existing tables that may lack slug/year columns
    // SQLite ALTER TABLE ADD COLUMN cannot use UNIQUE or NOT NULL constraints
    try { db.exec("ALTER TABLE poems ADD COLUMN slug TEXT DEFAULT ''") } catch {}
    try { db.exec('ALTER TABLE poems ADD COLUMN year INTEGER DEFAULT 0') } catch {}
  }
  return db
}

export interface Poem {
  id: number
  title: string
  slug: string
  year: number
  content: string
  created_at: string
}

export function getAllPoems(): Poem[] {
  const db = getPoemsDb()
  return db.prepare(`
    SELECT id, title, slug, year, content, created_at
    FROM poems
    ORDER BY year DESC, created_at DESC
  `).all() as Poem[]
}

export function getPoemById(id: number): Poem | null {
  const db = getPoemsDb()
  return db.prepare(`
    SELECT id, title, slug, year, content, created_at
    FROM poems
    WHERE id = ?
  `).get(id) as Poem | null
}

export function getPoemBySlug(slug: string): Poem | null {
  const db = getPoemsDb()
  return db.prepare(`
    SELECT id, title, slug, year, content, created_at
    FROM poems
    WHERE slug = ?
  `).get(slug) as Poem | null
}

export function createPoem(title: string, slug: string, year: number, content: string): Poem {
  const db = getPoemsDb()
  const now = new Date().toISOString()
  const result = db.prepare(`
    INSERT INTO poems (title, slug, year, content, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, slug, year, content, now)

  return {
    id: result.lastInsertRowid as number,
    title,
    slug,
    year,
    content,
    created_at: now,
  }
}

export function updatePoem(id: number, title: string, slug: string, year: number, content: string): Poem | null {
  const db = getPoemsDb()
  db.prepare(`
    UPDATE poems
    SET title = ?, slug = ?, year = ?, content = ?
    WHERE id = ?
  `).run(title, slug, year, content, id)

  return getPoemById(id)
}

export function deletePoem(id: number): boolean {
  const db = getPoemsDb()
  const result = db.prepare(`
    DELETE FROM poems
    WHERE id = ?
  `).run(id)

  return (result.changes as number) > 0
}
