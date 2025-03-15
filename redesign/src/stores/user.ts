import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const profileActive: Ref<boolean> = ref(false)
  const configuratorActive: Ref<boolean> = ref(false)
  const configuratorShow: Ref<boolean> = ref(false)
  const generateActive: Ref<boolean> = ref(false)
  const showOverlay: Ref<boolean> = ref(false)

  const toggleProfile = () => {
    profileActive.value = !profileActive.value
  }

  const toggleConfigurator = () => {
    configuratorActive.value = !configuratorActive.value
  }

  const toggleConfiguratorShow = () => {
    configuratorShow.value = !configuratorShow.value
  }

  const toggleGenerate = () => {
    generateActive.value = !generateActive.value
  }

  return {
    profileActive,
    configuratorActive,
    configuratorShow,
    generateActive,
    toggleProfile,
    toggleConfigurator,
    toggleConfiguratorShow,
    toggleGenerate,
    showOverlay,
  }
})
