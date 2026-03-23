<script setup lang="ts">
let clickCount = 0
let resetTimer: ReturnType<typeof setTimeout> | null = null
let hideLoadingTimer: ReturnType<typeof setTimeout> | null = null
let loadingStartedAt = 0

const isPageLoading = ref(false)
const nuxtApp = useNuxtApp()

const MIN_LOADING_VISIBLE_MS = 240

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

function startPageLoading() {
  if (hideLoadingTimer) {
    clearTimeout(hideLoadingTimer)
    hideLoadingTimer = null
  }
  loadingStartedAt = Date.now()
  isPageLoading.value = true
}

function stopPageLoading() {
  const elapsed = Date.now() - loadingStartedAt
  const remaining = Math.max(0, MIN_LOADING_VISIBLE_MS - elapsed)

  hideLoadingTimer = setTimeout(() => {
    isPageLoading.value = false
    hideLoadingTimer = null
  }, remaining)
}

nuxtApp.hook('page:start', startPageLoading)
nuxtApp.hook('page:finish', stopPageLoading)
nuxtApp.hook('page:loading:end', stopPageLoading)
</script>

<template>
  <div class="bg-[#0b0b0b]">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator class="quiet-loading-bar" :height="1.5" :throttle="120" color="linear-gradient(90deg, rgba(229,229,229,0.16), rgba(229,229,229,0.32), rgba(229,229,229,0.16))" />
    <main class="relative page-shell" :class="{ 'is-loading': isPageLoading }">
      <NuxtPage />
    </main>
    <footer class="w-full pt-6 pb-8">
      <p class="font-serif text-sm text-neutral-600 opacity-60 leading-relaxed text-center tracking-wide" @click="handleFooterClick">left here by r</p>
    </footer>
  </div>
</template>
