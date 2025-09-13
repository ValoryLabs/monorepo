import { useValorantStore } from '@/stores'
import type { AxiosResponse } from 'axios'
import { apiClient } from '.'

export const getAccountInformation = async (): Promise<boolean> => {
  const valorantStore = useValorantStore()

  try {
    if (!valorantStore.puuid) {
      throw new Error('PUUID is not set')
    }

    const response: AxiosResponse = await apiClient.get(
      `/v2/by-puuid/account/${valorantStore.puuid}`,
    )

    const accountInfo = {
      account_level: 0,
      name: '',
      tag: '',
    }

    if (response.data.status === 200) {
      if (!response.data.data) {
        throw new Error('Response data is empty')
      }

      accountInfo.account_level = response.data.data.account_level
      accountInfo.name = response.data.data.name
      accountInfo.tag = response.data.data.tag

      valorantStore.AccountInformation = accountInfo
      return true
    } else {
      throw new Error('Invalid response status')
    }
  } catch (error) {
    console.error('Error fetching account information:', error)
    return false
  }
}

export const getMMRInformation = async (): Promise<boolean> => {
  const valorantStore = useValorantStore()

  try {
    if (!valorantStore.puuid || !valorantStore.region) {
      throw new Error('PUUID or region is not set')
    }

    const response: AxiosResponse = await apiClient.get(
      `/v3/by-puuid/mmr/${valorantStore.region}/pc/${valorantStore.puuid}`,
    )

    const mmrInformation = {
      peak: {
        tier: {
          id: 0,
          name: '',
        },
        rr: 0,
      },
      current: {
        tier: {
          id: 0,
          name: '',
        },
        rr: 0,
        last_change: 0,
        elo: 0,
      },
      leaderboard_placement: null,
    }

    if (response.data.status === 200) {
      if (!response.data.data) {
        throw new Error('Response data is empty')
      }

      mmrInformation.peak.tier.id = response.data.data.peak.tier.id
      mmrInformation.peak.tier.name = response.data.data.peak.tier.name
      mmrInformation.peak.rr = response.data.data.peak.rr
      mmrInformation.current.tier.id = response.data.data.current.tier.id
      mmrInformation.current.tier.name = response.data.data.current.tier.name
      mmrInformation.current.rr = response.data.data.current.rr
      mmrInformation.current.last_change = response.data.data.current.last_change
      mmrInformation.current.elo = response.data.data.current.elo
      mmrInformation.leaderboard_placement = response.data.data.current.leaderboard_placement?.rank

      valorantStore.MMRInformation = mmrInformation
      return true
    } else {
      throw new Error('Invalid response status')
    }
  } catch (error) {
    console.error('Error fetching MMR information:', error)
    return false
  }
}
