<script setup lang="ts">
interface Poem {
  slug: string
  title: string
  year: number
  draft: boolean
}

const { data: allPoems } = await useFetch<Poem[]>('/api/poems')

const years = computed(() => {
  const grouped: Record<number, Poem[]> = {}
  for (const poem of (allPoems.value ?? [])) {
    if (poem.draft) continue
    const year = poem.year
    ;(grouped[year] ??= []).push(poem)
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, poems]) => ({ year: Number(year), poems }))
})

const totalPoems = computed(() =>
  (allPoems.value ?? []).filter(p => !p.draft).length
)

const openYears = ref<Set<number>>(
  new Set((allPoems.value ?? []).map(p => p.year))
)
const sectionRefs = ref<Record<number, HTMLElement | null>>({})

function toggle(year: number) {
  if (openYears.value.has(year)) {
    openYears.value.delete(year)
  } else {
    openYears.value.add(year)
    nextTick(() => {
      sectionRefs.value[year]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

useHead({
  title: 'Archive - Nothing Happens Here',
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

      <div class="mt-12 space-y-0 divide-y divide-neutral-800/50">
        <section v-for="group in years" :key="group.year" :ref="el => sectionRefs[group.year] = el as HTMLElement | null">
          <button
            class="flex items-center gap-2 py-4 text-sm uppercase tracking-widest text-neutral-500 hover:text-neutral-300 transition-colors duration-150 cursor-pointer"
            @click="toggle(group.year)"
          >
            <span>{{ group.year }}</span>
            <span class="text-xs">{{ openYears.has(group.year) ? '▾' : '▸' }}</span>
          </button>
          <ul v-if="openYears.has(group.year)" class="pb-5 space-y-5">
            <li v-for="poem in group.poems" :key="poem.slug" class="group">
              <NuxtLink
                :to="`/poem/${poem.slug}`"
                class="inline-flex items-center gap-2 text-neutral-200 hover:text-white transition-colors duration-150"
              >
                <span class="font-serif text-lg leading-snug">{{ poem.title }}</span>
                <span
                  class="text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  aria-hidden="true"
                >→</span>
              </NuxtLink>
            </li>
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
