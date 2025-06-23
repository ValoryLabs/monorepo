import { defineStore } from 'pinia'
import { ref, type Ref, computed, watch } from 'vue'
import axios from 'axios'

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

    const fullscreen: Ref<boolean> = ref(false)
    const showSettings: Ref<boolean> = ref(false)
    const showShortcuts: Ref<'Show' | 'Hide'> = ref('Show')

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

    const toggleShowSettings = () => {
      showSettings.value = !showSettings.value
    }

    const fetchUser = async () => {
      loading.value = true
      error.value = false
      try {
        const response = await axios.get(`${import.meta.env.APP_BACKEND_URL}/api/users/me`, {
          withCredentials: true,
        })
        user.value = await response.data
      } catch (err: any) {
        error.value = true
        user.value = null
        console.log(err.response?.data?.detail || err.message)
      } finally {
        loading.value = false
      }
    }

    const toggleConfigurator = () => {
      configuratorActive.value = !configuratorActive.value
    }

    const togglePreview = () => {
      previewActive.value = !previewActive.value
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
      showSettings,
      fullscreen,
      showShortcuts,
      resetShortcut,
      fullShortcut,
      validatedResetShortcut,
      validatedFullShortcut,
      allowedKeys,
      fetchUser,
      toggleConfigurator,
      toggleShowSettings,
      togglePreview,
      updateResetShortcut,
      updateFullShortcut,
      isValidKey,
    }
  },
  {
    persist: true,
  },
)
