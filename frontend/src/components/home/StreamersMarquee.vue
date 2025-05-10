<script setup lang="ts">
import Marquee from '@/components/ui/Marquee.vue'
import StreamersCard from '@/components/ui/StreamersCard.vue'
import { STREAMERS_DATA } from '@/data/Streamers.data'

const middleIndex = Math.floor(STREAMERS_DATA.length / 3)

const [firstRow, secondRow, thirdRow] = [
  STREAMERS_DATA.slice(0, middleIndex),
  STREAMERS_DATA.slice(middleIndex, 2 * middleIndex),
  STREAMERS_DATA.slice(2 * middleIndex),
]
</script>

<template>
  <div
    class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl"
  >
    <Marquee pause-on-hover class="[--duration:180s]">
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
    <Marquee reverse pause-on-hover class="[--duration:180s]">
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
    <Marquee pause-on-hover class="[--duration:180s]">
      <StreamersCard
        v-memo="[streamer]"
        v-for="streamer in thirdRow"
        :key="streamer.username"
        :img="streamer.img"
        :username="streamer.username"
        :followers="streamer.followers"
        :live="streamer.live"
        :verified="streamer.verified"
      />
    </Marquee>
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
    ></div>
  </div>
</template>
