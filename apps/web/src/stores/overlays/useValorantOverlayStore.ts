import axios from 'axios'
import { defineStore } from 'pinia'
import { type Ref, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

export const useValorantOverlayStore = defineStore(
  'valorantOverlayStore',
  () => {
    const overlayStyle: Ref<string> = ref('old')

    const backgroundColor: Ref<string> = ref('#07090E')
    const disabledBackground: Ref<boolean> = ref(false)
    const disabledBorder: Ref<boolean> = ref(false)
    const disabledBackgroundGradient: Ref<boolean> = ref(false)
    const disabledGlowEffect: Ref<boolean> = ref(false)
    const disabledPeakRankIcon: Ref<boolean> = ref(false)
    const disabledLeaderboardPlace: Ref<boolean> = ref(false)
    const disabledPeakRR: Ref<boolean> = ref(false)
    const textColor: Ref<string> = ref('#f2f2f2')
    const primaryTextColor: Ref<string> = ref('#f2f2f2')
    const overlayFont: Ref<string> = ref('Inter')
    const winColor: Ref<string> = ref('#00FFE3')
    const loseColor: Ref<string> = ref('#FF7986')
    const disabledWinLose: Ref<boolean> = ref(false)
    const disabledLastMatchPoints: Ref<boolean> = ref(false)
    const disabledProgress: Ref<boolean> = ref(false)
    const progressColor: Ref<string> = ref('#00FFE3')
    const progressBgColor: Ref<string> = ref('#f2f2f2')

    const isInitialized = ref(false)
    let saveTimeout: NodeJS.Timeout | null = null
    const hasPendingChanges = ref(false)

    const saveSettingsToServer = async (): Promise<void> => {
      if (!isInitialized.value) return

      try {
        const settings = {
          overlayStyle: overlayStyle.value,
          backgroundColor: backgroundColor.value,
          disabledBackground: disabledBackground.value,
          disabledBorder: disabledBorder.value,
          disabledBackgroundGradient: disabledBackgroundGradient.value,
          disabledGlowEffect: disabledGlowEffect.value,
          disabledPeakRankIcon: disabledPeakRankIcon.value,
          disabledLeaderboardPlace: disabledLeaderboardPlace.value,
          disabledPeakRR: disabledPeakRR.value,
          textColor: textColor.value,
          primaryTextColor: primaryTextColor.value,
          overlayFont: overlayFont.value,
          winColor: winColor.value,
          loseColor: loseColor.value,
          disabledWinLose: disabledWinLose.value,
          disabledLastMatchPoints: disabledLastMatchPoints.value,
          disabledProgress: disabledProgress.value,
          progressColor: progressColor.value,
          progressBgColor: progressBgColor.value,
        }

        await axios.post(`https://${import.meta.env.API_DOMAIN}/api/users/me/overlay`, settings, {
          withCredentials: true,
        })

        hasPendingChanges.value = false
      } catch (error) {
        console.error('Failed to save overlay settings:', error)
      }
    }

    const debouncedSaveSettings = (): void => {
      if (!isInitialized.value) return

      hasPendingChanges.value = true

      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }

      saveTimeout = setTimeout(() => {
        saveSettingsToServer()
      }, 1000)
    }

    const setupWatchers = (): void => {
      const settingsToWatch = [
        overlayStyle,
        backgroundColor,
        disabledBackground,
        disabledBorder,
        disabledBackgroundGradient,
        disabledGlowEffect,
        disabledPeakRankIcon,
        disabledLeaderboardPlace,
        disabledPeakRR,
        textColor,
        primaryTextColor,
        overlayFont,
        winColor,
        loseColor,
        disabledWinLose,
        disabledLastMatchPoints,
        disabledProgress,
        progressColor,
        progressBgColor,
      ]

      settingsToWatch.forEach((setting) => {
        watch(setting, () => {
          debouncedSaveSettings()
        })
      })

      setTimeout(() => {
        isInitialized.value = true
      }, 100)
    }

    const forceSave = async (): Promise<void> => {
      if (hasPendingChanges.value && saveTimeout) {
        clearTimeout(saveTimeout)
        await saveSettingsToServer()
      }
    }

    const togglePeakRR = (): void => {
      disabledPeakRR.value = !disabledPeakRR.value
    }

    const toggleLeaderboardPlace = (): void => {
      disabledLeaderboardPlace.value = !disabledLeaderboardPlace.value
    }

    const togglePeakRankIcon = (): void => {
      disabledPeakRankIcon.value = !disabledPeakRankIcon.value
    }

    const toggleBackground = (): void => {
      disabledBackground.value = !disabledBackground.value
    }

    const toggleBorder = (): void => {
      if (!disabledBackground.value) {
        disabledBorder.value = !disabledBorder.value
      }
    }

    const toggleBackgroundGradient = (): void => {
      disabledBackgroundGradient.value = !disabledBackgroundGradient.value
    }

    const toggleGlowEffect = (): void => {
      disabledGlowEffect.value = !disabledGlowEffect.value
    }

    const toggleLastMatchPoints = (): void => {
      disabledLastMatchPoints.value = !disabledLastMatchPoints.value
    }

    const toggleWinLose = (): void => {
      disabledWinLose.value = !disabledWinLose.value
    }

    const toggleProgress = (): void => {
      disabledProgress.value = !disabledProgress.value
    }

    const defaultStyle = (): void => {
      isInitialized.value = false

      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }

      backgroundColor.value = '#07090E'
      textColor.value = '#f2f2f2'
      primaryTextColor.value = '#f2f2f2'
      progressColor.value = '#00FFE3'
      progressBgColor.value = '#f2f2f2'
      winColor.value = '#00FFE3'
      loseColor.value = '#FF7986'
      overlayFont.value = 'Inter'

      disabledPeakRR.value = false
      disabledLeaderboardPlace.value = false
      disabledPeakRankIcon.value = false
      disabledBackground.value = false
      disabledBackgroundGradient.value = false
      disabledBorder.value = false
      disabledGlowEffect.value = false
      disabledLastMatchPoints.value = false
      disabledWinLose.value = false
      disabledProgress.value = false

      localStorage.removeItem('overlayStore')

      setTimeout(() => {
        isInitialized.value = true
        debouncedSaveSettings()
      }, 100)
    }

    const reset = (): void => {
      toast.success('Overlay settings reset')
      defaultStyle()
    }

    const getSettingsAsQuery = (): string => {
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
        disabledPeakRR: disabledPeakRR.value,
        disabledLeaderboardPlace: disabledLeaderboardPlace.value,
        disabledPeakRankIcon: disabledPeakRankIcon.value,
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

    const updateFromQuery = (params: Record<string, string>): void => {
      isInitialized.value = false

      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }

      Object.entries(params).forEach(([key, value]) => {
        if (key in this) {
          if (value === 'true' || value === 'false') {
            this[key] = value === 'true'
          } else {
            this[key] = decodeURIComponent(value)
          }
        }
      })

      setTimeout(() => {
        isInitialized.value = true
      }, 100)
    }

    const cleanup = (): void => {
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }
    }

    setupWatchers()

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
      disabledPeakRR,
      disabledLeaderboardPlace,
      disabledPeakRankIcon,
      disabledBackground,
      disabledBackgroundGradient,
      disabledBorder,
      disabledGlowEffect,
      disabledLastMatchPoints,
      disabledWinLose,
      disabledProgress,

      togglePeakRR,
      toggleLeaderboardPlace,
      togglePeakRankIcon,
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
      saveSettingsToServer,
      forceSave,
      hasPendingChanges,
      cleanup,
    }
  },
  {
    persist: true,
  },
)
