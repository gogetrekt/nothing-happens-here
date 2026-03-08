import { list } from '@vercel/blob'

const fetchBlob = (url: string) =>
  fetch(url, { headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` } })

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'id') || ''

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid slug' })
  }

  const { blobs } = await list({ prefix: `poems/${slug}.json` })
  const blob = blobs.find(b => b.pathname === `poems/${slug}.json`)

  if (!blob) {
    throw createError({ statusCode: 404, statusMessage: 'Poem not found' })
  }

  const res = await fetchBlob(blob.url)
  if (!res.ok) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch poem content' })
  }

  return await res.json()
})
