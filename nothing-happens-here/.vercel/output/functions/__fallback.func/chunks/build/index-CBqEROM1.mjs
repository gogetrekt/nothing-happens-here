import { _ as __nuxt_component_0 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-DL2MTIKk.mjs';
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
import './server.mjs';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: poems } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "poems",
      () => $fetch("/api/poems")
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Nothing Happens Here"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16"><header><h1 class="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-medium tracking-tight text-neutral-300 leading-tight"> Nothing Happens Here </h1><hr class="mt-6 border-t border-neutral-800"></header>`);
      if (unref(poems) && unref(poems).length) {
        _push(`<section class="mt-12"><p class="text-sm uppercase tracking-widest text-neutral-500"> latest </p><ul class="mt-5 space-y-5"><!--[-->`);
        ssrRenderList(unref(poems), (poem) => {
          _push(`<li class="group">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/poem/${poem.slug || poem.id}`,
            class: "inline-flex items-center gap-2 text-neutral-200 hover:text-white transition-colors duration-150"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="font-serif text-lg leading-snug"${_scopeId}>${ssrInterpolate(poem.title)}</span><span class="text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true"${_scopeId}>→</span>`);
              } else {
                return [
                  createVNode("span", { class: "font-serif text-lg leading-snug" }, toDisplayString(poem.title), 1),
                  createVNode("span", {
                    class: "text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150",
                    "aria-hidden": "true"
                  }, "→")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="mt-14 flex items-center gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/archive",
        class: "inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>archive</span><span aria-hidden="true"${_scopeId}>→</span>`);
          } else {
            return [
              createVNode("span", null, "archive"),
              createVNode("span", { "aria-hidden": "true" }, "→")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CBqEROM1.mjs.map
