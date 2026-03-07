export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const authenticated = localStorage.getItem('sanctum_auth') === 'true'

  if (!authenticated) {
    return navigateTo('/sanctum-login')
  }
})
