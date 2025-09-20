<script setup lang="ts">
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useMetaExtractor } from '@/composables'
import { useGlobalMetaCache } from '@/composables/useGlobalMetaCache'
import { openLink } from '@/lib/utils.ts'
import { ForesightManager } from 'js.foresight'
import { BookIcon } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

interface Props {
  url: string
  text?: string
  showIcon?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
})

const { extractMetaFromUrl, error, loading } = useMetaExtractor()
const { getCached, setCached, markImagePreloaded } = useGlobalMetaCache()
const metaData = ref<any>(null)
const hasLoaded = ref(false)
const linkRef = ref<HTMLAnchorElement>()

const useImagePreloader = () => {
  const preloadedImages = new Set<string>()

  const preloadImage = async (src: string): Promise<void> => {
    if (preloadedImages.has(src)) return

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        preloadedImages.add(src)
        resolve()
      }
      img.onerror = (err) => {
        reject(err)
      }
      img.src = src
    })
  }

  return { preloadImage }
}

const { preloadImage } = useImagePreloader()

const repoName = computed(() => {
  try {
    if (typeof window !== 'undefined' && window.URL) {
      const urlObj = new window.URL(props.url)
      return urlObj.pathname.split('/').filter(Boolean).join('/')
    } else {
      const match = props.url.match(/github\.com\/([^\/]+\/[^\/]+)/)
      return match ? match[1] : props.url
    }
  } catch {
    return props.url
  }
})

const prefetchContent = async () => {
  if (loading.value) return

  const cacheKey = props.url

  const cachedData = getCached(cacheKey)
  if (cachedData) {
    metaData.value = cachedData
    hasLoaded.value = true

    if (cachedData.ogImage) {
      try {
        await preloadImage(cachedData.ogImage)
        markImagePreloaded(cacheKey)
      } catch (err) {
        console.warn('Ошибка предзагрузки изображения из кэша:', err)
      }
    }
    return
  }

  if (hasLoaded.value) return
  hasLoaded.value = true

  try {
    const meta = await extractMetaFromUrl(props.url)
    metaData.value = meta
    setCached(cacheKey, meta)

    if (meta?.ogImage) {
      try {
        await preloadImage(meta.ogImage)
        markImagePreloaded(cacheKey)
      } catch (err) {}
    }
  } catch (err) {
    hasLoaded.value = false
  }
}

const handleMouseEnter = async () => {
  if (!hasLoaded.value && !loading.value) {
    await prefetchContent()
  }
}

let foresightUnregister: (() => void) | null = null

const registerForesight = async () => {
  await nextTick()

  const element = linkRef.value

  if (!element) {
    return
  }

  if (typeof element.getBoundingClientRect !== 'function') {
    return
  }

  if (foresightUnregister) {
    return
  }

  try {
    const { unregister } = ForesightManager.instance.register({
      element: element,
      callback: prefetchContent,
      hitSlop: {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30,
      },
      name: `LinkPreview-${repoName.value || 'unnamed'}`,
      unregisterOnCallback: false,
    })

    foresightUnregister = unregister
  } catch (err) {
    console.error('Ошибка регистрации ForesightJS:', err)
  }
}

onMounted(() => {
  const cachedData = getCached(props.url)
  if (cachedData) {
    metaData.value = cachedData
    hasLoaded.value = true
  }

  registerForesight()

  setTimeout(() => {
    if (!foresightUnregister && linkRef.value) {
      registerForesight()
    }
  }, 100)
})

onUnmounted(() => {
  if (foresightUnregister) {
    try {
      foresightUnregister()
    } catch (err) {
      console.warn('Ошибка при отмене регистрации ForesightJS:', err)
    }
    foresightUnregister = null
  }
})
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <div @mouseenter="handleMouseEnter" @click="openLink(props.url)">
        <slot />
      </div>
    </HoverCardTrigger>

    <HoverCardContent class="w-80 rounded-lg p-4 border-neutral-800" side="top">
      <Transition name="fade" mode="out-in">
        <div v-if="loading || error" key="skeleton" class="flex flex-col gap-2">
          <Skeleton
            class="mb-4 aspect-[120/63] border-neutral-800 w-full rounded-md border object-cover"
          />
          <Skeleton class="line-clamp-1 h-5 w-full border-neutral-800 rounded-md border" />
          <Skeleton class="line-clamp-3 h-12 w-full border-neutral-800 rounded-md border" />
        </div>
        <div v-else-if="metaData" key="content" class="overflow-hidden">
          <div
            class="mb-4 aspect-[120/63] w-full rounded-md border border-neutral-800 object-cover"
          >
            <div
              v-if="!metaData.ogImage"
              class="h-full w-full rounded-md flex flex-col justify-center items-center"
            >
              <BookIcon class="size-6 text-[#e5e5e5]" />
            </div>
            <img
              v-else
              :src="metaData.ogImage"
              :alt="metaData.title"
              class="h-full w-full rounded-md object-cover"
              fetchpriority="high"
              loading="eager"
            />
          </div>
          <div class="flex flex-col gap-2">
            <h3
              @click="openLink(props.url)"
              class="cursor-pointer line-clamp-1 text-sm font-semibold text-white border-b border-dashed w-fit"
            >
              {{ metaData.title || repoName }}
            </h3>
            <p v-if="metaData.description" class="line-clamp-3 text-xs text-[#CECECE]">
              {{ metaData.description }}
            </p>
          </div>
        </div>
      </Transition>
    </HoverCardContent>
  </HoverCard>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
