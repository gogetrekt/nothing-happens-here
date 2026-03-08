import { put, list } from '@vercel/blob'
import { sanitizeSlug } from '../utils/markdown'

export default defineEventHandler(async (event) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage not configured. Set BLOB_READ_WRITE_TOKEN environment variable.',
    })
  }

  const body = await readBody(event)
  const { title, slug, year, draft = false, content = '' } = body

  if (!title?.trim() || !slug?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Title and slug are required' })
  }

  const safeSlug = sanitizeSlug(slug)
  if (!safeSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const { blobs } = await list({ prefix: `poems/${safeSlug}.json` })
  if (blobs.some(b => b.pathname === `poems/${safeSlug}.json`)) {
    throw createError({ statusCode: 409, statusMessage: 'A poem with this slug already exists' })
  }

  const poem = {
    title: title.trim(),
    slug: safeSlug,
    year: Number(year) || new Date().getFullYear(),
    draft: Boolean(draft),
    content,
  }

  await put(`poems/${safeSlug}.json`, JSON.stringify(poem), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  })

  return { ok: true, slug: safeSlug }
})
