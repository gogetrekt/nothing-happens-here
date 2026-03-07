<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()

const form = ref({
  title: '',
  slug: '',
  year: new Date().getFullYear(),
  content: ''
})

const error = ref('')
const isSaving = ref(false)

const handleSave = async () => {
  try {
    isSaving.value = true
    error.value = ''

    const response = await $fetch('/api/poems', {
      method: 'POST',
      body: {
        title: form.value.title,
        slug: form.value.slug,
        year: form.value.year,
        content: form.value.content
      }
    })

    await router.push(`/poem/${response.slug}`)
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to save poem'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="bg-[#0b0b0b]">
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
          />
        </div>

        <div>
          <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
            Slug
          </label>
          <input
            v-model="form.slug"
            type="text"
            placeholder="e.g. winter, someone-wrote-this"
            class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-mono text-sm outline-none focus:border-neutral-500 transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm uppercase tracking-widest text-neutral-500 mb-3">
            Year
          </label>
          <input
            v-model.number="form.year"
            type="number"
            placeholder="2026"
            class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 font-serif text-lg outline-none focus:border-neutral-500 transition-colors"
          />
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
            to="/"
            class="text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors"
          >
            cancel
          </NuxtLink>
        </div>
      </form>
    </main>
  </div>
</template>
