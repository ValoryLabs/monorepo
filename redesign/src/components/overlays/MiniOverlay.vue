<script setup lang="ts">
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-row items-center justify-between gap-3 rounded-full bg-black/90 px-3 py-1">
    <div class="flex flex-row items-center justify-center gap-1">
      <div class="relative">
        <img src="/ranks/26.webp" alt="" height="40" width="40" />
        <span
          class="text-2xpcenter absolute right-0 top-0 flex size-4 flex-col items-center justify-center rounded-full bg-white font-medium leading-none text-black"
        >
          3
        </span>
      </div>
      <div class="font-bold">2000 RR</div>
    </div>
    <div class="flex flex-row items-center gap-2">
      <span class="flex flex-row items-center gap-1 font-bold text-green-400">
        <ArrowUp />
        2
      </span>
      <span class="flex flex-row items-center gap-1 font-bold text-red-600">
        <ArrowDown />
        0
      </span>
      <span class="flex flex-row items-center gap-1 font-bold text-green-400">
        <TrendingUp />
        15
      </span>
    </div>
  </div>
</template>
