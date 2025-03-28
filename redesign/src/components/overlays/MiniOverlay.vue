<script setup lang="ts">
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-vue-next'

interface Props {
  backgroundColor?: string
  textColor?: string
  primaryTextColor?: string
  progressColor?: string
  progressBgColor?: string
  winColor?: string
  loseColor?: string
  disabledBackground?: boolean
  disabledWinLose?: boolean
  disabledProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#07090e',
  textColor: '#f2f2f2',
  primaryTextColor: '#B9B4B4',
  progressColor: '#00FFE3',
  progressBgColor: '#f2f2f2',
  winColor: '#00FFE3',
  loseColor: '#FF7986',
  disabledBackground: false,
  disabledWinLose: false,
  disabledProgress: false,
})
</script>

<template>
  <div
    class="minimal-style flex flex-row items-center justify-between gap-3 rounded-full bg-black/90 px-3 py-1"
    :style="{ backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}99` }"
    :class="{ 'overflow-hidden border-[2px] border-white/10': !disabledBackground }"
  >
    <div class="flex flex-row items-center justify-center gap-2">
      <div class="relative">
        <div class="relative flex">
          <img src="/ranks/26.webp" class="z-[2]" alt="" height="40" width="40" preload="high" />
          <img
            class="absolute left-1/2 top-1/2 size-10 max-w-[unset] -translate-x-1/2 -translate-y-1/2 transform blur-[10px]"
            src="/ranks/26.webp"
            alt=""
            preload="high"
          />
        </div>
        <span
          class="absolute right-0 top-0 z-[2] flex size-4 flex-col items-center justify-center rounded-full bg-white text-sm font-medium leading-none text-black"
        >
          3
        </span>
      </div>
      <div
        class="font-bold text-[var(--primary-text-color)] drop-shadow-[0px_0px_6px_var(--primary-text-color)]"
      >
        2000 RR
      </div>
    </div>
    <div v-if="!disabledWinLose" class="flex flex-row items-center gap-2">
      <span
        class="flex flex-row items-center gap-1 font-bold text-[var(--win-color)] drop-shadow-[0px_0px_6px_var(--win-color)]"
      >
        <ArrowUp />
        2
      </span>
      <span
        class="flex flex-row items-center gap-1 font-bold text-[var(--lose-color)] drop-shadow-[0px_0px_6px_var(--lose-color)]"
      >
        <ArrowDown />
        0
      </span>
      <span
        class="flex flex-row items-center gap-1 font-bold text-[var(--win-color)] drop-shadow-[0px_0px_6px_var(--win-color)]"
      >
        <TrendingUp />
        15
      </span>
    </div>
  </div>
</template>

<style>
.minimal-style {
  --text-color: v-bind(textColor);
  --primary-text-color: v-bind(primaryTextColor);
  --progress-color: v-bind(progressColor);
  --win-color: v-bind(winColor);
  --lose-color: v-bind(loseColor);
}
</style>
