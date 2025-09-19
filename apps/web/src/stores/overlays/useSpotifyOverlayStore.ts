import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface SpotifyState {
  backgroundColor: Ref<string>
  avgCoverColor: Ref<boolean>
  textColor: Ref<string>
  widthLimitation: Ref<boolean>
  hideBorder: Ref<boolean>
  borderColor: Ref<string>
  borderRadius: Ref<number[]>
  textFont: Ref<string>
  trimArtist: Ref<boolean>
  reset: () => void
}

export const useSpotifyOverlayStore = defineStore(
  'spotifyOverlayStore',
  (): SpotifyState => {
    const backgroundColor: Ref<string> = ref('#000000')
    const avgCoverColor: Ref<boolean> = ref(false)
    const textColor: Ref<string> = ref('#f2f2f2')
    const widthLimitation: Ref<boolean> = ref(false)
    const hideBorder: Ref<boolean> = ref(false)
    const borderColor: Ref<string> = ref('#000000')
    const borderRadius: Ref<number[]> = ref([0])
    const textFont: Ref<string> = ref('Geist')
    const trimArtist: Ref<boolean> = ref(false)

    const reset: () => void = (): void => {
      backgroundColor.value = '#000000'
      avgCoverColor.value = false
      textColor.value = '#f2f2f2'
      widthLimitation.value = false
      hideBorder.value = false
      borderColor.value = '#000000'
      borderRadius.value = [0]
      textFont.value = 'Geist'
      trimArtist.value = false
    }

    return {
      backgroundColor,
      avgCoverColor,
      textColor,
      widthLimitation,
      hideBorder,
      borderColor,
      borderRadius,
      textFont,
      trimArtist,
      reset,
    }
  },
  {
    persist: true,
  },
)
