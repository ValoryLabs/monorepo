import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useSettingsStore = defineStore(
  'settingsStore',
  () => {
    const profileActive: Ref<boolean> = ref(true)
    const configuratorActive: Ref<boolean> = ref(false)
    const previewActive: Ref<boolean> = ref(false)
    const previewImage: Ref<string | null> = ref('abyss')
    const previewDraggable: Ref<boolean> = ref(true)
    const overlayDimensions: Ref<string | null> = ref('0 x 0')
    const showLeftSidebar: Ref<boolean> = ref(true)
    const showRightSidebar: Ref<boolean> = ref(true)
    const showShortcuts: Ref<boolean> = ref(true)
    const settingsActive: Ref<boolean> = ref(false)

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
      profileActive,
      configuratorActive,
      previewActive,
      previewImage,
      previewDraggable,
      overlayDimensions,
      showLeftSidebar,
      showRightSidebar,
      showShortcuts,
      settingsActive,
      toggleConfigurator,
      toggleFullscreen,
      togglePreview,
    }
  },
  {
    persist: {
      paths: [
        'settingsActive',
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
      ],
    },
  },
)
