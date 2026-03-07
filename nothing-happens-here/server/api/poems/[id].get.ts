import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id') || ''
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid poem ID',
    })
  }
  
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  )
  
  const { data: poem, error } = await supabase
    .from('poems')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error || !poem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }
  
  return poem
})
