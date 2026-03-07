import { _ as __nuxt_component_0 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRoute } from './server.mjs';
import { u as useFetch } from './fetch-BDdGpuAh.mjs';
import { u as useHead } from './composables-DVc8PcjS.mjs';
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
import '@vue/shared';
import './asyncData-DL2MTIKk.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const { data: poem } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/poems/slug/${slug}`,
      "$MA9L8TScGy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: () => poem.value ? `${poem.value.title} — Nothing Happens Here` : "Not Found"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16">`);
      if (unref(poem)) {
        _push(`<!--[--><h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight">${ssrInterpolate(unref(poem).title)}</h1><div class="mt-10 font-serif text-[17px] text-neutral-300 leading-[2] whitespace-pre-wrap">${ssrInterpolate(unref(poem).content)}</div><nav class="mt-14 flex items-center gap-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>←</span><span${_scopeId}>back</span>`);
            } else {
              return [
                createVNode("span", null, "←"),
                createVNode("span", null, "back")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav><!--]-->`);
      } else {
        _push(`<!--[--><p class="font-serif text-[17px] text-neutral-500 leading-relaxed">This poem does not exist.</p><nav class="mt-10">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>←</span><span${_scopeId}>back</span>`);
            } else {
              return [
                createVNode("span", null, "←"),
                createVNode("span", null, "back")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav><!--]-->`);
      }
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/poem/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CoiiCLmI.mjs.map
