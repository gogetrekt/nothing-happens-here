import { createPoem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title || !body.slug || !body.year || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, slug, year, and content are required',
    })
  }

  const poem = createPoem(body.title, body.slug, Number(body.year), body.content)
  return poem
})
