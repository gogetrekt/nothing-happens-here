import { list } from '@vercel/blob'

const fetchBlob = (url: string, token: string) =>
  fetch(url, { headers: { authorization: `Bearer ${token}` } })

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const token = config.blobReadWriteToken

  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage not configured. Set BLOB_READ_WRITE_TOKEN environment variable.',
    })
  }

  const { blobs } = await list({ prefix: 'poems/', token })

  const jsonBlobs = blobs.filter(b => b.pathname.endsWith('.json'))

  const poems = await Promise.all(
    jsonBlobs.map(async (blob) => {
      try {
        const res = await fetchBlob(blob.url, token)
        return await res.json()
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
