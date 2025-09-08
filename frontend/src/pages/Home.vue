<script setup lang="ts">
import { Hero, Preview } from '@/components/features/home-page'
import { useHead } from '@unhead/vue'
import { defineAsyncComponent } from 'vue'

import { DefaultLayout } from '@/layouts'
import { hidden } from '@/lib/utils.ts'
import { useI18n } from 'vue-i18n'

const Streamers = defineAsyncComponent(
  () => import('@/components/features/home-page/Streamers/StreamersSection.vue'),
)
const OpenSource = defineAsyncComponent(
  () => import('@/components/features/home-page/OpenSource.vue'),
)

const GetStarted = defineAsyncComponent(
  () => import('@/components/features/home-page/GetStarted.vue'),
)

const { t } = useI18n()

useHead({
  title: t('pages.home'),
})
</script>

<template>
  <DefaultLayout>
    <Hero />
    <Preview v-if="!hidden" />
    <Streamers />
    <OpenSource />
    <GetStarted />
  </DefaultLayout>
</template>
