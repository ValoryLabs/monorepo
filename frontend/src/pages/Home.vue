<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Hero } from '@/components/home-page'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
import { DefaultLayout } from '@/layouts';

const Streamers = defineAsyncComponent(() => import('@/components/home-page/Streamers/StreamersSection.vue'))
const OpenSource = defineAsyncComponent(() => import('@/components/home-page/OpenSource.vue'))

const { t } = useI18n()

useHead({
  title: t('pages.home'),
})
</script>

<template>
  <DefaultLayout>
    <Hero />
    <Streamers />
    <OpenSource />
  </DefaultLayout>
</template>
