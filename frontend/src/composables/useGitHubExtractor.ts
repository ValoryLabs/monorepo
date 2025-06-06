import { ref, computed } from 'vue'
import { ofetch } from 'ofetch'
import * as cheerio from 'cheerio'

const starsCache = ref<{ count: number; timestamp: number } | null>(null)
const CACHE_DURATION = 10 * 60 * 1000

export function useGitHubStars() {
  const starsCount = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStars = async () => {
    if (starsCache.value && Date.now() - starsCache.value.timestamp < CACHE_DURATION) {
      starsCount.value = starsCache.value.count
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await ofetch('https://api.github.com/repos/ValoryApp/Valory', {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'VALORY-App/1.0',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        timeout: 10000,
      })

      const count = data.stargazers_count || 0
      starsCount.value = count

      starsCache.value = { count, timestamp: Date.now() }
    } catch (apiError) {
      try {
        const proxy = 'https://corsproxy.io'
        const repoUrl = 'https://github.com/ValoryApp/Valory'
        const html = await ofetch(`${proxy}?${repoUrl}`, {
          timeout: 15000,
        })
        const $ = cheerio.load(html)

        const starsElement = $('a[href*="/stargazers"]').first()
        let stars = 0

        if (starsElement.length) {
          const starsText = starsElement.text().trim()
          const starsMatch = starsText.match(/[\d,]+/)
          if (starsMatch) {
            stars = parseInt(starsMatch[0].replace(/,/g, ''))
          }
        }

        starsCount.value = stars
        starsCache.value = { count: stars, timestamp: Date.now() }
      } catch (proxyError) {
        error.value = 'Failed to fetch stars'
        starsCount.value = 0
      }
    } finally {
      loading.value = false
    }
  }

  fetchStars()

  return {
    starsCount: computed(() => starsCount.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    refetch: fetchStars,
  }
}
