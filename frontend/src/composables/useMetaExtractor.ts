import { ref } from 'vue'
import { ofetch } from 'ofetch'
import * as cheerio from 'cheerio'

interface MetaData {
  url: string
  title?: string
  description?: string
  ogImage?: string
  favicon?: string
}

export function useMetaExtractor() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const extractMetaFromUrl = async (url: string): Promise<MetaData | null> => {
    loading.value = true
    error.value = null

    try {
      const proxy = 'https://corsproxy.io'
      const html = await ofetch(`${proxy}?${url}`)

      const $ = cheerio.load(html)

      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        $('meta[name="title"]').attr('content')

      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content')

      const ogImage = $('meta[property="og:image"]').attr('content')

      const favicon =
        $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href')

      return {
        url,
        title,
        description,
        ogImage,
        favicon,
      }
    } catch (err) {
      error.value = 'Failed to fetch metadata'
      console.error('Meta extraction error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    extractMetaFromUrl,
    loading,
    error,
  }
}
