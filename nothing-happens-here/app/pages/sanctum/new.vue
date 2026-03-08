<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum-auth'
})

const form = reactive({
  title: '',
  slug: '',
  year: new Date().getFullYear(),
  draft: false,
  content: '',
})

const isSaving = ref(false)
const error = ref('')

function autoSlug() {
  if (!form.slug) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }
}

async function handleSave() {
  if (!form.title.trim() || !form.slug.trim()) {
    error.value = 'Title and slug are required'
    return
  }

  isSaving.value = true
  error.value = ''

  try {
    await $fetch('/api/poems', {
      method: 'POST',
      body: {
        title: form.title,
        slug: form.slug,
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
  title: 'New Poem - Sanctum',
})
</script>

<template>
  <div class="min-h-screen bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">
      <header>
        <h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight">
          New Poem
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
            placeholder="Poem title"
            class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"
            @blur="autoSlug"
          />
        </div>

        <div>
          <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
            Slug
          </label>
          <input
            v-model="form.slug"
            type="text"
            placeholder="poem-slug"
            class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-mono text-sm outline-none focus:border-neutral-500 transition-colors"
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
              id="draft-new"
              v-model="form.draft"
              type="checkbox"
              class="accent-neutral-400"
            />
            <label for="draft-new" class="text-sm uppercase tracking-widest text-neutral-500 cursor-pointer">
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
            placeholder="Write your poem here..."
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
    </main>
  </div>
</template>
