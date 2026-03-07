<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()
</script>

<template>
  <article>
    <header>
      <h1 class="font-serif text-[28px] sm:text-[32px] lg:text-[36px] font-medium tracking-tight text-neutral-300 leading-tight">
        {{ title }}
      </h1>
      <hr class="mt-6 border-t border-neutral-800" />
    </header>
    <div
      class="mt-10 font-serif text-base md:text-lg whitespace-pre-line leading-loose text-neutral-200 tracking-[0.01em]"
      v-html="content"
    />
  </article>
</template>
