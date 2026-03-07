import { _ as __nuxt_component_0 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      title: "",
      content: ""
    });
    const isSaving = ref(false);
    const error = ref("");
    useHead({
      title: "New Poem — Sanctum"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16"><header><h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight"> New Poem </h1><hr class="mt-6 border-t border-neutral-800"></header><form class="mt-12 space-y-8"><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Title </label><input${ssrRenderAttr("value", unref(form).title)} type="text" placeholder="Poem title" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"></div><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Content </label><textarea placeholder="Write your poem here..." rows="20" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-base outline-none focus:border-neutral-500 transition-colors resize-y">${ssrInterpolate(unref(form).content)}</textarea></div>`);
      if (unref(error)) {
        _push(`<div class="text-red-400 text-sm">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-4 pt-2"><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} class="text-sm uppercase tracking-wide text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 px-6 py-2 transition-colors disabled:opacity-50">${ssrInterpolate(unref(isSaving) ? "saving..." : "save")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sanctum",
        class: "text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` cancel `);
          } else {
            return [
              createTextVNode(" cancel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sanctum/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-CFUTU6Yj.mjs.map
