import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { toast } from 'vue-sonner'

export const useOverlayStore = defineStore(
  'overlayStore',
  () => {
    const backgroundColor: Ref<string> = ref('#07090E')
    const textColor: Ref<string> = ref('#f2f2f2')
    const primaryTextColor: Ref<string> = ref('#f2f2f2')
    const progressColor: Ref<string> = ref('#00FFE3')
    const progressBgColor: Ref<string> = ref('#f2f2f2')
    const winColor: Ref<string> = ref('#00FFE3')
    const loseColor: Ref<string> = ref('#FF7986')

    const overlayStyle: Ref<string> = ref('old')
    const overlayFont: Ref<string> = ref('Inter')

    const disabledLeaderboardPlace: Ref<boolean> = ref(false)
    const disabledPeakRank: Ref<boolean> = ref(false)
    const disabledBackground: Ref<boolean> = ref(false)
    const disabledBorder: Ref<boolean> = ref(false)
    const disabledBackgroundGradient: Ref<boolean> = ref(false)
    const disabledGlowEffect: Ref<boolean> = ref(false)
    const disabledLastMatchPoints: Ref<boolean> = ref(false)
    const disabledWinLose: Ref<boolean> = ref(false)
    const disabledProgress: Ref<boolean> = ref(false)

    const toggleLeaderboardPlace = () => {
      disabledLeaderboardPlace.value = !disabledLeaderboardPlace.value
    }

    const togglePeakRank = () => {
      disabledPeakRank.value = !disabledPeakRank.value
    }

    const toggleBackground = () => {
      disabledBackground.value = !disabledBackground.value
    }

    const toggleBorder = () => {
      if (!disabledBackground.value) {
        disabledBorder.value = !disabledBorder.value
      }
    }

    const toggleBackgroundGradient = () => {
      disabledBackgroundGradient.value = !disabledBackgroundGradient.value
    }

    const toggleGlowEffect = () => {
      disabledGlowEffect.value = !disabledGlowEffect.value
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

    const defaultStyle = () => {
      backgroundColor.value = '#07090E'
      textColor.value = '#f2f2f2'
      primaryTextColor.value = '#f2f2f2'
      progressColor.value = '#00FFE3'
      progressBgColor.value = '#f2f2f2'
      winColor.value = '#00FFE3'
      loseColor.value = '#FF7986'

      overlayFont.value = 'Inter'

      disabledLeaderboardPlace.value = false
      disabledPeakRank.value = false
      disabledBackground.value = false
      disabledBackgroundGradient.value = false
      disabledBorder.value = false
      disabledGlowEffect.value = false
      disabledLastMatchPoints.value = false
      disabledWinLose.value = false
      disabledProgress.value = false

      localStorage.removeItem('overlayStore')
    }

    const reset = () => {
      toast.success('Overlay settings reset')
      defaultStyle()
    }

    const getSettingsAsQuery = () => {
      const settings = {
        backgroundColor: backgroundColor.value,
        textColor: textColor.value,
        primaryTextColor: primaryTextColor.value,
        progressColor: progressColor.value,
        progressBgColor: progressBgColor.value,
        winColor: winColor.value,
        loseColor: loseColor.value,
        overlayStyle: overlayStyle.value,
        overlayFont: overlayFont.value,
        disabledLeaderboardPlace: disabledLeaderboardPlace.value,
        disabledPeakRank: disabledPeakRank.value,
        disabledBackground: disabledBackground.value,
        disabledBackgroundGradient: disabledBackgroundGradient.value,
        disabledBorder: disabledBorder.value,
        disabledLastMatchPoints: disabledLastMatchPoints.value,
        disabledWinLose: disabledWinLose.value,
        disabledProgress: disabledProgress.value,
        disabledGlowEffect: disabledGlowEffect.value,
      }

      const queryString = Object.keys(settings)
        .map((key) => {
          const value = settings[key as keyof typeof settings]
          if (typeof value === 'boolean') {
            return `${key}=${value ? 'true' : 'false'}`
          } else {
            return `${key}=${encodeURIComponent(value)}`
          }
        })
        .join('&')

      return queryString
    }

    const updateFromQuery = (params: Record<string, string>) => {
      Object.entries(params).forEach(([key, value]) => {
        if (key in this) {
          if (value === 'true' || value === 'false') {
            this[key] = value === 'true'
          } else {
            this[key] = decodeURIComponent(value)
          }
        }
      })
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
      overlayFont,
      disabledLeaderboardPlace,
      disabledPeakRank,
      disabledBackground,
      disabledBackgroundGradient,
      disabledBorder,
      disabledGlowEffect,
      disabledLastMatchPoints,
      disabledWinLose,
      disabledProgress,
      toggleLeaderboardPlace,
      togglePeakRank,
      toggleBackground,
      toggleBackgroundGradient,
      toggleBorder,
      toggleGlowEffect,
      toggleLastMatchPoints,
      toggleWinLose,
      toggleProgress,
      reset,
      getSettingsAsQuery,
      updateFromQuery,
    }
  },
  {
    persist: true,
  },
)
