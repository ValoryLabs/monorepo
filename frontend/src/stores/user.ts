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

    const overlayDimensions: Ref<string | null> = ref('0 x 0')

    const showLeftSidebar: Ref<boolean> = ref(true)
    const showRightSidebar: Ref<boolean> = ref(true)
    const showHeader: Ref<boolean> = ref(true)
    const fullscreen: Ref<boolean> = ref(false)

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
      showHeader.value = !showHeader.value
      showLeftSidebar.value = !showLeftSidebar.value
      showRightSidebar.value = !showRightSidebar.value
      fullscreen.value = !fullscreen.value
    }

    return {
      profileActive,
      configuratorActive,
      previewActive,
      previewImage,
      previewDraggable,
      overlayDimensions,
      showLeftSidebar,
      showRightSidebar,
      showHeader,
      fullscreen,
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
