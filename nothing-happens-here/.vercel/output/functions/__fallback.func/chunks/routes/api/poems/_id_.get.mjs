import { d as defineEventHandler, b as getRouterParam, c as createError, a as useRuntimeConfig } from '../../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:crypto';

const _id__get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, "id") || "";
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid poem ID"
    });
  }
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseKey
  );
  const { data: poem, error } = await supabase.from("poems").select("*").eq("id", id).single();
  if (error || !poem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poem not found"
    });
  }
  return poem;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
