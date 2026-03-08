import { put, list } from '@vercel/blob'
import { buildMarkdown, sanitizeSlug } from '../utils/markdown'

export default defineEventHandler(async (event) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[poems.post] BLOB_READ_WRITE_TOKEN is not set in environment')
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage not configured. Set BLOB_READ_WRITE_TOKEN environment variable.',
    })
  }

  try {
    const body = await readBody(event)
    const { title, slug, year, draft = false, content = '' } = body

    if (!title?.trim() || !slug?.trim()) {
      throw createError({ statusCode: 400, statusMessage: 'Title and slug are required' })
    }

    const safeSlug = sanitizeSlug(slug)
    if (!safeSlug) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
    }

    const { blobs } = await list({ prefix: `poems/${safeSlug}.md` })
    if (blobs.some(b => b.pathname === `poems/${safeSlug}.md`)) {
      throw createError({ statusCode: 409, statusMessage: 'A poem with this slug already exists' })
    }

    const poemYear = Number(year) || new Date().getFullYear()
    const markdown = buildMarkdown(title.trim(), safeSlug, poemYear, Boolean(draft), content)

    await put(`poems/${safeSlug}.md`, markdown, {
    access: 'private',
      addRandomSuffix: false,
    })

    return { ok: true, slug: safeSlug }
  } catch (err: any) {
    console.error('[poems.post] Error:', err.message || err)
    throw err
  }
})
