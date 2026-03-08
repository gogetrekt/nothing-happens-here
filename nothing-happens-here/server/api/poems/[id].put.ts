import { put, list } from '@vercel/blob'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id') || ''
  const body = await readBody(event)

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const { title, year, draft = false, content = '' } = body

  if (!title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Title is required' })
  }

  const { blobs } = await list({ prefix: `poems/${slug}.json` })
  if (!blobs.some(b => b.pathname === `poems/${slug}.json`)) {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  const poem = {
    title: title.trim(),
    slug,
    year: Number(year) || new Date().getFullYear(),
    draft: Boolean(draft),
    content,
  }

  await put(`poems/${slug}.json`, JSON.stringify(poem), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { ok: true, slug }
})
