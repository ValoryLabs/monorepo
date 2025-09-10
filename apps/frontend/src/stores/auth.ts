import router from '@/router'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

interface AuthState {
  isAuthenticated: Ref<boolean>
  token: Ref<string | null>
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = defineStore('user', (): AuthState => {
  const token: string | null =
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('Authorization='))
      ?.split('=')[1] || null

  const isAuthenticated: Ref<boolean> = ref(token !== null)
  const currentToken: Ref<string | null> = ref(token)

  function setToken(token: string): void {
    currentToken.value = token
    isAuthenticated.value = true
  }

  function logout(): void {
    currentToken.value = null
    isAuthenticated.value = false
    document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/')
  }

  return {
    isAuthenticated,
    token: currentToken,
    setToken,
    logout,
  }
})
