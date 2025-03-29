import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const profileActive: Ref<boolean> = ref(true)
    const configuratorActive: Ref<boolean> = ref(false)

    const toggleConfigurator = () => {
      configuratorActive.value = !configuratorActive.value
    }

    return {
      profileActive,
      configuratorActive,
      toggleConfigurator,
    }
  },
  {
    persist: true,
  },
)
