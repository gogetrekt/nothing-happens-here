import { d as defineEventHandler, r as readBody, c as createError, a as useRuntimeConfig } from '../../_/nitro.mjs';
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
const poems_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  );
  const { error } = await supabase.from("poems").insert({
    title: body.title,
    content: body.content,
    slug: slugify(body.title || "")
  });
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
  return { ok: true };
});

export { poems_post as default };
//# sourceMappingURL=poems.post.mjs.map
