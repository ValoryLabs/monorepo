import {defineStore} from 'pinia'
import {ref, type Ref} from 'vue'

export const useUserSettingsStore = defineStore(
  'userSettingsStore',
  () => {
    const riotID: Ref<string> = ref<string>('')
    const apiKey: Ref<string> = ref<string>('')
    const puuid: Ref<string> = ref<string>('')
    const region: Ref<string> = ref<string>('')

    return {
      riotID,
      apiKey,
      puuid,
      region,
    }
  },
  {
    persist: true,
  },
)
