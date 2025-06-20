<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import Marquee from '@/components/ui/Marquee.vue'
import StreamersCard from '@/components/ui/StreamersCard.vue'
import { STREAMERS_DATA } from '@/data'

const ROWS_COUNT = 3
const CARDS_PER_ROW = Math.ceil(STREAMERS_DATA.length / ROWS_COUNT)

const initializeRows = () => {
  return Array.from({ length: ROWS_COUNT }, (_, i) =>
    STREAMERS_DATA.slice(i * CARDS_PER_ROW, (i + 1) * CARDS_PER_ROW)
  )
}

const rows = ref(initializeRows())
const isVisible = ref(true)
const isReady = ref(false)

let observer: IntersectionObserver | null = null
const containerRef = ref<HTMLElement>()

onMounted(async () => {
  await nextTick()
  isReady.value = true

  if (containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const safeRows = computed(() => {
  return rows.value.length >= ROWS_COUNT ? rows.value : Array(ROWS_COUNT).fill([])
})
</script>

<template>
  <div
    ref="containerRef"
    class="bg-background relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl"
    :class="{ 'animation-paused': !isVisible }"
  >
    <template v-if="isReady">
      <Marquee
        v-if="safeRows[0]?.length > 0"
        pause-on-hover
        class="[--duration:120s]"
        :repeat="3"
      >
        <StreamersCard
          v-for="streamer in safeRows[0]"
          :key="`row1-${streamer.username}`"
          :img="streamer.img"
          :username="streamer.username"
          :followers="streamer.followers"
          :live="streamer.live"
          :verified="streamer.verified"
        />
      </Marquee>

      <Marquee
        v-if="safeRows[1]?.length > 0"
        reverse
        pause-on-hover
        class="[--duration:120s]"
        :repeat="3"
      >
        <StreamersCard
          v-for="streamer in safeRows[1]"
          :key="`row2-${streamer.username}`"
          :img="streamer.img"
          :username="streamer.username"
          :followers="streamer.followers"
          :live="streamer.live"
          :verified="streamer.verified"
        />
      </Marquee>

      <Marquee
        v-if="safeRows[2]?.length > 0"
        pause-on-hover
        class="[--duration:120s]"
        :repeat="3"
      >
        <StreamersCard
          v-for="streamer in safeRows[2]"
          :key="`row3-${streamer.username}`"
          :img="streamer.img"
          :username="streamer.username"
          :followers="streamer.followers"
          :live="streamer.live"
          :verified="streamer.verified"
        />
      </Marquee>
    </template>

    <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent"></div>
    <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent"></div>
  </div>
</template>

<style scoped>
.animation-paused * {
  animation-play-state: paused !important;
}
</style>
