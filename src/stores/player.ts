import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface AccountInformation {
  account_level: number
  name: string
  tag: string
}

export interface MMRInformation {
  peak: {
    tier: {
      id: number
      name: string
    }
  }
  current: {
    tier: {
      id: number | string
      name: string
    }
    rr: number
    last_change: number
    elo: number
  }
  leaderboard_placement: number | null
}

export const usePlayerStore = defineStore('playerStore', () => {
  const AccountInformation: Ref<AccountInformation> = ref({
    account_level: 0,
    name: '',
    tag: '',
  })

  const MMRInformation: Ref<MMRInformation> = ref({
    peak: {
      tier: {
        id: 0,
        name: '',
      },
    },
    current: {
      tier: {
        id: 'Unranked',
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
    AccountInformation,
    MMRInformation,
    lastMarchID,
    winCount,
    loseCount,
    lastMatches,
    seasonWinrate,
  }
})
