<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum-auth'
})

const route = useRoute()
const id = route.params.id as string

interface Poem {
  id: string
  title: string
  slug: string
  content: string
  created_at: string
}

const { data: poem } = await useFetch<Poem>(`/api/poems/${id}`)

const form = reactive({
  title: '',
  content: '',
})

watch(poem, (newPoem) => {
  if (newPoem) {
    form.title = newPoem.title
    form.content = newPoem.content
  }
}, { immediate: true })

const isSaving = ref(false)
const error = ref('')

async function handleSave() {
  if (!form.title.trim() || !form.content.trim()) {
    error.value = 'Title and content are required'
    return
  }

  isSaving.value = true
  error.value = ''

  try {
    await $fetch(`/api/poems/${id}`, {
      method: 'PUT',
      body: {
        title: form.title,
        content: form.content,
      },
    })
    await navigateTo('/sanctum')
  } catch (err) {
    error.value = 'Failed to save poem'
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
