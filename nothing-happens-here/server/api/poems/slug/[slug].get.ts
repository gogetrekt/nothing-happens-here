import { getPoemBySlug } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid poem slug',
    })
  }

  const poem = getPoemBySlug(slug)

  if (!poem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }

  return poem
})
