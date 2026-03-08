import { promises as fs } from 'fs'
import { join } from 'path'
import { parseFrontmatter } from '../utils/markdown'

export default defineEventHandler(async () => {
  const dir = join(process.cwd(), 'content', 'poems')

  let files: string[]
  try {
    files = await fs.readdir(dir)
  } catch {
    return []
  }

  const poems = []
  for (const file of files.filter(f => f.endsWith('.md'))) {
    const raw = await fs.readFile(join(dir, file), 'utf-8')
    const { frontmatter, body } = parseFrontmatter(raw)
    const yearFromDate = frontmatter.date
      ? new Date(frontmatter.date).getFullYear()
      : new Date().getFullYear()
    poems.push({
      slug: frontmatter.slug || file.replace('.md', ''),
      title: frontmatter.title || '',
      year: frontmatter.year ?? yearFromDate,
      draft: frontmatter.draft ?? false,
      content: body,
    })
  }

  return poems.sort((a, b) => b.year - a.year)
})
