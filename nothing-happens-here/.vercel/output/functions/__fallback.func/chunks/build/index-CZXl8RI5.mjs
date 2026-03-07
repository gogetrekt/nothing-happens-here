import { _ as __nuxt_component_0 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
    const { data: poems, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "sanctum-poems",
      () => $fetch("/api/poems")
    )), __temp = await __temp, __restore(), __temp);
    const deleting = ref(null);
    useHead({ title: "Sanctum — Nothing Happens Here" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16"><header><h1 class="font-serif text-[28px] sm:text-[32px] font-medium tracking-tight text-neutral-300 leading-tight"> Sanctum </h1><p class="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">poem management</p><hr class="mt-6 border-t border-neutral-800"></header><section class="mt-12"><div class="flex items-center justify-between mb-8"><p class="text-neutral-500 text-sm tracking-wider lowercase">poems</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sanctum/new",
        class: "text-sm text-neutral-400 hover:text-white tracking-wider lowercase border border-neutral-800 px-3 py-1 transition-colors duration-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + new `);
          } else {
            return [
              createTextVNode(" + new ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!unref(poems) || unref(poems).length === 0) {
        _push(`<p class="text-neutral-500 text-sm"> no poems yet. </p>`);
      } else {
        _push(`<ul class="space-y-4"><!--[-->`);
        ssrRenderList(unref(poems), (poem) => {
          _push(`<li class="border-b border-neutral-900 pb-4"><div class="flex items-start justify-between gap-4"><div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/poem/${poem.slug || poem.id}`,
            class: "text-neutral-200 hover:text-white transition-colors font-serif"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(poem.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(poem.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="text-neutral-600 text-sm mt-1">${ssrInterpolate(new Date(poem.created_at).getFullYear())}</p></div><div class="flex gap-4 shrink-0">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/sanctum/edit/${poem.id}`,
            class: "text-sm text-neutral-400 hover:text-white tracking-wider lowercase transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` edit `);
              } else {
                return [
                  createTextVNode(" edit ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button${ssrIncludeBooleanAttr(unref(deleting) === poem.id) ? " disabled" : ""} class="text-sm text-neutral-400 hover:text-red-400 tracking-wider lowercase transition-colors disabled:opacity-40">${ssrInterpolate(unref(deleting) === poem.id ? "..." : "delete")}</button></div></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`</section><nav class="mt-14 flex items-center gap-6">`);
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
      _push(`<button class="text-sm uppercase tracking-wide text-neutral-500 hover:text-red-400 transition-colors duration-150"> logout </button></nav></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sanctum/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CZXl8RI5.mjs.map
