<script setup lang="ts">
import { StreamersCard, StreamersCardSkeleton } from '@/components/features/home-page/Streamers'
import Marquee from '@/components/ui/Marquee.vue'
import { useStreamersStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const streamersStore = useStreamersStore()
const { streamers, loading, error } = storeToRefs(streamersStore)

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const safeStreamers = computed(() => {
  return streamers.value.filter(
    (streamer) => streamer && typeof streamer === 'object' && streamer.username && true,
  )
})

const shuffledStreamers = computed(() => shuffleArray(safeStreamers.value))

const middleIndex = computed(() => Math.floor(shuffledStreamers.value.length / 2))
const firstRow = computed(() => shuffledStreamers.value.slice(0, middleIndex.value))
const secondRow = computed(() => shuffledStreamers.value.slice(middleIndex.value))

const isLoading = computed(() => loading.value)
const hasError = computed(() => Boolean(error.value))
const showSkeleton = computed(() => isLoading.value || hasError.value)

onMounted(async () => {
  await streamersStore.fetchStreamers()
})
</script>

<template>
  <div v-if="showSkeleton" key="skeleton" class="flex gap-4 w-fit">
    <Marquee pause-on-hover class="[--duration:180s]" :vertical="true">
      <StreamersCardSkeleton v-for="i in 5" :key="i" />
    </Marquee>
    <Marquee reverse pause-on-hover class="[--duration:180s]" :vertical="true">
      <StreamersCardSkeleton v-for="i in 5" :key="i" />
    </Marquee>
  </div>
  <div v-else class="relative flex w-full items-center gap-8 overflow-hidden">
    <Marquee pause-on-hover class="[--duration:180s]" :vertical="true">
      <StreamersCard
        v-memo="[streamer]"
        v-for="streamer in firstRow"
        :key="streamer.username"
        :img="streamer.img"
        :username="streamer.username"
        :followers="streamer.followers"
        :live="streamer.live"
        :verified="streamer.verified"
      />
    </Marquee>
    <Marquee reverse pause-on-hover class="[--duration:180s]" :vertical="true">
      <StreamersCard
        v-memo="[streamer]"
        v-for="streamer in secondRow"
        :key="streamer.username"
        :img="streamer.img"
        :username="streamer.username"
        :followers="streamer.followers"
        :live="streamer.live"
        :verified="streamer.verified"
      />
    </Marquee>
    <div
      class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10"
    />
    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10"
    />
  </div>
</template>
