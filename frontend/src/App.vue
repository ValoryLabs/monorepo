<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead, useSeoMeta } from '@unhead/vue'
import { Toaster } from 'vue-sonner'

const titleMain = 'VALORY'
const metaImg = 'meta.webp'
const metaTitle = 'Stream Overlay for Valorant - VALORY'
const metaDescription =
  'Enhance your Valorant stream with VALORY overlays. ' +
  'Engage viewers, showcase progress, and make your stream unforgettable!'
const metaKeywords =
  'valorant, valorant overlay, stream overlay, OBS overlay, valorant stream, ' +
  'valorant streaming, valorant tracker, valorant rank tracker, ' +
  'Valorant scoreboard overlay, Valorant stream graphics, valorant stream assets, ' +
  'valorant stream design, valorant stream templates, valorant stream enhancements, ' +
  'valorant stream tools, valorant stream customization, valorant stream widgets, ' +
  'valorant stream plugins, valorant stream resources, valorant stream overlays, valory'

// Loading состояние
const isLoading = ref(false)
const isPageReady = ref(true)
const router = useRouter()

// Отслеживание навигации
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isLoading.value = true
    isPageReady.value = false
  }
  next()
})

router.afterEach(() => {
  // Небольшая задержка для плавности
  setTimeout(() => {
    isLoading.value = false
    setTimeout(() => {
      isPageReady.value = true
    }, 100)
  }, 300)
})

useHead({
  title: metaTitle,
  titleTemplate: (title) => (title === metaTitle ? title : `${title} - ${titleMain}`),
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
})

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  viewport: 'width=device-width, initial-scale=1',
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: metaImg,
  twitterCard: 'summary_large_image',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: metaImg,
  author: 'MAGICX, misha@valory.su',
  keywords: metaKeywords,
})
</script>

<template>
  <Transition name="loading">
    <div
      v-if="isLoading"
      class="fixed top-0 left-0 right-0 z-50 h-px bg-gradient-to-r from-black to-[#FA4454] loading-bar"
    />
  </Transition>

  <Toaster
    position="top-right"
    :toastOptions="{
      unstyled: true,
      class:
        'bg-black/70 p-4 text-foreground rounded-md flex w-[356px] items-center text-sm gap-3 backdrop-blur-md border border-white/10',
    }"
  />

  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <component
        v-if="isPageReady"
        :is="Component"
        :key="route.path"
      />
    </Transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-bar {
  animation: loading-progress 0.8s ease-in-out infinite;
}

@keyframes loading-progress {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

.loading-enter-active {
  transition: opacity 0.2s ease;
}

.loading-leave-active {
  transition: opacity 0.3s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
