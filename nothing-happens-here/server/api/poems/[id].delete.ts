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
  
  const { error } = await supabase
    .from('poems')
    .delete()
    .eq('id', id)
  
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poem not found',
    })
  }
  
  return { success: true }
})
