import { list } from '@vercel/blob'
import { parseFrontmatter } from '../utils/markdown'

export default defineEventHandler(async () => {
  const { blobs } = await list({ prefix: 'poems/' })

  const mdBlobs = blobs.filter(b => b.pathname.endsWith('.md'))

  const poems = await Promise.all(
    mdBlobs.map(async (blob) => {
      try {
        const res = await fetch(blob.url)
        const text = await res.text()
        const { frontmatter, body } = parseFrontmatter(text)
        const slug = blob.pathname.replace('poems/', '').replace('.md', '')
        const yearFromDate = frontmatter.date
          ? new Date(frontmatter.date).getFullYear()
          : new Date().getFullYear()
        return {
          slug: frontmatter.slug || slug,
          title: frontmatter.title || '',
          year: frontmatter.year ?? yearFromDate,
          draft: frontmatter.draft ?? false,
          content: body,
        }
      } catch (err) {
        console.error(`[poems.get] Failed to fetch blob ${blob.pathname}:`, err)
        return null
      }
    })
  )

  return poems
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => b.year - a.year)
})
