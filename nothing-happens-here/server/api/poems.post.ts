import { createClient } from "@supabase/supabase-js"

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  )

  const { error } = await supabase
    .from("poems")
    .insert({
      title: body.title,
      content: body.content,
      slug: slugify(body.title || '')
    })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return { ok: true }
})
