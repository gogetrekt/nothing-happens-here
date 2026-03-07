import { d as defineEventHandler, c as createError, a as useRuntimeConfig } from '../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:crypto';

function slugify(title) {
  return title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}
const poems_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  );
  const { data, error } = await supabase.from("poems").select("*").order("created_at", { ascending: false });
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
  const poems = data || [];
  const needsSlug = poems.filter((p) => !p.slug);
  for (const poem of needsSlug) {
    const slug = slugify(poem.title);
    await supabase.from("poems").update({ slug }).eq("id", poem.id);
    poem.slug = slug;
  }
  return poems;
});

export { poems_get as default };
//# sourceMappingURL=poems.get.mjs.map
