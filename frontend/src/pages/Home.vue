<script setup lang="ts">
// import Features from '@/components/home/Features.vue'
import { defineAsyncComponent } from 'vue'
import Hero from '@/components/home/Hero.vue'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'

const Streamers = defineAsyncComponent(() => import('@/components/home/Streamers.vue'))
const OpenSource = defineAsyncComponent(() => import('@/components/home/OpenSource.vue'))

const { t } = useI18n()

useHead({
  title: t('pages.home'),
})
</script>

<template>
  <Hero />
  <!-- <Features /> -->
  <Streamers />
  <OpenSource />
</template>
