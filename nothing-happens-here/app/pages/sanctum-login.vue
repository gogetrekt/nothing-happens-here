<script setup lang="ts">
definePageMeta({
  layout: false,
})

const PASSWORD = 'ink'

const input = ref('')
const error = ref('')

function handleLogin() {
  if (input.value === PASSWORD) {
    localStorage.setItem('sanctum_auth', 'true')
    navigateTo('/sanctum')
  } else {
    error.value = 'Incorrect password'
  }
}

useHead({ title: 'Login - Nothing Happens Here' })
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-6">
      <form class="w-full max-w-sm space-y-6" @submit.prevent="handleLogin">
        <h1 class="font-serif text-[22px] text-neutral-300 tracking-tight text-center">
          sanctum
        </h1>

        <div>
          <input
            v-model="input"
            type="password"
            placeholder="password"
            autocomplete="off"
            class="w-full bg-transparent border border-neutral-700 text-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors text-center tracking-widest"
          />
        </div>

        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full text-sm uppercase tracking-wide text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 px-6 py-2 transition-colors"
        >
          enter
        </button>
      </form>
    </div>
  </ClientOnly>
</template>
