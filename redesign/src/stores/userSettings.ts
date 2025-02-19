import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface ValidationResult {
  success: boolean
  message: string
}

export const useUserSettingsStore = defineStore(
  'userSettingsStore',
  () => {
    const riotID = ref<string>('')
    const apiKey = ref<string>('')

    const riotIdPattern = /^[\p{L}\p{N}]{3,16}#[\p{L}\p{N}]{3,5}$/u
    const apiKeyPattern = /^HDEV-[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i

    const isRiotIdValid = computed(() => riotIdPattern.test(riotID.value))
    const isApiKeyValid = computed(() => apiKeyPattern.test(apiKey.value))

    const validateRiotId = computed((): ValidationResult => {
      if (!riotID.value) {
        return { success: false, message: 'toasts.dataVerifying.validateRiotId.value' }
      }
      if (!riotIdPattern.test(riotID.value)) {
        return { success: false, message: 'toasts.dataVerifying.validateRiotId.pattern' }
      }
      return { success: true, message: 'toasts.dataVerifying.validateRiotId.valid' }
    })

    const validateApiKey = computed((): ValidationResult => {
      if (!apiKey.value) {
        return { success: false, message: 'toasts.dataVerifying.validateApiKey.value' }
      }
      if (!apiKeyPattern.test(apiKey.value)) {
        return { success: false, message: 'toasts.dataVerifying.validateApiKey.pattern' }
      }
      return { success: true, message: 'toasts.dataVerifying.validateApiKey.valid' }
    })

    return {
      riotID,
      apiKey,
      isRiotIdValid,
      isApiKeyValid,
      validateRiotId,
      validateApiKey,
    }
  },
  {
    persist: true,
  },
)
