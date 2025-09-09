import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, type Ref, ref, watch } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user: Ref<string | null> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<boolean> = ref(false)
    const profileActive: Ref<boolean> = ref(true)
    const configuratorActive: Ref<boolean> = ref(false)
    const previewActive: Ref<boolean> = ref(false)
    const previewImage: Ref<string | null> = ref('abyss')
    const previewDraggable: Ref<boolean> = ref(true)

    const overlayDimensions: Ref<string | null> = ref('0 x 0')

    const showLeftSidebar: Ref<boolean> = ref(true)
    const showRightSidebar: Ref<boolean> = ref(true)
    const showShortcuts: Ref<'Show' | 'Hide'> = ref('Show')

    const lastFetchTime: Ref<number | null> = ref(null)
    const CACHE_DURATION = 30 * 60 * 1000

    const allowedKeys = [
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
    ]

    const validateKey = (key: string): string => {
      const normalizedKey = key.toLowerCase()
      return allowedKeys.includes(normalizedKey) ? normalizedKey : 'r'
    }

    const resetShortcut: Ref<string> = ref('r')
    const fullShortcut: Ref<string> = ref('f')

    const validatedResetShortcut = computed({
      get: () => validateKey(resetShortcut.value),
      set: (value: string) => {
        resetShortcut.value = validateKey(value)
      },
    })

    const validatedFullShortcut = computed({
      get: () => validateKey(fullShortcut.value),
      set: (value: string) => {
        fullShortcut.value = validateKey(value)
      },
    })

    watch(resetShortcut, (newValue) => {
      const validated = validateKey(newValue)
      if (validated !== newValue.toLowerCase()) {
        console.warn(`Invalid reset shortcut "${newValue}". Using "${validated}" instead.`)
        resetShortcut.value = validated
      }
    })

    watch(fullShortcut, (newValue) => {
      const validated = validateKey(newValue)
      if (validated !== newValue.toLowerCase()) {
        console.warn(`Invalid full shortcut "${newValue}". Using "${validated}" instead.`)
        fullShortcut.value = validated
      }
    })

    const updateResetShortcut = (newKey: string) => {
      const validatedKey = validateKey(newKey)
      if (validatedKey !== newKey.toLowerCase()) {
        console.warn(`Invalid key "${newKey}". Using "${validatedKey}" instead.`)
      }
      resetShortcut.value = validatedKey
    }

    const updateFullShortcut = (newKey: string) => {
      const validatedKey = validateKey(newKey)
      if (validatedKey !== newKey.toLowerCase()) {
        console.warn(`Invalid key "${newKey}". Using "${validatedKey}" instead.`)
      }
      fullShortcut.value = validatedKey
    }

    const isValidKey = (key: string): boolean => {
      return allowedKeys.includes(key.toLowerCase())
    }

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
        const response = await axios.get(`${import.meta.env.APP_BACKEND_URL}/api/users/me`, {
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

    const toggleConfigurator = (): void => {
      configuratorActive.value = !configuratorActive.value
    }

    const togglePreview = (): void => {
      previewActive.value = !previewActive.value
    }

    const toggleFullscreen = (): void => {
      if (!showRightSidebar.value && !showLeftSidebar.value) {
        showRightSidebar.value = true
        showLeftSidebar.value = true
      } else {
        showRightSidebar.value = false
        showLeftSidebar.value = false
      }
    }

    return {
      user,
      loading,
      error,
      profileActive,
      configuratorActive,
      previewActive,
      previewImage,
      previewDraggable,
      overlayDimensions,
      showLeftSidebar,
      showRightSidebar,
      showShortcuts,
      resetShortcut,
      fullShortcut,
      validatedResetShortcut,
      validatedFullShortcut,
      allowedKeys,
      lastFetchTime,
      fetchUser,
      refreshUser,
      clearUserCache,
      isCacheValid,
      toggleConfigurator,
      toggleFullscreen,
      togglePreview,
      updateResetShortcut,
      updateFullShortcut,
      isValidKey,
    }
  },
  {
    persist: {
      paths: [
        'user',
        'profileActive',
        'configuratorActive',
        'previewActive',
        'previewImage',
        'previewDraggable',
        'overlayDimensions',
        'showLeftSidebar',
        'showRightSidebar',
        'showShortcuts',
        'resetShortcut',
        'fullShortcut',
        'lastFetchTime',
      ],
    },
  }
)
