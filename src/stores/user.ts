import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const profileActive: Ref<boolean> = ref(true)
    const configuratorActive: Ref<boolean> = ref(false)
    const previewActive: Ref<boolean> = ref(false)
    const previewImage: Ref<string | null> = ref('bind')
    const previewDraggable: Ref<boolean> = ref(true)

    const showLeftSidebar: Ref<boolean> = ref(true)
    const showRightSidebar: Ref<boolean> = ref(true)

    const toggleConfigurator = () => {
      configuratorActive.value = !configuratorActive.value
    }

    const togglePreview = () => {
      previewActive.value = !previewActive.value
    }

    const toggleLeftSidebar = () => {
      showLeftSidebar.value = !showLeftSidebar.value
    }

    const toggleRightSidebar = () => {
      showRightSidebar.value = !showRightSidebar.value
    }

    const toggleSidebar = () => {
      showLeftSidebar.value = !showLeftSidebar.value
      showRightSidebar.value = !showRightSidebar.value
    }

    return {
      profileActive,
      configuratorActive,
      previewActive,
      previewImage,
      previewDraggable,
      showLeftSidebar,
      showRightSidebar,
      toggleConfigurator,
      togglePreview,
      toggleLeftSidebar,
      toggleRightSidebar,
      toggleSidebar,
    }
  },
  {
    persist: true,
  },
)
