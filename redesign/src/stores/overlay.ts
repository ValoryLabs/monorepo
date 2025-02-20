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
    const winColor: Ref<string> = ref('#61baa4')
    const loseColor: Ref<string> = ref('#FF7986')

    const overlayStyle: Ref<string> = ref('old')

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

    const defaultOldstyle = () => {
      backgroundColor.value = '#f2f2f2'
      textColor.value = '#f2f2f2'
      primaryTextColor.value = '#f2f2f2'
      progressColor.value = '#61baa4'
      progressBgColor.value = '#f2f2f2'
      overlayStyle.value = 'old'

      disabledBackground.value = false
      disabledBackgroundGradient.value = false
      disabledLastMatchPoints.value = false
      disabledWinLose.value = false
      disabledProgress.value = false

      localStorage.removeItem('overlayStore')
    }

    const defaultNewstyle = () => {
      backgroundColor.value = '#07090E'
      textColor.value = '#f2f2f2'
      primaryTextColor.value = '#f2f2f2'
      progressColor.value = '#61baa4'
      progressBgColor.value = '#f2f2f2'
      winColor.value ='#61baa4'
      loseColor.value ='#FF7986'
      overlayStyle.value = 'new'

      disabledBackground.value = false
      disabledWinLose.value = false
      disabledProgress.value = false

      localStorage.removeItem('overlayStore')
    }

    const reset = () => {
      if (overlayStyle.value === 'old') {
        defaultOldstyle()
      } else {
        defaultNewstyle()
      }
    }

    return {
      backgroundColor,
      textColor,
      primaryTextColor,
      progressColor,
      progressBgColor,
      winColor,
      loseColor,
      overlayStyle,
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
