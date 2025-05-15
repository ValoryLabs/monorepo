import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user: Ref<string | null> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<string | null> = ref(null)
    const profileActive: Ref<boolean> = ref(true)
    const configuratorActive: Ref<boolean> = ref(false)
    const previewActive: Ref<boolean> = ref(false)
    const previewImage: Ref<string | null> = ref('bind')
    const previewDraggable: Ref<boolean> = ref(true)

    const overlayDimensions: Ref<string | null> = ref('0 x 0')

    const showLeftSidebar: Ref<boolean> = ref(true)
    const showHeader: Ref<boolean> = ref(true)
    const fullscreen: Ref<boolean> = ref(false)
    const showSettings: Ref<boolean> = ref(false)

    const toggleShowSettings = () => {
      showSettings.value = !showSettings.value
    }

    const fetchUser = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await axios.get(`${import.meta.env.APP_BACKEND_URL}/api/users/me`, {
          withCredentials: true,
        })
        user.value = await response.data
      } catch (err) {
        error.value = err.response?.data?.detail || err.message
        user.value = null
        console.log(error.value)
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

    const toggleLeftSidebar = () => {
      showLeftSidebar.value = !showLeftSidebar.value
    }

    const toggleSidebar = () => {
      showHeader.value = !showHeader.value
      showLeftSidebar.value = !showLeftSidebar.value
      fullscreen.value = !fullscreen.value
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
      showLeftSidebar,
      showHeader,
      fullscreen,
      fetchUser,
      toggleConfigurator,
      toggleShowSettings,
      togglePreview,
      toggleLeftSidebar,
      toggleSidebar,
    }
  },
  {
    persist: true,
  },
)
