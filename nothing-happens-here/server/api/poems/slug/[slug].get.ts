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

  // Try slug match first
  const { data: bySlug } = await supabase
    .from('poems')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (bySlug) return bySlug

  // Fall back to ID lookup (for older links using UUID)
  const { data: byId } = await supabase
    .from('poems')
    .select('*')
    .eq('id', slug)
    .maybeSingle()

  if (byId) return byId

  throw createError({
    statusCode: 404,
    statusMessage: 'Poem not found',
  })
})
