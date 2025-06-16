<script setup lang="ts">
import {useHead, useSeoMeta} from '@unhead/vue'
import {Toaster} from 'vue-sonner'
import AppLayout from "@/layouts/AppLayout.vue";

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
  <Toaster
    position="top-right"
    :toastOptions="{
      unstyled: true,
      class:
        'bg-black/70 p-4 text-foreground rounded-md flex w-[356px] items-center text-sm gap-3 backdrop-blur-md border border-white/10',
    }"
  />
  <AppLayout>
    <router-view/>
  </AppLayout>
</template>
