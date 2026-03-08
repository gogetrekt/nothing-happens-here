import { put, list } from '@vercel/blob'
import { buildMarkdown } from '../../utils/markdown'

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

  const { blobs } = await list({ prefix: `poems/${slug}.md` })
  if (!blobs.some(b => b.pathname === `poems/${slug}.md`)) {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  const poemYear = Number(year) || new Date().getFullYear()
  const markdown = buildMarkdown(title.trim(), slug, poemYear, Boolean(draft), content)

  await put(`poems/${slug}.md`, markdown, {
    access: 'public',
    contentType: 'text/plain; charset=utf-8',
    addRandomSuffix: false,
    allowOverwrite: true,
  })

  return { ok: true, slug }
})
