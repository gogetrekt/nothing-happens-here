<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum-auth'
})

const route = useRoute()
const slug = route.params.id as string

interface Poem {
  slug: string
  title: string
  year: number
  draft: boolean
  content: string
}

const { data: poem } = await useFetch<Poem>(`/api/poems/${slug}`)

const form = reactive({
  title: '',
  slug: '',
  year: new Date().getFullYear(),
  draft: false,
  content: '',
})

watch(poem, (newPoem) => {
  if (newPoem) {
    form.title = newPoem.title
    form.slug = newPoem.slug
    form.year = newPoem.year
    form.draft = newPoem.draft
    form.content = newPoem.content
  }
}, { immediate: true })

const isSaving = ref(false)
const error = ref('')

async function handleSave() {
  if (!form.title.trim()) {
    error.value = 'Title is required'
    return
  }

  isSaving.value = true
  error.value = ''

  try {
    await $fetch(`/api/poems/${slug}`, {
      method: 'PUT',
      body: {
        title: form.title,
        year: form.year,
        draft: form.draft,
        content: form.content,
      },
    })
    await navigateTo('/sanctum')
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Failed to save poem'
    console.error('Save error:', err)
  } finally {
    isSaving.value = false
  }
}

useHead({
  title: () => poem.value ? `Edit: ${poem.value.title} — Sanctum` : 'Not Found',
})
</script>

<template>
  <div class="min-h-screen bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">
      <template v-if="poem">
        <header>
          <h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight">
            Edit Poem
          </h1>
          <hr class="mt-6 border-t border-neutral-800" />
        </header>

        <form class="mt-12 space-y-8" @submit.prevent="handleSave">
          <div>
            <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
              Title
            </label>
            <input
              v-model="form.title"
              type="text"
              class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
              Slug
            </label>
            <input
              v-model="form.slug"
              type="text"
              disabled
              class="w-full bg-transparent border border-neutral-800 text-neutral-600 px-4 py-3 font-mono text-sm outline-none cursor-not-allowed"
            />
          </div>

          <div class="flex gap-6">
            <div class="flex-1">
              <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
                Year
              </label>
              <input
                v-model.number="form.year"
                type="number"
                min="1900"
                max="2100"
                class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 outline-none focus:border-neutral-500 transition-colors"
              />
            </div>
            <div class="flex items-end pb-3 gap-2">
              <input
                id="draft-edit"
                v-model="form.draft"
                type="checkbox"
                class="accent-neutral-400"
              />
              <label for="draft-edit" class="text-sm uppercase tracking-widest text-neutral-500 cursor-pointer">
                Draft
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
              Content
            </label>
            <textarea
              v-model="form.content"
              rows="20"
              class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-base outline-none focus:border-neutral-500 transition-colors resize-y"
            />
          </div>

          <div v-if="error" class="text-red-400 text-sm">
            {{ error }}
          </div>

          <div class="flex gap-4 pt-2">
            <button
              type="submit"
              :disabled="isSaving"
              class="text-sm uppercase tracking-wide text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 px-6 py-2 transition-colors disabled:opacity-50"
            >
              {{ isSaving ? 'saving...' : 'save' }}
            </button>
            <NuxtLink
              to="/sanctum"
              class="text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors"
            >
              cancel
            </NuxtLink>
          </div>
        </form>
      </template>

      <template v-else>
        <p class="font-serif text-[17px] text-neutral-500 leading-relaxed">Poem not found.</p>
        <nav class="mt-10">
          <NuxtLink
            to="/sanctum"
            class="inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
          >
            <span>←</span>
            <span>back</span>
          </NuxtLink>
        </nav>
      </template>
    </main>
  </div>
</template>
