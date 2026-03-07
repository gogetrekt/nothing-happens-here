<script setup lang="ts">
interface Poem {
  id: number
  title: string
  slug: string
  year: number
  content: string
  created_at: string
}

const { data: allPoems } = await useFetch<Poem[]>('/api/poems')

const years = computed(() => {
  const grouped: Record<number, Poem[]> = {}
  for (const poem of (allPoems.value ?? [])) {
    ;(grouped[poem.year] ??= []).push(poem)
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, poems]) => ({ year: Number(year), poems }))
})

useHead({
  title: 'Archive — Nothing Happens Here',
})
</script>

<template>
  <div class="bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">
      <header>
        <h1 class="font-serif text-[26px] sm:text-[30px] lg:text-[34px] font-medium tracking-tight text-neutral-300 leading-tight">
          Archive
        </h1>
        <hr class="mt-6 border-t border-neutral-800" />
      </header>

      <div class="mt-12 space-y-14">
        <section v-for="group in years" :key="group.year">
          <p class="text-sm uppercase tracking-widest text-neutral-500">
            {{ group.year }}
          </p>
          <ul class="mt-5 space-y-5">
            <PoemItem
              v-for="poem in group.poems"
              :key="poem.id"
              :title="poem.title"
              :slug="poem.slug"
            />
          </ul>
        </section>
      </div>

      <nav class="mt-14 flex items-center gap-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
        >
          <span>←</span>
          <span>back</span>
        </NuxtLink>
      </nav>
    </main>
  </div>
</template>
