<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { Toaster } from 'vue-sonner'

const metaImg = 'meta.webp'
const metaTitle = 'Stream Overlays for Valorant - VALORY'
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

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
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
  <Toaster
    position="top-right"
    :toastOptions="{
      class: 'bg-black/80 text-[#f2f2f2] backdrop-blur, border border-white/10',
    }"
  />
  <RouterView />
</template>
