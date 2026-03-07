import { getPoemById } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid poem ID',
    })
  }
  
  const poem = getPoemById(id)
  
  if (!poem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }
  
  return poem
})
