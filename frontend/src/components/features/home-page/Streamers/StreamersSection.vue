<script setup lang="ts">
import { StreamersMarquee, StreamersRoot } from '@/components/features/home-page/Streamers/index.ts'
</script>

<template>
  <div id="streamers" class="container m-auto flex flex-col items-center gap-10">
    <div class="inline-flex items-start justify-between gap-6 w-full">
      <div class="flex flex-col justify-between gap-4 w-1/2">
        <span class="inline-block text-sm font-bold text-[#FF930F] uppercase">
          {{ $t('streamers.category') }}
        </span>
        <span class="text-2xl font-bold uppercase">
          {{ $t('streamers.title') }}
        </span>
        <span class="text-base font-normal whitespace-pre-line text-[#CECECE]">
          {{ $t('streamers.subtitle') }}
        </span>
      </div>
      <StreamersRoot>
        <StreamersMarquee />
      </StreamersRoot>
    </div>
    <div></div>
  </div>
</template>
