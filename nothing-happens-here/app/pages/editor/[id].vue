<script setup lang="ts">
const route = useRoute()
const id = route.params.id
await navigateTo(`/sanctum/edit/${id}`, { replace: true })
</script>

<template>
  <div />
</template>
