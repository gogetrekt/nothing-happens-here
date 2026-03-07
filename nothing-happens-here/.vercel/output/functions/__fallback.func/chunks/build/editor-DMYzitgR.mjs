import { _ as __nuxt_component_0 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRouter } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "editor",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const form = ref({
      title: "",
      slug: "",
      year: (/* @__PURE__ */ new Date()).getFullYear(),
      content: ""
    });
    const error = ref("");
    const isSaving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16"><header><h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight"> New Poem </h1><hr class="mt-6 border-t border-neutral-800"></header><form class="mt-12 space-y-8"><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Title </label><input${ssrRenderAttr("value", form.value.title)} type="text" placeholder="Poem title" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"></div><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Slug </label><input${ssrRenderAttr("value", form.value.slug)} type="text" placeholder="e.g. winter, someone-wrote-this" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-mono text-sm outline-none focus:border-neutral-500 transition-colors"></div><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Year </label><input${ssrRenderAttr("value", form.value.year)} type="number" placeholder="2026" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"></div><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Content </label><textarea placeholder="Write your poem here..." rows="20" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-base outline-none focus:border-neutral-500 transition-colors resize-y">${ssrInterpolate(form.value.content)}</textarea></div>`);
      if (error.value) {
        _push(`<div class="text-red-400 text-sm">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex gap-4 pt-2"><button type="submit"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="text-sm uppercase tracking-wide text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 px-6 py-2 transition-colors disabled:opacity-50">${ssrInterpolate(isSaving.value ? "saving..." : "save")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/editor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=editor-DMYzitgR.mjs.map
