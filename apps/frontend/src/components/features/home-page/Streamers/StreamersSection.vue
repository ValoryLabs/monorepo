<script setup lang="ts">
import {
  StreamersMarquee,
  StreamersMarquee5lim,
} from '@/components/features/home-page/Streamers/index.ts'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { width } = useWindowSize()
</script>

<template>
  <div
    id="streamers"
    class="pt-24 container bg-background mx-auto xl:h-dvh flex xl:flex-row flex-col xl:items-end items-center justify-center gap-12"
  >
    <div class="flex flex-col xl:items-start sm:items-center gap-4 xl:pb-14 xl:w-1/2">
      <span
        class="inline-block xl:text-left text-center text-md font-bold bg-linear-to-b from-[#F2C94C] to-[#F2994A] bg-clip-text text-transparent uppercase"
      >
        {{ t('streamers.category') }}
      </span>
      <span class="text-4xl font-bold xl:text-left text-center uppercase">
        {{ t('streamers.title') }}
      </span>
      <span class="text-lg font-normal xl:text-left text-center text-neutral-400">
        {{ t('streamers.subtitle') }}
      </span>
    </div>
    <div
      class="relative flex size-full xl:max-w-1/2 flex-col overflow-hidden items-center justify-center"
    >
      <StreamersMarquee v-if="width > 1280" />
      <StreamersMarquee5lim v-else />
    </div>
  </div>
</template>
