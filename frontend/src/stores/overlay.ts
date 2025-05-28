import { defineStore } from 'pinia'
import { type Ref, ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import axios from 'axios'

/**
 * Overlay settings store for managing streaming overlay configuration
 * Handles automatic saving with debouncing to prevent excessive API calls
 */
export const useOverlayStore = defineStore(
  'overlayStore',
  () => {
    // Style configuration
    /** @type {Ref<string>} Current overlay style variant */
    const overlayStyle: Ref<string> = ref('old')

    // Background settings
    /** @type {Ref<string>} Background color in hex format */
    const backgroundColor: Ref<string> = ref('#07090E')
    /** @type {Ref<boolean>} Whether background is disabled */
    const disabledBackground: Ref<boolean> = ref(false)
    /** @type {Ref<boolean>} Whether border is disabled */
    const disabledBorder: Ref<boolean> = ref(false)
    /** @type {Ref<boolean>} Whether background gradient is disabled */
    const disabledBackgroundGradient: Ref<boolean> = ref(false)
    /** @type {Ref<boolean>} Whether glow effect is disabled */
    const disabledGlowEffect: Ref<boolean> = ref(false)

    // Rank display settings
    /** @type {Ref<boolean>} Whether peak rank icon is disabled */
    const disabledPeakRankIcon: Ref<boolean> = ref(false)
    /** @type {Ref<boolean>} Whether leaderboard place is disabled */
    const disabledLeaderboardPlace: Ref<boolean> = ref(false)
    /** @type {Ref<boolean>} Whether peak RR display is disabled */
    const disabledPeakRR: Ref<boolean> = ref(false)

    // Text styling
    /** @type {Ref<string>} Primary text color in hex format */
    const textColor: Ref<string> = ref('#f2f2f2')
    /** @type {Ref<string>} Secondary text color in hex format */
    const primaryTextColor: Ref<string> = ref('#f2f2f2')
    /** @type {Ref<string>} Font family for overlay text */
    const overlayFont: Ref<string> = ref('Inter')

    // Win/Lose indicators
    /** @type {Ref<string>} Color for win indicators in hex format */
    const winColor: Ref<string> = ref('#00FFE3')
    /** @type {Ref<string>} Color for lose indicators in hex format */
    const loseColor: Ref<string> = ref('#FF7986')
    /** @type {Ref<boolean>} Whether win/lose indicators are disabled */
    const disabledWinLose: Ref<boolean> = ref(false)
    /** @type {Ref<boolean>} Whether last match points are disabled */
    const disabledLastMatchPoints: Ref<boolean> = ref(false)

    // Progress bar settings
    /** @type {Ref<boolean>} Whether progress bar is disabled */
    const disabledProgress: Ref<boolean> = ref(false)
    /** @type {Ref<string>} Progress bar fill color in hex format */
    const progressColor: Ref<string> = ref('#00FFE3')
    /** @type {Ref<string>} Progress bar background color in hex format */
    const progressBgColor: Ref<string> = ref('#f2f2f2')

    // Internal state management
    /** @type {Ref<boolean>} Flag to prevent saving during initialization */
    const isInitialized = ref(false)
    /** @type {NodeJS.Timeout | null} Debounce timer for saving settings */
    let saveTimeout: NodeJS.Timeout | null = null
    /** @type {Ref<boolean>} Flag indicating if there are unsaved changes */
    const hasPendingChanges = ref(false)

    /**
     * Saves overlay settings to the server
     * @async
     * @function saveSettingsToServer
     * @returns {Promise<void>}
     * @throws {Error} When API request fails
     */
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

        await axios.post(`${import.meta.env.APP_BACKEND_URL}/api/users/me/overlay`, settings, {
          withCredentials: true,
        })

        hasPendingChanges.value = false
        console.log('Overlay settings saved successfully')
      } catch (error) {
        console.error('Failed to save overlay settings:', error)
      }
    }

    /**
     * Debounced version of settings save function
     * Delays API calls to prevent excessive requests during rapid changes
     * @function debouncedSaveSettings
     * @returns {void}
     */
    const debouncedSaveSettings = (): void => {
      if (!isInitialized.value) return

      hasPendingChanges.value = true

      // Clear previous timer if exists
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }

      // Set new timer with 1 second delay
      saveTimeout = setTimeout(() => {
        saveSettingsToServer()
      }, 1000)
    }

    /**
     * Sets up watchers for all reactive settings properties
     * Automatically triggers debounced save when any setting changes
     * @function setupWatchers
     * @returns {void}
     */
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

      // Initialize watchers after a short delay
      setTimeout(() => {
        isInitialized.value = true
      }, 100)
    }

    /**
     * Forces immediate save of pending changes
     * Used when user is about to leave the page
     * @async
     * @function forceSave
     * @returns {Promise<void>}
     */
    const forceSave = async (): Promise<void> => {
      if (hasPendingChanges.value && saveTimeout) {
        clearTimeout(saveTimeout)
        await saveSettingsToServer()
      }
    }

    // Toggle functions for boolean settings

    /**
     * Toggles peak RR display setting
     * @function togglePeakRR
     * @returns {void}
     */
    const togglePeakRR = (): void => {
      disabledPeakRR.value = !disabledPeakRR.value
    }

    /**
     * Toggles leaderboard place display setting
     * @function toggleLeaderboardPlace
     * @returns {void}
     */
    const toggleLeaderboardPlace = (): void => {
      disabledLeaderboardPlace.value = !disabledLeaderboardPlace.value
    }

    /**
     * Toggles peak rank icon display setting
     * @function togglePeakRankIcon
     * @returns {void}
     */
    const togglePeakRankIcon = (): void => {
      disabledPeakRankIcon.value = !disabledPeakRankIcon.value
    }

    /**
     * Toggles background display setting
     * @function toggleBackground
     * @returns {void}
     */
    const toggleBackground = (): void => {
      disabledBackground.value = !disabledBackground.value
    }

    /**
     * Toggles border display setting
     * Only works when background is enabled
     * @function toggleBorder
     * @returns {void}
     */
    const toggleBorder = (): void => {
      if (!disabledBackground.value) {
        disabledBorder.value = !disabledBorder.value
      }
    }

    /**
     * Toggles background gradient setting
     * @function toggleBackgroundGradient
     * @returns {void}
     */
    const toggleBackgroundGradient = (): void => {
      disabledBackgroundGradient.value = !disabledBackgroundGradient.value
    }

    /**
     * Toggles glow effect setting
     * @function toggleGlowEffect
     * @returns {void}
     */
    const toggleGlowEffect = (): void => {
      disabledGlowEffect.value = !disabledGlowEffect.value
    }

    /**
     * Toggles last match points display setting
     * @function toggleLastMatchPoints
     * @returns {void}
     */
    const toggleLastMatchPoints = (): void => {
      disabledLastMatchPoints.value = !disabledLastMatchPoints.value
    }

    /**
     * Toggles win/lose indicators setting
     * @function toggleWinLose
     * @returns {void}
     */
    const toggleWinLose = (): void => {
      disabledWinLose.value = !disabledWinLose.value
    }

    /**
     * Toggles progress bar display setting
     * @function toggleProgress
     * @returns {void}
     */
    const toggleProgress = (): void => {
      disabledProgress.value = !disabledProgress.value
    }

    /**
     * Resets all settings to default values
     * Clears localStorage and triggers save
     * @function defaultStyle
     * @returns {void}
     */
    const defaultStyle = (): void => {
      // Temporarily disable auto-save
      isInitialized.value = false

      // Clear any pending save timer
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }

      // Reset all values to defaults
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

      // Re-enable auto-save and trigger save
      setTimeout(() => {
        isInitialized.value = true
        debouncedSaveSettings()
      }, 100)
    }

    /**
     * Resets settings and shows success message
     * @function reset
     * @returns {void}
     */
    const reset = (): void => {
      toast.success('Overlay settings reset')
      defaultStyle()
    }

    /**
     * Converts current settings to URL query string format
     * @function getSettingsAsQuery
     * @returns {string} URL-encoded query string
     */
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

    /**
     * Updates settings from URL query parameters
     * Temporarily disables auto-save during bulk updates
     * @function updateFromQuery
     * @param {Record<string, string>} params - Query parameters object
     * @returns {void}
     */
    const updateFromQuery = (params: Record<string, string>): void => {
      // Temporarily disable auto-save
      isInitialized.value = false

      // Clear any pending save timer
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

      // Re-enable auto-save
      setTimeout(() => {
        isInitialized.value = true
      }, 100)
    }

    /**
     * Cleanup function to clear timers and prevent memory leaks
     * Should be called when store is destroyed
     * @function cleanup
     * @returns {void}
     */
    const cleanup = (): void => {
      if (saveTimeout) {
        clearTimeout(saveTimeout)
      }
    }

    // Initialize watchers on store creation
    setupWatchers()

    return {
      // Reactive state
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

      // Toggle functions
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

      // Utility functions
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
