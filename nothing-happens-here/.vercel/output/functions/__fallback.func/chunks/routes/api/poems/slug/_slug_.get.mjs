import { d as defineEventHandler, b as getRouterParam, c as createError, a as useRuntimeConfig } from '../../../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:crypto';

const _slug__get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const slug = getRouterParam(event, "slug") || "";
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid poem slug"
    });
  }
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  );
  const { data: bySlug } = await supabase.from("poems").select("*").eq("slug", slug).maybeSingle();
  if (bySlug) return bySlug;
  const { data: byId } = await supabase.from("poems").select("*").eq("id", slug).maybeSingle();
  if (byId) return byId;
  throw createError({
    statusCode: 404,
    statusMessage: "Poem not found"
  });
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
