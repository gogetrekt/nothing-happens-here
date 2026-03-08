import { promises as fs } from 'fs'
import { join } from 'path'
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

  const filePath = join(process.cwd(), 'content', 'poems', `${slug}.md`)

  try {
    await fs.access(filePath)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  const poemYear = Number(year) || new Date().getFullYear()
  await fs.writeFile(filePath, buildMarkdown(title.trim(), slug, poemYear, Boolean(draft), content), 'utf-8')

  return { ok: true, slug }
})
