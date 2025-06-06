<script setup lang="ts">
import { ref, computed } from 'vue'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useMetaExtractor } from '@/composables/useMetaExtractor'
import { openLink } from '@/lib/utils.ts'
import { ExternalLink } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  url: string
  text?: string
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  showIcon: true,
})

const { extractMetaFromUrl, loading, error } = useMetaExtractor()
const metaData = ref<any>(null)
const hasLoaded = ref(false)

// Исправленное извлечение имени репозитория
const repoName = computed(() => {
  try {
    // Используем window.URL для безопасности
    if (typeof window !== 'undefined' && window.URL) {
      const urlObj = new window.URL(props.url)
      return urlObj.pathname.split('/').filter(Boolean).join('/')
    } else {
      // Fallback для SSR
      const match = props.url.match(/github\.com\/([^\/]+\/[^\/]+)/)
      return match ? match[1] : props.url
    }
  } catch {
    return props.url
  }
})

const handleMouseEnter = async () => {
  if (!hasLoaded.value && !loading.value) {
    hasLoaded.value = true
    metaData.value = await extractMetaFromUrl(props.url)
  }
}
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <div @mouseenter="handleMouseEnter" @click="openLink(props.url)">
        <slot />
      </div>
    </HoverCardTrigger>

    <HoverCardContent class="w-80 rounded-lg p-4" side="top">
      <Transition name="fade" mode="out-in">
        <div v-if="loading || error" key="skeleton" class="flex flex-col gap-2">
          <Skeleton class="mb-4 aspect-[120/63] w-full rounded-md border object-cover" />
          <Skeleton class="line-clamp-1 h-5 w-full rounded-md border" />
          <Skeleton class="line-clamp-3 h-12 w-full rounded-md border" />
        </div>

        <div v-else-if="metaData" key="content" class="overflow-hidden">
          <!-- Image -->
          <div
            v-if="metaData.ogImage"
            class="mb-4 aspect-[120/63] w-full rounded-md border object-cover"
          >
            <img
              :src="metaData.ogImage"
              :alt="metaData.title"
              class="h-full w-full rounded-md object-cover"
              fetchpriority="high"
            />
          </div>
          <!-- Text content -->
          <div class="flex flex-col gap-2">
            <h3 class="line-clamp-1 text-sm font-semibold text-white">
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
