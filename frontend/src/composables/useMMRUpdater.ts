import { onUnmounted } from 'vue'
import { getMMRInformation } from '@/services/playerInformation'

const MMR_UPDATE_INTERVAL = 30_000

export function useMMRUpdater() {
  let mmrInterval: number | null = null

  const updateMMRInfo = async (): Promise<void> => {
    try {
      const mmrInfo = await getMMRInformation()
      if (!mmrInfo) {
        console.warn('Failed to fetch MMR information during update')
      }
    } catch (error) {
      console.error('Error updating MMR information:', error)
    }
  }

  const startMMRUpdates = (): void => {
    if (mmrInterval !== null) return

    mmrInterval = window.setInterval(updateMMRInfo, MMR_UPDATE_INTERVAL)
  }

  const stopMMRUpdates = (): void => {
    if (mmrInterval !== null) {
      clearInterval(mmrInterval)
      mmrInterval = null
    }
  }

  onUnmounted(() => {
    stopMMRUpdates()
  })

  return {
    startMMRUpdates,
    stopMMRUpdates,
  }
}
