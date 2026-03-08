<script setup lang="ts">
interface Poem {
  slug: string
  title: string
  year: number
  draft: boolean
  content: string
}

const { data: poems } = await useAsyncData('poems', async () => {
  const result = await $fetch<Poem[]>('/api/poems')
  return result
})

useHead({
  title: 'Nothing Happens Here',
})
</script>

<template>
  <div class="bg-[#0b0b0b]">
    <main class="max-w-2xl mx-auto px-6 pt-20 pb-16">

      <!-- Site Title -->
      <header>
        <h1 class="font-serif text-[30px] sm:text-[36px] lg:text-[42px] font-medium tracking-tight text-neutral-300 leading-tight">
          Nothing Happens Here
        </h1>
        <hr class="mt-6 border-t border-neutral-800" />
      </header>

      <!-- Latest Poems -->
      <section v-if="poems && poems.length" class="mt-12">
        <p class="text-sm uppercase tracking-widest text-neutral-500">
          latest
        </p>
        <ul class="mt-5 space-y-5">
          <li v-for="poem in poems?.slice(0, 5)" :key="poem.slug" class="group">
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

      <!-- Navigation -->
      <nav class="mt-14 flex items-center gap-6">
        <NuxtLink
          to="/archive"
          class="inline-flex items-center gap-1.5 text-sm uppercase tracking-wide text-neutral-400 hover:text-white transition-colors duration-150"
        >
          <span>archive</span>
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </nav>

    </main>
  </div>
</template>
