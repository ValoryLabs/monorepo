<script setup lang="ts">
import { cn } from '@/lib/utils.ts'
import { Disc3 } from 'lucide-vue-next'
import type { DefaultOverlay } from './types.ts'

const props = withDefaults(defineProps<DefaultOverlay>(), {
  title: 'Title',
  artist: 'Artist',
  textColor: '#ffffff',
  backgroundColor: '#000000',
  avgCoverColor: false,
  hideBorder: true,
  borderColor: '#000000',
  borderRadius: [0],
  textFont: 'Geist',
  trimArtist: true,
})
</script>

<template>
  <div
    :class="
      cn(
        'default-overlay smooth-corners-lg bg-cover rounded-lg p-3 w-36 inline-flex gap-2 items-center',
        hideBorder ? 'border-2' : '',
      )
    "
    :style="{
      fontFamily: props.textFont,
      backgroundColor: props.backgroundColor,
      color: props.textColor,
      borderColor: props.borderColor,
    }"
  >
    <img v-if="props.coverUrl" :src="props.coverUrl" class="size-10 smooth-corners-lg rounded-lg" />
    <div
      v-else
      class="flex flex-col size-10 smooth-corners-lg rounded-lg bg-neutral-800 items-center justify-center"
    >
      <Disc3 class="size-5 animate-spin [animation-duration:3000ms]" />
    </div>
    <div class="flex flex-col gap-2">
      <span class="leading-none text-lg font-bold">{{ props.title }}</span>
      <span class="leading-none text-sm font-medium">{{ props.artist }}</span>
    </div>
  </div>
</template>
