import { type Ref, ref } from 'vue'
import { UserValidator } from '@/services/auth/user.validator'
import { getOverlayData } from '@/services/backend'
import { getAccountInformation, getMMRInformation } from '@/services/playerInformation'

export interface OverlayData {
  background_color: string
  disabled_background: boolean
  disabled_background_gradient: boolean
  disabled_border: boolean
  disabled_glow_effect: boolean
  disabled_last_match_points: boolean
  disabled_leaderboard_place: boolean
  disabled_peak_rank_icon: boolean
  disabled_peak_rr: boolean
  disabled_progress: boolean
  disabled_win_lose: boolean
  id: string
  lose_color: string
  overlay_font: string
  overlay_style: string
  primary_color: string
  progress_bg_color: string
  progress_color: string
  text_color: string
  user_id: number
  win_color: string
  riot_id?: string
  hdev_api_key?: string
}

export function useOverlayData(riotID: Ref<string>, apiKey: Ref<string>) {
  const overlayData = ref<OverlayData | null>(null)
  const loading = ref(false)
  const successFetchInfo = ref(false)

  const loadOverlayData = async (id: string): Promise<void> => {
    loading.value = true
    successFetchInfo.value = false

    try {
      const data = await getOverlayData(id)

      if (!data) {
        throw new Error(`Overlay data not found for ID: ${id}`)
      }

      overlayData.value = data
      riotID.value = data.riot_id || ''
      apiKey.value = data.hdev_api_key || ''

      await validateAndFetchPlayerData()

      // Небольшая задержка для плавности
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error loading overlay data:', error)
      overlayData.value = null
    } finally {
      loading.value = false
    }
  }

  const validateAndFetchPlayerData = async (): Promise<void> => {
    const validationResult = await UserValidator.validate()

    if (!validationResult.success) {
      throw new Error(`Validation failed: ${validationResult.message}`)
    }

    if (!riotID.value || !apiKey.value) {
      throw new Error('Missing Riot ID or API key')
    }

    const [accountInfo, mmrInfo] = await Promise.all([getAccountInformation(), getMMRInformation()])

    if (!accountInfo) {
      throw new Error('Failed to fetch account information')
    }

    if (!mmrInfo) {
      throw new Error('Failed to fetch MMR information')
    }

    successFetchInfo.value = true
  }

  return {
    overlayData,
    loading,
    successFetchInfo,
    loadOverlayData,
  }
}
