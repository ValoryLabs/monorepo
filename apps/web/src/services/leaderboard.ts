import type { AxiosResponse } from 'axios'
import { apiClient } from '.'

interface Player {
  name: string
  tag: string
  leaderboard_rank: number
  tier: number
  rr: number
  wins: number
  updated_at: string
}

export const getTopLeaderboard = async (): Promise<string[]> => {
  try {
    const response: AxiosResponse = await apiClient.get('/v3/leaderboard/eu/pc')

    if (response.data.status === 200 && Array.isArray(response.data.data.players)) {
      const players: Player[] = response.data.data.players.slice(0, 10)
      return players.map((player: Player) => `${player.name}#${player.tag}`)
    } else {
      console.warn('Invalid response format or empty players array')
      return []
    }
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
    return []
  }
}

export const getRandomPlayerName = async (defaultName: string = 'MAGICX#1337'): Promise<string> => {
  try {
    const players = await getTopLeaderboard()

    if (players.length === 0) {
      console.warn('No players found in leaderboard, using default name')
      return defaultName
    }

    const randomIndex = Math.floor(Math.random() * players.length)
    return players[randomIndex]
  } catch (error) {
    console.error('Error getting random player name:', error)
    return defaultName
  }
}
