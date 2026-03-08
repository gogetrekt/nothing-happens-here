import { list } from '@vercel/blob'

const fetchBlob = (url: string) =>
  fetch(url, { headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` } })

export default defineEventHandler(async () => {
  const { blobs } = await list({ prefix: 'poems/' })

  const jsonBlobs = blobs.filter(b => b.pathname.endsWith('.json'))

  const poems = await Promise.all(
    jsonBlobs.map(async (blob) => {
      try {
        const res = await fetchBlob(blob.url)
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
