<script setup lang="ts">
const props = defineProps<{
  title: string
  slug: string
}>()

const href = computed(() => `/poem/${props.slug}`)
</script>

<template>
  <li class="group">
    <NuxtLink
      :to="href"
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
