<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

interface Poem {
  slug: string
  title: string
  year: number
  content: string
}

const { data: poem } = await useFetch<Poem>(`/api/poems/${slug}`)

useHead({
  title: () => poem.value ? `${poem.value.title} — Nothing Happens Here` : 'Not Found',
})
</script>

<template>
  <div class="bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">
      <template v-if="poem">
        <h1 class="font-serif text-[26px] sm:text-[30px] font-medium tracking-tight text-neutral-300 leading-tight">
          {{ poem.title }}
        </h1>
        <div class="mt-10 font-serif text-[17px] text-neutral-300 leading-[2] whitespace-pre-wrap">
          {{ poem.content }}
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
