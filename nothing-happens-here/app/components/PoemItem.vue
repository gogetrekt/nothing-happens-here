<script setup lang="ts">
defineProps<{
  title: string
  slug: string
}>()
</script>

<template>
  <li class="group">
    <NuxtLink
      :to="`/poem/${slug}`"
      class="inline-flex items-center gap-2 text-neutral-200 hover:text-white transition-colors duration-150"
    >
      <span class="font-serif text-lg leading-snug">{{ title }}</span>
      <span
        class="text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        aria-hidden="true"
      >→</span>
    </NuxtLink>
  </li>
</template>
