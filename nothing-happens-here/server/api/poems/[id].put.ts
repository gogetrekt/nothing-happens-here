import { updatePoem } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid poem ID',
    })
  }

  if (!body.title || !body.slug || !body.year || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, slug, year, and content are required',
    })
  }

  const poem = updatePoem(id, body.title, body.slug, Number(body.year), body.content)

  if (!poem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }

  return poem
})
