import { createClient } from "@supabase/supabase-js"

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

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

  // Backfill missing slugs for existing poems
  const poems = data || []
  const needsSlug = poems.filter((p: any) => !p.slug)
  for (const poem of needsSlug) {
    const slug = slugify(poem.title)
    await supabase.from('poems').update({ slug }).eq('id', poem.id)
    poem.slug = slug
  }

  return poems
})
