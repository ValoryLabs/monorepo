<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Hero from '@/components/home/Hero.vue'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const Streamers = defineAsyncComponent(() => import('@/components/home/Streamers/StreamersSection.vue'))
const OpenSource = defineAsyncComponent(() => import('@/components/home/OpenSource.vue'))

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
