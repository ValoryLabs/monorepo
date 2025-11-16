import axios from 'axios'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user: Ref<string | null> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<boolean> = ref(false)

    const lastFetchTime: Ref<number | null> = ref(null)
    const CACHE_DURATION = 30 * 60 * 1000

    const isCacheValid = (): boolean => {
      if (!lastFetchTime.value) return false
      const now = Date.now()
      return now - lastFetchTime.value < CACHE_DURATION
    }

    const fetchUser = async (force: boolean = false) => {
      if (!force && isCacheValid() && user.value) {
        return
      }

      loading.value = true
      error.value = false

      try {
        const response = await axios.get(`https://${import.meta.env.APP_BACKEND}/api/users/me`, {
          withCredentials: true,
        })
        user.value = await response.data
        lastFetchTime.value = Date.now()
        console.log('User data fetched from server')
      } catch (err: any) {
        error.value = true
        user.value = null
        console.log(err.response?.data?.detail || err.message)
      } finally {
        loading.value = false
      }
    }

    const refreshUser = async (): Promise<void> => {
      await fetchUser(true)
    }

    const clearUserCache = (): void => {
      lastFetchTime.value = null
      user.value = null
    }

    return {
      user,
      loading,
      error,
      lastFetchTime,
      fetchUser,
      refreshUser,
      clearUserCache,
      isCacheValid,
    }
  },
  {
    persist: {
      paths: ['user', 'lastFetchTime'],
    },
  },
)
