/**
 * Import necessary dependencies for API interactions
 */
import { type AxiosResponse } from 'axios'
import { apiClient } from '.'

/**
 * Interface defining the structure of a player object returned from the API
 */
interface Player {
  name: string // Player's display name
  tag: string // Player's unique tag/identifier
  leaderboard_rank: number // Player's position on the leaderboard
  tier: number // Player's competitive tier
  rr: number // Player's rank rating points
  wins: number // Number of wins
  updated_at: string // Timestamp of last update
}

/**
 * Fetches the top 10 players from the EU PC leaderboard
 * @returns Promise that resolves to an array of player identifiers in "name#tag" format
 */
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

/**
 * Returns a random player name from the top leaderboard.
 * If the list is empty, returns the default string.
 *
 * @param defaultName Default name if player list is empty
 * @returns Promise with random player name or default value
 */
export const getRandomPlayerName = async (defaultName: string = 'MAGICX#1337'): Promise<string> => {
  try {
    // Get list of players from top leaderboard
    const players = await getTopLeaderboard()

    // Check that the list is not empty
    if (players.length === 0) {
      console.warn('No players found in leaderboard, using default name')
      return defaultName
    }

    // Select random player from the list
    const randomIndex = Math.floor(Math.random() * players.length)
    return players[randomIndex]
  } catch (error) {
    console.error('Error getting random player name:', error)
    return defaultName
  }
}
