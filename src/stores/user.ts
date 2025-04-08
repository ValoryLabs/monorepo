import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const profileActive: Ref<boolean> = ref(true)
    const configuratorActive: Ref<boolean> = ref(false)
    const previewActive: Ref<boolean> = ref(false)

    const toggleConfigurator = () => {
      configuratorActive.value = !configuratorActive.value
    }

    const togglePreview = () => {
      previewActive.value = !previewActive.value
    }

    return {
      profileActive,
      configuratorActive,
      previewActive,
      toggleConfigurator,
      togglePreview,
    }
  },
  {
    persist: true,
  },
)
