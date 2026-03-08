import { promises as fs } from 'fs'
import { join } from 'path'
import { parseFrontmatter } from '../../../utils/markdown'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const filePath = join(process.cwd(), 'content', 'poems', `${slug}.md`)

  let raw: string
  try {
    raw = await fs.readFile(filePath, 'utf-8')
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  const { frontmatter, body } = parseFrontmatter(raw)

  return {
    slug: frontmatter.slug || slug,
    title: frontmatter.title || '',
    year: frontmatter.year ?? new Date().getFullYear(),
    draft: frontmatter.draft ?? false,
    content: body,
  }
})
