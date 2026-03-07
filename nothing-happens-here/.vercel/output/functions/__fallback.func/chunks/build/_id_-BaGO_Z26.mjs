import { _ as __nuxt_component_0 } from './nuxt-link-06nbVXjB.mjs';
import { defineComponent, withAsyncContext, reactive, watch, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const { data: poem } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/poems/${id}`,
      "$wNgQ5bUqxC"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const form = reactive({
      title: "",
      content: ""
    });
    watch(poem, (newPoem) => {
      if (newPoem) {
        form.title = newPoem.title;
        form.content = newPoem.content;
      }
    }, { immediate: true });
    const isSaving = ref(false);
    const error = ref("");
    useHead({
      title: () => poem.value ? `Edit: ${poem.value.title} — Sanctum` : "Not Found"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0b0b0b]" }, _attrs))}><main class="max-w-2xl mx-auto px-6 pt-20 pb-16">`);
      if (unref(poem)) {
        _push(`<!--[--><header><h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight"> Edit Poem </h1><hr class="mt-6 border-t border-neutral-800"></header><form class="mt-12 space-y-8"><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Title </label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"></div><div><label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3"> Content </label><textarea rows="20" class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-base outline-none focus:border-neutral-500 transition-colors resize-y">${ssrInterpolate(unref(form).content)}</textarea></div>`);
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
        _push(`</div></form><!--]-->`);
      } else {
        _push(`<!--[--><p class="font-serif text-[17px] text-neutral-500 leading-relaxed">Poem not found.</p><nav class="mt-10">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/sanctum",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sanctum/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BaGO_Z26.mjs.map
