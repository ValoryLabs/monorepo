<script setup lang="ts">
import { Hero, Preview } from '@/components/home-page'
import { useHead } from '@unhead/vue'
import { defineAsyncComponent } from 'vue'

import { DefaultLayout } from '@/layouts'
import { useI18n } from 'vue-i18n'

const Streamers = defineAsyncComponent(
  () => import('@/components/home-page/Streamers/StreamersSection.vue'),
)
const OpenSource = defineAsyncComponent(() => import('@/components/home-page/OpenSource.vue'))

const { t } = useI18n()

useHead({
  title: t('pages.home'),
})
</script>

<template>
  <DefaultLayout>
    <Hero />
    <Preview />
    <Streamers />
    <OpenSource />
  </DefaultLayout>
</template>
