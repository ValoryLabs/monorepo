<script setup lang="ts">
import { cn } from '@/lib/utils.ts'
import type { DefaultOverlay } from './types.ts'

const props = withDefaults(defineProps<DefaultOverlay>(), {
  title: 'Title',
  artist: 'Artist',
  coverUrl: 'https://www.indieground.net/images/blog/2024/indieblog-best-album-covers-2010s-07.jpg',
  textColor: '#ffffff',
  backgroundColor: '#000000',
  avgCoverColor: false,
  showBorder: true,
  borderColor: '#000000',
  borderRadius: 0,
  textFont: 'Geist',
  trimArtist: true,
})
</script>

<template>
  <div
    :class="
      cn(
        'default-overlay smooth-corners-lg bg-cover rounded-lg p-3 w-36 inline-flex gap-2 items-center',
        showBorder ? 'border-2' : '',
      )
    "
    :style="{
      fontFamily: props.textFont,
      backgroundColor: props.backgroundColor,
      color: props.textColor,
      borderColor: props.borderColor,
    }"
  >
    <div
      :style="{ backgroundImage: `url(${props.coverUrl})` }"
      class="size-10 smooth-corners-lg bg-cover rounded-lg"
    ></div>
    <div class="flex flex-col gap-2">
      <span class="leading-none text-lg font-bold">{{ props.title }}</span>
      <span class="leading-none text-sm font-medium">{{ props.artist }}</span>
    </div>
  </div>
</template>

<style scoped>
/*.default-overlay {
  background-color: v-bind('props.backgroundColor');
}*/
</style>
