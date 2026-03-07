import { g as defineNuxtRouteMiddleware } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'better-sqlite3';
import 'node:crypto';
import 'vue-router';
import 'vue/server-renderer';

const sanctumAuth = defineNuxtRouteMiddleware((to) => {
  return;
});

export { sanctumAuth as default };
//# sourceMappingURL=sanctum-auth-N8g_gODk.mjs.map
