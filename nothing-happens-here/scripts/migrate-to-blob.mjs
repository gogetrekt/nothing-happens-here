/**
 * Migration script: uploads each poem from data/poems.json to Vercel Blob
 * as an individual poems/{slug}.json file.
 *
 * Usage:
 *   node scripts/migrate-to-blob.mjs
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env.local (loaded automatically).
 */

import { readFile } from 'node:fs/promises'
import { put } from '@vercel/blob'

// Load .env.local so BLOB_READ_WRITE_TOKEN is available
try {
  const env = await readFile(new URL('../.env.local', import.meta.url), 'utf-8')
  for (const line of env.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key && !process.env[key]) process.env[key] = val
  }
} catch {
  // .env.local not found — rely on environment already having the token
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN is not set.')
  process.exit(1)
}

const raw = await readFile(new URL('../data/poems.json', import.meta.url), 'utf-8')
const poems = JSON.parse(raw)

console.log(`Uploading ${poems.length} poems...`)

for (const poem of poems) {
  const { title, slug, year, draft = false, content = '' } = poem

  if (!slug) {
    console.warn(`Skipping poem without slug: "${title}"`)
    continue
  }

  const payload = {
    title,
    slug,
    year: Number(year) || new Date().getFullYear(),
    draft: Boolean(draft),
    content,
  }

  await put(`poems/${slug}.json`, JSON.stringify(payload), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  console.log(`  ✓ poems/${slug}.json`)
}

console.log('Migration complete.')
