<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

interface Poem {
  slug: string
  title: string
  year: number
  draft: boolean
  content: string
}

const { data: poem } = await useFetch<Poem>(`/api/poems/${slug}`)
const { data: allPoems } = await useFetch<Poem[]>('/api/poems')

const sortedPoems = computed(() =>
  (allPoems.value ?? [])
    .filter(p => !p.draft)
    .slice()
)

const currentIndex = computed(() =>
  sortedPoems.value.findIndex(p => p.slug === slug)
)

const prevPoem = computed(() =>
  currentIndex.value > 0 ? sortedPoems.value[currentIndex.value - 1] : null
)

const nextPoem = computed(() =>
  currentIndex.value < sortedPoems.value.length - 1 ? sortedPoems.value[currentIndex.value + 1] : null
)

useHead({
  title: () => poem.value ? `${poem.value.title} - Nothing Happens Here` : 'Not Found',
})
</script>

<template>
  <div class="bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">
      <template v-if="poem">
        <h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight">
          {{ poem.title }}
        </h1>
        <p class="mt-2 font-serif text-sm font-normal text-neutral-300 opacity-50">
          {{ poem.year }}
        </p>
        <div class="mt-10 font-serif text-[17px] text-neutral-300 leading-[2] whitespace-pre-wrap">
          {{ poem.content }}
        </div>

        <nav class="mt-14 flex items-center gap-8 text-sm uppercase tracking-wide text-neutral-400">
          <NuxtLink v-if="prevPoem" :to="`/poem/${prevPoem.slug}`" class="inline-flex items-center gap-1 hover:text-white transition-colors duration-150">
            <span>←</span><span>previous</span>
          </NuxtLink>

          <NuxtLink to="/" class="hover:text-white transition-colors duration-150">home</NuxtLink>

          <NuxtLink v-if="nextPoem" :to="`/poem/${nextPoem.slug}`" class="inline-flex items-center gap-1 hover:text-white transition-colors duration-150">
            <span>next</span><span>→</span>
          </NuxtLink>
        </nav>
      </template>

      <template v-else>
        <p class="font-serif text-[17px] text-neutral-500 leading-relaxed">This poem does not exist.</p>
        <nav class="mt-10">
          <NuxtLink
            to="/"
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
