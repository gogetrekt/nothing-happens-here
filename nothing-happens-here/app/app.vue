<script setup lang="ts">
let clickCount = 0
let resetTimer: ReturnType<typeof setTimeout> | null = null

function handleFooterClick() {
  if (resetTimer) clearTimeout(resetTimer)
  clickCount++
  if (clickCount >= 6) {
    clickCount = 0
    navigateTo('/sanctum-login')
    return
  }
  resetTimer = setTimeout(() => { clickCount = 0 }, 2000)
}
</script>

<template>
  <div class="bg-[#0b0b0b]">
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <footer class="w-full pt-6 pb-8">
      <p class="font-serif text-sm text-neutral-600 opacity-60 leading-relaxed text-center tracking-wide" @click="handleFooterClick">left here by r</p>
    </footer>
  </div>
</template>
