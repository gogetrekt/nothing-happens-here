import { promises as fs } from 'fs'
import { join } from 'path'
import { buildMarkdown, sanitizeSlug } from '../utils/markdown'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, slug, year, draft = false, content = '' } = body

  if (!title?.trim() || !slug?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Title and slug are required' })
  }

  const safeSlug = sanitizeSlug(slug)
  if (!safeSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const filePath = join(process.cwd(), 'content', 'poems', `${safeSlug}.md`)

  try {
    await fs.access(filePath)
    throw createError({ statusCode: 409, statusMessage: 'A poem with this slug already exists' })
  } catch (err: any) {
    if (err.statusCode === 409) throw err
  }

  const poemYear = Number(year) || new Date().getFullYear()
  await fs.writeFile(filePath, buildMarkdown(title.trim(), safeSlug, poemYear, Boolean(draft), content), 'utf-8')

  return { ok: true, slug: safeSlug }
})
