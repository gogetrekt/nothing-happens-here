import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid poem ID',
    })
  }

  if (!body.title || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and content are required',
    })
  }

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  )

  const { data: poem, error } = await supabase
    .from('poems')
    .update({
      title: body.title,
      content: body.content
    })
    .eq('id', id)
    .select()
    .single()

  if (error || !poem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }

  return poem
})
