import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id') || ''

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const filePath = join(process.cwd(), 'content', 'poems', `${slug}.md`)

  try {
    await fs.unlink(filePath)
    return { success: true }
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }
})
