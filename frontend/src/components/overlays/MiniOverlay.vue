<script setup lang="ts">
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus, Earth } from 'lucide-vue-next'

interface Props {
  backgroundColor?: string
  textColor?: string
  primaryTextColor?: string
  winColor?: string
  loseColor?: string
  disabledLeaderboardPlace?: boolean
  disabledPeakRank?: boolean
  disabledBackground?: boolean
  disabledBorder?: boolean
  disabledGlowEffect?: boolean
  disabledWinLose?: boolean
  disabledProgress?: boolean
  overlayFont?: string

  rankIcon?: string | number
  rank?: string
  rr?: number
  win?: number
  lose?: number
  ptsDelta?: number

  leaderboardPlace?: number | null
  peakId?: string | number
  peakName?: string
  peakRR?: number
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#07090e',
  textColor: '#f2f2f2',
  primaryTextColor: '#B9B4B4',
  winColor: '#00FFE3',
  loseColor: '#FF7986',

  disabledLeaderboardPlace: false,
  disabledPeakRank: false,
  disabledBackground: false,
  disabledBorder: false,
  disabledWinLose: false,
  disabledProgress: false,
  disabledGlowEffect: false,
  overlayFont: 'Inter',

  rankIcon: 'Unranked',
  rank: 'Unranked',
  rr: 0,
  win: 0,
  lose: 0,
  ptsDelta: 0,

  peakId: 'Unranked',
  peakName: 'Unranked',
  peakRR: 0,
  leaderboardPlace: null,
})

function extractRankNumber(rank: string): string {
  const match = rank.match(/\d+$/)
  return match ? match[0] : ''
}
</script>

<template>
  <div
    class="minimal-style flex w-full flex-row items-center justify-between gap-3 rounded-full bg-black/90 px-3 py-1"
    :style="{
      backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}99`,
      fontFamily: props.overlayFont,
    }"
    :class="{
      'overflow-hidden border-[2px] border-white/10': !disabledBackground,
      'border-none': disabledBorder,
      'h-fit': disabledBackground,
    }"
  >
    <div class="inline-flex items-center justify-center gap-2">
      <div class="relative" v-if="!disabledPeakRank">
        <div class="relative flex">
          <img
            :src="`/ranks/${props.peakId.toString()}.webp`"
            class="z-2"
            alt=""
            height="40"
            width="40"
            fetchpriority="high"
          />
          <img
            class="absolute top-1/2 left-1/2 size-10 max-w-[unset] -translate-x-1/2 -translate-y-1/2 transform blur-[10px]"
            v-if="!disabledGlowEffect"
            :src="`/ranks/${props.peakId.toString()}.webp`"
            alt=""
            fetchpriority="high"
          />
        </div>
        <span
          class="absolute top-0 right-0 z-2 flex size-4 flex-col items-center justify-center rounded-full bg-yellow-300"
        >
        </span>
      </div>
      <div
        class="font-bold text-[var(--primary-text-color)] uppercase"
        :class="{ 'drop-shadow-[0px_0px_6px_var(--primary-text-color)]': !disabledGlowEffect }"
      >
        {{ props.peakRR }} RR
      </div>
      <div class="relative">
        <div class="relative flex">
          <img
            :src="`/ranks/${props.rankIcon.toString()}.webp`"
            class="z-2"
            alt=""
            height="40"
            width="40"
            fetchpriority="high"
          />
          <img
            class="absolute top-1/2 left-1/2 size-10 max-w-[unset] -translate-x-1/2 -translate-y-1/2 transform blur-[10px]"
            v-if="!disabledGlowEffect"
            :src="`/ranks/${props.rankIcon.toString()}.webp`"
            alt=""
            fetchpriority="high"
          />
        </div>
        <span
          v-if="extractRankNumber(props.rank)"
          class="absolute top-0 right-0 z-2 flex size-4 flex-col items-center justify-center rounded-full bg-white text-sm leading-none font-medium text-black"
        >
          {{ extractRankNumber(props.rank) }}
        </span>
      </div>
      <div
        class="font-bold text-[var(--primary-text-color)] uppercase"
        :class="{ 'drop-shadow-[0px_0px_6px_var(--primary-text-color)]': !disabledGlowEffect }"
      >
        {{ props.rr }} RR
      </div>
    </div>
    <div v-if="!disabledWinLose" class="inline-flex items-center gap-2">
      <span
        v-if="props.leaderboardPlace && !disabledLeaderboardPlace"
        class="inline-flex items-center gap-1 font-bold text-[var(--primary-text-color)] uppercase"
        :class="{ 'drop-shadow-[0px_0px_6px_var(--primary-text-color)]': !disabledGlowEffect }"
      >
        <Earth />
        #{{ props.leaderboardPlace }}
      </span>
      <span
        class="inline-flex items-center gap-1 font-bold text-[var(--win-color)]"
        :class="{ 'drop-shadow-[0px_0px_6px_var(--win-color)]': !disabledGlowEffect }"
      >
        <ArrowUp />
        {{ props.win }}
      </span>
      <span
        class="inline-flex items-center gap-1 font-bold text-[var(--lose-color)]"
        :class="{ 'drop-shadow-[0px_0px_6px_var(--lose-color)]': !disabledGlowEffect }"
      >
        <ArrowDown />
        {{ props.lose }}
      </span>
      <span
        class="flex flex-row items-center gap-1 font-bold"
        :class="{
          'drop-shadow-[0px_0px_6px_var(--win-color)]': !disabledGlowEffect && props.ptsDelta > 0,
          'drop-shadow-[0px_0px_6px_var(--lose-color)]': !disabledGlowEffect && props.ptsDelta < 0,
          'drop-shadow-[0px_0px_6px_var(--primary-text-color)]':
            !disabledGlowEffect && props.ptsDelta === 0,
          'text-[var(--win-color)]': props.ptsDelta > 0,
          'text-[var(--lose-color)]': props.ptsDelta < 0,
          'text-[var(--primary-text-color)]': props.ptsDelta === 0,
        }"
      >
        <TrendingUp v-if="props.ptsDelta > 0" />
        <TrendingDown v-else-if="props.ptsDelta < 0" />
        <Minus v-else />
        {{ props.ptsDelta }}
      </span>
    </div>
  </div>
</template>

<style>
.minimal-style {
  --text-color: v-bind(textColor);
  --primary-text-color: v-bind(primaryTextColor);
  --win-color: v-bind(winColor);
  --lose-color: v-bind(loseColor);
}
</style>
