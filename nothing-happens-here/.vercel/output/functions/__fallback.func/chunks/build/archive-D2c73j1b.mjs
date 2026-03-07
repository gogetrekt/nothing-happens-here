import { _ as __nuxt_component_0$1 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
import './server.mjs';
import 'vue-router';
import '@vue/shared';
import './asyncData-DL2MTIKk.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PoemItem",
  __ssrInlineRender: true,
  props: {
    title: {},
    slug: {},
    id: {}
  },
  setup(__props) {
    const props = __props;
    const href = computed(() => `/poem/${props.slug || props.id}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<li${ssrRenderAttrs(mergeProps({ class: "group" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(href),
        class: "inline-flex items-center gap-2 text-neutral-200 hover:text-white transition-colors duration-150"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-serif text-lg leading-snug"${_scopeId}>${ssrInterpolate(__props.title)}</span><span class="text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true"${_scopeId}>→</span>`);
          } else {
            return [
              createVNode("span", { class: "font-serif text-lg leading-snug" }, toDisplayString(__props.title), 1),
              createVNode("span", {
                class: "text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150",
                "aria-hidden": "true"
              }, "→")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PoemItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "PoemItem" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "archive",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: allPoems } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/poems",
      "$9ivF-9lm-A"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const years = computed(() => {
      const grouped = {};
      for (const poem of allPoems.value ?? []) {
        const year = new Date(poem.created_at).getFullYear();
        (grouped[year] ??= []).push(poem);
      }
      return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a)).map(([year, poems]) => ({ year: Number(year), poems }));
    });
    useHead({
      title: "Archive — Nothing Happens Here"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PoemItem = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16"><header><h1 class="font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-medium tracking-tight text-neutral-300 leading-tight"> Archive </h1><hr class="mt-6 border-t border-neutral-800"></header><div class="mt-12 space-y-14"><!--[-->`);
      ssrRenderList(unref(years), (group) => {
        _push(`<section><p class="text-sm uppercase tracking-widest text-neutral-500">${ssrInterpolate(group.year)}</p><ul class="mt-5 space-y-5"><!--[-->`);
        ssrRenderList(group.poems, (poem) => {
          _push(ssrRenderComponent(_component_PoemItem, {
            key: poem.id,
            title: poem.title,
            slug: poem.slug,
            id: poem.id
          }, null, _parent));
        });
        _push(`<!--]--></ul></section>`);
      });
      _push(`<!--]--></div><nav class="mt-14 flex items-center gap-6">`);
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
      _push(`</nav></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/archive.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=archive-D2c73j1b.mjs.map
