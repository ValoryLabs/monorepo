<script setup lang="ts">
import Marquee from '@/components/ui/Marquee.vue'
import StreamersCard from '@/components/ui/StreamersCard.vue'
import { STREAMERS_DATA } from '@/data/Streamers.data'
const rowSize = Math.ceil(STREAMERS_DATA.length / 3)
const rows = Array.from({ length: 3 }, (_, i) =>
  STREAMERS_DATA.slice(i * rowSize, (i + 1) * rowSize),
)
</script>
<template>
  <div
    class="relative flex h-screen w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg"
  >
    <Marquee
      v-for="(row, index) in rows"
      :key="index"
      :reverse="index % 2 !== 0"
      pause-on-hover
      class="skew-x-12 [--duration:180s]"
    >
      <StreamersCard
        v-for="streamer in row"
        :key="streamer.username"
        :img="streamer.img"
        :username="streamer.username"
        :followers="streamer.followers"
        :live="streamer.live"
        :verified="streamer.verified"
      />
    </Marquee>

    <div class="pointer-events-none absolute left-0 top-0 h-full w-1/6">
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 0) 33.33333333333333%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 0) 33.33333333333333%
          );
          backdrop-filter: blur(0px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 0) 44.44444444444444%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 0) 44.44444444444444%
          );
          backdrop-filter: blur(1px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 0) 55.55555555555556%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 0) 55.55555555555556%
          );
          backdrop-filter: blur(2px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 0) 66.66666666666666%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 0) 66.66666666666666%
          );
          backdrop-filter: blur(3px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 0) 77.77777777777777%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 0) 77.77777777777777%
          );
          backdrop-filter: blur(4px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 0) 88.88888888888889%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 0) 88.88888888888889%
          );
          backdrop-filter: blur(5px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 0) 100%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 0) 100%
          );
          backdrop-filter: blur(6px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 1) 100%,
            rgba(255, 255, 255, 0) 111.11111111111111%
          );
          -webkit-mask-image: linear-gradient(
            270deg,
            rgba(255, 255, 255, 0) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 1) 100%,
            rgba(255, 255, 255, 0) 111.11111111111111%
          );
          backdrop-filter: blur(7px);
        "
      ></div>
    </div>
    <div class="pointer-events-none absolute right-0 top-0 h-full w-1/6">
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 0) 33.33333333333333%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 0) 33.33333333333333%
          );
          backdrop-filter: blur(0px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 0) 44.44444444444444%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 11.11111111111111%,
            rgba(255, 255, 255, 1) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 0) 44.44444444444444%
          );
          backdrop-filter: blur(1px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 0) 55.55555555555556%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 22.22222222222222%,
            rgba(255, 255, 255, 1) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 0) 55.55555555555556%
          );
          backdrop-filter: blur(2px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 0) 66.66666666666666%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 33.33333333333333%,
            rgba(255, 255, 255, 1) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 0) 66.66666666666666%
          );
          backdrop-filter: blur(3px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 0) 77.77777777777777%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 44.44444444444444%,
            rgba(255, 255, 255, 1) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 0) 77.77777777777777%
          );
          backdrop-filter: blur(4px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 0) 88.88888888888889%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 55.55555555555556%,
            rgba(255, 255, 255, 1) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 0) 88.88888888888889%
          );
          backdrop-filter: blur(5px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 0) 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 66.66666666666666%,
            rgba(255, 255, 255, 1) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 0) 100%
          );
          backdrop-filter: blur(6px);
        "
      ></div>
      <div
        class="pointer-events-none absolute inset-0 rounded-[inherit]"
        style="
          mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 1) 100%,
            rgba(255, 255, 255, 0) 111.11111111111111%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 77.77777777777777%,
            rgba(255, 255, 255, 1) 88.88888888888889%,
            rgba(255, 255, 255, 1) 100%,
            rgba(255, 255, 255, 0) 111.11111111111111%
          );
          backdrop-filter: blur(7px);
        "
      ></div>
    </div>
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"
    ></div>
  </div>
</template>
