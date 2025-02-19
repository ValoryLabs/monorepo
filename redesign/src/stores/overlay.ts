import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useOverlayStore = defineStore(
  'overlayStore',
  () => {
    const backgroundColor: Ref<string> = ref('#f2f2f2')
    const textColor: Ref<string> = ref('#f2f2f2')
    const primaryTextColor: Ref<string> = ref('#f2f2f2')
    const progressColor: Ref<string> = ref('#61baa4')
    const progressBgColor: Ref<string> = ref('#f2f2f2')

    const disabledBackground: Ref<boolean> = ref(false)
    const disabledBackgroundGradient: Ref<boolean> = ref(false)
    const disabledLastMatchPoints: Ref<boolean> = ref(false)
    const disabledWinLose: Ref<boolean> = ref(false)
    const disabledProgress: Ref<boolean> = ref(false)

    const toggleBackground = () => {
      disabledBackground.value = !disabledBackground.value
    }

    const toggleBackgroundGradient = () => {
      disabledBackgroundGradient.value = !disabledBackgroundGradient.value
    }

    const toggleLastMatchPoints = () => {
      disabledLastMatchPoints.value = !disabledLastMatchPoints.value
    }

    const toggleWinLose = () => {
      disabledWinLose.value = !disabledWinLose.value
    }

    const toggleProgress = () => {
      disabledProgress.value = !disabledProgress.value
    }

    const reset = () => {
      backgroundColor.value = '#f2f2f2'
      textColor.value = '#f2f2f2'
      primaryTextColor.value = '#f2f2f2'
      progressColor.value = '#61baa4'
      progressBgColor.value = '#f2f2f2'

      disabledBackground.value = false
      disabledBackgroundGradient.value = false
      disabledLastMatchPoints.value = false
      disabledWinLose.value = false
      disabledProgress.value = false

      localStorage.removeItem('overlayStore')
    }

    return {
      backgroundColor,
      textColor,
      primaryTextColor,
      progressColor,
      progressBgColor,
      disabledBackground,
      disabledBackgroundGradient,
      disabledLastMatchPoints,
      disabledWinLose,
      disabledProgress,
      toggleBackground,
      toggleBackgroundGradient,
      toggleLastMatchPoints,
      toggleWinLose,
      toggleProgress,
      reset,
    }
  },
  {
    persist: true,
  },
)
