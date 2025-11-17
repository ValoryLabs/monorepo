import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, type ComputedRef, type Ref, ref } from 'vue'

interface Streamer {
  username: string
  followers: string
  img: string
  live: boolean
  verified: boolean
  viewers?: number
  game?: string
  title?: string
}

export const useStreamersStore = defineStore('streamersStore', () => {
  const streamers: Ref<Streamer[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const hasStreamers: ComputedRef<boolean> = computed((): boolean => streamers.value.length > 0)

  const parseResponseData: (data: any) => Streamer[] = (data: any): Streamer[] => {
    let parsedData: any = data

    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data)
        console.log('Parsed string data to JSON:', parsedData)
      } catch (e) {
        console.error('Failed to parse JSON string:', e)
        return []
      }
    }

    if (!Array.isArray(parsedData)) {
      console.warn('Expected array from API, got:', typeof parsedData, parsedData)
      return []
    }

    return parsedData
      .filter((item: any): any => item && typeof item === 'object')
      .map(
        (item: any): Streamer => ({
          username: item.username || 'Unknown',
          followers: item.followers || '0',
          img: item.img || '',
          live: Boolean(item.live),
          verified: Boolean(item.verified),
          viewers: item.viewers || '',
          game: item.game || '',
          title: item.title || '',
        }),
      )
  }

  const fetchStreamers = async (
    options: {
      primary_sort?: string
      secondary_sort?: string
      sort_order?: 'asc' | 'desc'
      limit?: number
      verified_only?: boolean
      refresh_cache?: boolean
    } = {},
  ) => {
    const {
      primary_sort = 'live_status',
      secondary_sort = 'followers',
      sort_order = 'desc',
      limit = 20,
      verified_only = false,
      refresh_cache = false,
    } = options

    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        verified_only: verified_only.toString(),
        refresh_cache: refresh_cache.toString(),
      })

      const response = await axios.get(
        `https://${import.meta.env.APP_BACKEND}/api/streamers/mixed-sort?${params}`,
      )

      streamers.value = parseResponseData(response.data)
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message || 'Failed to fetch streamers'
      streamers.value = []
      console.error('Error fetching streamers:', err)
    } finally {
      loading.value = false
    }
  }

  const getStreamersStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await axios.get(`https://${import.meta.env.APP_BACKEND}/api/streamers/stats`)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.detail || err.message || 'Failed to fetch streamers stats'
      console.error('Error fetching streamers stats:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const refreshStreamers = async () => {
    await fetchStreamers({ refresh_cache: true })
  }

  const clearError = () => {
    error.value = null
  }

  return {
    streamers,
    loading,
    error,
    hasStreamers,
    fetchStreamers,
    refreshStreamers,
    clearError,
    getStreamersStats,
  }
})
