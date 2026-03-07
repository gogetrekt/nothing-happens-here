<script setup lang="ts">
interface Poem {
  id: string
  title: string
  slug: string
  content: string
  created_at: string
}

defineProps<{
  poems: Poem[]
  label?: string
}>()
</script>

<template>
  <div>
    <p v-if="label" class="text-xs uppercase tracking-[0.25em] text-neutral-500">
      {{ label }}
    </p>
    <ul class="mt-6 space-y-6">
      <PoemItem
        v-for="poem in poems"
        :key="poem.id"
        :title="poem.title"
        :slug="poem.slug"
        :id="poem.id"
      />
    </ul>
  </div>
</template>
