import { list, del } from '@vercel/blob'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id') || ''
  const config = useRuntimeConfig(event)
  const token = config.blobReadWriteToken

  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage not configured. Set BLOB_READ_WRITE_TOKEN environment variable.',
    })
  }

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const { blobs } = await list({ prefix: `poems/${slug}.json`, token })
  const blob = blobs.find(b => b.pathname === `poems/${slug}.json`)

  if (!blob) {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  await del(blob.url, { token })

  return { success: true }
})
