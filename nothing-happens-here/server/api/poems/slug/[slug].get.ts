import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug') || ''

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid poem slug',
    })
  }

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  )

  const { data: poem, error } = await supabase
    .from('poems')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !poem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }

  return poem
})
