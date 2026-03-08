<script setup lang="ts">
definePageMeta({
  middleware: 'sanctum-auth'
})

interface Poem {
  slug: string
  title: string
  year: number
  draft: boolean
  content: string
}

const { data: poems, refresh } = await useAsyncData('sanctum-poems', async () => {
  const result = await $fetch<Poem[]>('/api/poems')
  return result
})

const deleting = ref<string | null>(null)

async function handleDelete(poem: Poem) {
  if (!confirm(`Delete "${poem.title}"?`)) return
  deleting.value = poem.slug
  try {
    await $fetch(`/api/poems/${poem.slug}`, { method: 'DELETE' })
    await refresh()
  } catch (err) {
    console.error('Delete failed:', err)
  } finally {
    deleting.value = null
  }
}

function handleLogout() {
  localStorage.removeItem('sanctum_auth')
  navigateTo('/')
}

useHead({ title: 'Sanctum - Nothing Happens Here' })
</script>

<template>
  <div class="min-h-screen bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">
      <header>
        <h1 class="font-serif text-[28px] sm:text-[32px] font-medium tracking-tight text-neutral-300 leading-tight">
          Sanctum
        </h1>
        <p class="mt-2 text-xs uppercase tracking-[0.25em] text-neutral-500">poem management</p>
        <hr class="mt-6 border-t border-neutral-800" />
      </header>

      <section class="mt-12">
        <div class="flex items-center justify-between mb-8">
          <p class="text-neutral-500 text-sm tracking-wider lowercase">poems</p>
          <NuxtLink
            to="/sanctum/new"
            class="text-sm text-neutral-400 hover:text-white tracking-wider lowercase border border-neutral-800 px-3 py-1 transition-colors duration-100"
          >
            + new
          </NuxtLink>
        </div>

        <p v-if="!poems || poems.length === 0" class="text-neutral-500 text-sm">
          no poems yet.
        </p>

        <ul v-else class="space-y-4">
          <li
            v-for="poem in poems"
            :key="poem.slug"
            class="border-b border-neutral-900 pb-4"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <NuxtLink
                  :to="`/poem/${poem.slug}`"
                  class="text-neutral-200 hover:text-white transition-colors font-serif"
                >
                  {{ poem.title }}
                </NuxtLink>
                <p class="text-neutral-600 text-sm mt-1">
                  {{ poem.year }}{{ poem.draft ? ' · draft' : '' }}
                </p>
              </div>
              <div class="flex gap-4 shrink-0">
                <NuxtLink
                  :to="`/sanctum/edit/${poem.slug}`"
                  class="text-sm text-neutral-400 hover:text-white tracking-wider lowercase transition-colors"
                >
                  edit
                </NuxtLink>
                <button
                  :disabled="deleting === poem.slug"
                  class="text-sm text-neutral-400 hover:text-red-400 tracking-wider lowercase transition-colors disabled:opacity-40"
                  @click="handleDelete(poem)"
                >
                  {{ deleting === poem.slug ? '...' : 'delete' }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <nav class="mt-14 flex items-center gap-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
        >
          <span>←</span>
          <span>back</span>
        </NuxtLink>
        <button
          class="text-sm uppercase tracking-wide text-neutral-500 hover:text-red-400 transition-colors duration-150"
          @click="handleLogout"
        >
          logout
        </button>
      </nav>
    </main>
  </div>
</template>
