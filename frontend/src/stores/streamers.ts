import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

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

  const hasStreamers = computed(() => streamers.value.length > 0)

  const parseResponseData = (data: any): Streamer[] => {
    let parsedData = data

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
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        username: item.username || 'Unknown',
        followers: item.followers || '0',
        img: item.img || '',
        live: Boolean(item.live),
        verified: Boolean(item.verified),
        viewers: item.viewers || undefined,
        game: item.game || undefined,
        title: item.title || undefined,
      }))
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
        `${import.meta.env.APP_BACKEND_URL}/api/streamers/mixed-sort?${params}`,
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
  }
})
