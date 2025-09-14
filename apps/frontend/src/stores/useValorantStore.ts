import type { AccountV2Data, MMRV3Response } from '@/api/henrikdev-openapi'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useValorantStore = defineStore(
  'valorantStore',
  () => {
    const riotID: Ref<string> = ref<string>('')
    const apiKey: Ref<string> = ref<string>('')
    const puuid: Ref<string> = ref<string>('')
    const region: Ref<string> = ref<string>('')

    const AccountInformation: Ref<AccountV2Data> = ref({
      account_level: 0,
      card: '',
      name: '',
      platforms: [],
      puuid: '',
      region: '',
      tag: '',
      title: '',
      updated_at: '',
    })

    const MMRInformation: Ref<MMRV3Response> = ref({
      account: {
        name: '',
        puuid: '',
        tag: '',
      },
      peak: {
        tier: {
          id: 0,
          name: 'Unranked',
        },
        rr: 0,
      },
      current: {
        tier: {
          id: 0,
          name: 'Unranked',
        },
        rr: 0,
        last_change: 0,
        elo: 0,
      },
      leaderboard_placement: null,
    })

    const lastMarchID: Ref<number> = ref(0)
    const winCount: Ref<number> = ref(0)
    const loseCount: Ref<number> = ref(0)
    const lastMatches: Ref<string[]> = ref(['-', '-', '-', '-', '-'])
    const seasonWinrate: Ref<number> = ref(0)

    return {
      riotID,
      apiKey,
      puuid,
      region,

      AccountInformation,
      MMRInformation,
      lastMarchID,
      winCount,
      loseCount,
      lastMatches,
      seasonWinrate,
    }
  },
  {
    persist: {
      paths: ['riotID', 'apiKey', 'puuid', 'region'],
    },
  },
)
