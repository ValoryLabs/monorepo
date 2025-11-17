<script setup lang="ts">
import {
  StreamersMarquee,
  StreamersMarquee5lim,
} from '@/components/features/home-page/Streamers/index.ts'
import { useStreamersStore } from '@/stores'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { width } = useWindowSize()

const streamersStore = useStreamersStore()
const { loading, error } = storeToRefs(streamersStore)

let streamers: any[] = []

onMounted(async () => {
  streamers = await streamersStore.getStreamersStats()
})
</script>

<template>
  <div
    id="streamers"
    class="pt-24 container mx-auto xl:h-dvh flex xl:flex-row flex-col items-center justify-center gap-12"
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
      <div class="w-full flex flex-row gap-6 items-center mt-4">
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold">{{ streamers.total_streamers }}</span>
          <span class="text-neutral-300">стримеров</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold">{{ streamers.total_followers }}</span>
          <span class="text-neutral-300">фолловеров</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold">{{ streamers.online_streamers }}</span>
          <span class="text-neutral-300">онлайн</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-3xl font-bold">{{ streamers.total_viewers }}</span>
          <span class="text-neutral-300">зрителей</span>
        </div>
      </div>
    </div>
    <div
      class="relative flex size-full xl:max-w-1/2 flex-col overflow-hidden items-center justify-center"
    >
      <StreamersMarquee v-if="width > 1280" />
      <StreamersMarquee5lim v-else />
    </div>
  </div>
</template>
