import type {
  AccountV2Data,
  AccountV2Response,
  MMRV3Data,
  MMRV3Response,
} from '@/api/henrikdev-openapi'
import { useValorantStore } from '@/stores'
import { apiClient } from '.'

export const getAccountInformation = async (): Promise<boolean> => {
  const valorantStore = useValorantStore()

  try {
    if (!valorantStore.puuid) {
      throw new Error('PUUID is not set')
    }

    const response = await apiClient.get<AccountV2Response>(
      `/v2/by-puuid/account/${valorantStore.puuid}`,
    )

    if (response.data.status === 200) {
      if (!response.data.data) {
        throw new Error('Response data is empty')
      }

      const accountData: AccountV2Data = response.data.data

      const accountInfo = {
        account_level: accountData.account_level,
        card: accountData.card,
        name: accountData.name,
        platforms: accountData.platforms,
        puuid: accountData.puuid,
        region: accountData.region,
        tag: accountData.tag,
        title: accountData.title,
        updated_at: accountData.updated_at,
      }

      valorantStore.AccountInformation = accountInfo
      return true
    } else {
      throw new Error(`Invalid response status: ${response.data.status}`)
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

    const response = await apiClient.get<MMRV3Response>(
      `/v3/by-puuid/mmr/${valorantStore.region}/pc/${valorantStore.puuid}`,
    )

    if (response.data.status === 200) {
      if (!response.data.data) {
        throw new Error('Response data is empty')
      }

      const mmrData: MMRV3Data = response.data.data

      const mmrInformation = {
        account: {
          name: mmrData.account.name,
          puuid: mmrData.account.puuid,
          tag: mmrData.account.tag,
        },
        peak: mmrData.peak
          ? {
              tier: {
                id: mmrData.peak.tier.id,
                name: mmrData.peak.tier.name,
              },
              rr: mmrData.peak.rr,
              season: mmrData.peak.season,
              ranking_schema: mmrData.peak.ranking_schema,
            }
          : null,
        current: {
          tier: {
            id: mmrData.current.tier.id,
            name: mmrData.current.tier.name,
          },
          rr: mmrData.current.rr,
          last_change: mmrData.current.last_change,
          elo: mmrData.current.elo,
          games_needed_for_rating: mmrData.current.games_needed_for_rating,
          rank_protection_shields: mmrData.current.rank_protection_shields,
        },
        leaderboard_placement: mmrData.current.leaderboard_placement?.rank || null,
        seasonal: mmrData.seasonal,
      }

      valorantStore.MMRInformation = mmrInformation
      return true
    } else {
      throw new Error(`Invalid response status: ${response.data.status}`)
    }
  } catch (error) {
    console.error('Error fetching MMR information:', error)
    return false
  }
}
