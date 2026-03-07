import { createClient } from "@supabase/supabase-js"

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  )

  const { data, error } = await supabase
    .from("poems")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return data
})
