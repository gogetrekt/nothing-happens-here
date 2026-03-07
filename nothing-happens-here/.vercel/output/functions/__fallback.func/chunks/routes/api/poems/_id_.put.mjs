import { d as defineEventHandler, b as getRouterParam, r as readBody, c as createError, a as useRuntimeConfig } from '../../../_/nitro.mjs';
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
const _id__put = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id") || "";
  const body = await readBody(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid poem ID"
    });
  }
  if (!body.title || !body.content) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title and content are required"
    });
  }
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  );
  const { data: poem, error } = await supabase.from("poems").update({
    title: body.title,
    content: body.content,
    slug: slugify(body.title)
  }).eq("id", id).select().single();
  if (error || !poem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poem not found"
    });
  }
  return poem;
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
