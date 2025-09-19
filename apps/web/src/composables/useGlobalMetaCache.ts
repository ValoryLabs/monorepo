import { reactive } from 'vue'

interface CachedMeta {
  data: any
  timestamp: number
  preloadedImage?: boolean
}

const metaCache = reactive<Map<string, CachedMeta>>(new Map())
const CACHE_DURATION = 5 * 60 * 1000 // 5 минут

export function useGlobalMetaCache() {
  const getCached = (url: string): any | null => {
    const cached = metaCache.get(url)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }
    return null
  }

  const setCached = (url: string, data: any) => {
    metaCache.set(url, {
      data,
      timestamp: Date.now(),
      preloadedImage: false,
    })
  }

  const markImagePreloaded = (url: string) => {
    const cached = metaCache.get(url)
    if (cached) {
      cached.preloadedImage = true
    }
  }

  return { getCached, setCached, markImagePreloaded }
}
