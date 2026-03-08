import { list, del } from '@vercel/blob'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id') || ''

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const { blobs } = await list({ prefix: `poems/${slug}.md` })
  const blob = blobs.find(b => b.pathname === `poems/${slug}.md`)

  if (!blob) {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  await del(blob.url)

  return { success: true }
})
