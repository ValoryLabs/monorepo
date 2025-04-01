import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserSettingsStore = defineStore(
  'userSettingsStore',
  () => {
    const riotID = ref<string>('')
    const apiKey = ref<string>('')
    const puuid = ref<string>('')

    return {
      riotID,
      apiKey,
      puuid,
    }
  },
  {
    persist: true,
  },
)
