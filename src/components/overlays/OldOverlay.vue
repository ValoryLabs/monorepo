<script setup lang="ts">
import { ArrowUp, ArrowDown } from 'lucide-vue-next'

interface Props {
  backgroundColor?: string
  textColor?: string
  primaryTextColor?: string
  progressColor?: string
  progressBgColor?: string
  winColor?: string
  loseColor?: string
  disabledBackground?: boolean
  disabledBackgroundGradient?: boolean
  disabledLastMatchPoints?: boolean
  disabledWinLose?: boolean
  disabledProgress?: boolean
  overlayFont?: string

  rankIcon?: string | number
  rank?: string
  rr?: number
  elo?: number
  win?: number
  lose?: number
  ptsDelta?: number
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#F2F2F2',
  textColor: '#f2f2f2',
  primaryTextColor: '#f2f2f2',
  progressColor: '#61baa4',
  progressBgColor: '#f2f2f2',
  winColor: '#00FFE3',
  loseColor: '#FF7986',
  disabledBackground: false,
  disabledBackgroundGradient: false,
  disabledLastMatchPoints: false,
  disabledWinLose: false,
  disabledProgress: false,
  overlayFont: 'Inter',

  rankIcon: 'Unranked',
  rank: 'Unranked',
  rr: 0,
  elo: 0,
  win: 0,
  lose: 0,
  ptsDelta: 0,
})
</script>

<template>
  <div
    class="old-style flex max-h-40 min-h-32 flex-row rounded-br-[90px]"
    :class="{ 'bg-linear-to-b from-[#ff000000] to-[#00000091]': !disabledBackgroundGradient }"
    :style="{ fontFamily: props.overlayFont }"
  >
    <div
      class="flex w-[100px] items-center justify-center bg-[var(--background-color)]/20"
      :style="{
        backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}40`,
      }"
    >
      <img
        :src="`/ranks/${props.rankIcon.toString()}.webp`"
        alt=""
        height="80"
        width="80"
        fetchpriority="high"
      />
    </div>
    <div
      class="ml-5 flex w-[340px] flex-col flex-nowrap content-between items-start justify-center gap-[6px] py-5 font-bold"
    >
      <span class="text-[20px] leading-none text-[var(--text-color)] uppercase"> RATING </span>
      <span class="text-[24px] leading-none text-[var(--primary-text-color)] uppercase">
        {{ props.rank }} - {{ props.rr }} RR
      </span>
      <span v-if="!disabledWinLose" class="text-[17px] leading-none text-[var(--text-color)]">
        Win:
        <span class="text-[var(--primary-text-color)]"> {{ props.win }} </span>
        Lose:
        <span class="text-[var(--primary-text-color)]"> {{ props.lose }} </span>
      </span>
      <div
        v-if="!disabledProgress"
        class="relative my-[1px] flex h-3 w-64 flex-col justify-center rounded-[10px] py-[6px] after:absolute after:flex after:h-3 after:w-56 after:flex-col after:justify-center after:rounded-[10px] after:bg-[var(--progress-color)] after:transition after:content-['']"
        :style="{ backgroundColor: `${props.progressBgColor}45` }"
      ></div>
      <div v-if="!disabledLastMatchPoints" class="inline-flex items-center gap-1 text-base">
        <span :class="`text-[15px] leading-none text-[var(--text-color)] uppercase`">
          Last match:
        </span>
        <span class="text-[15px] leading-none text-[var(--primary-text-color)] uppercase">
          {{ props.ptsDelta }} PTS
        </span>
        <ArrowUp
          v-if="props.ptsDelta > 0"
          class="size-4"
          :class="{ 'text-[var(--win-color)]': props.ptsDelta > 0 }"
        />
        <ArrowDown
          v-else-if="props.ptsDelta < 0"
          class="size-4"
          :class="{ 'text-[var(--lose-color)]': props.ptsDelta < 0 }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.old-style {
  --text-color: v-bind(textColor);
  --primary-text-color: v-bind(primaryTextColor);
  --progress-color: v-bind(progressColor);
  --win-color: v-bind(winColor);
  --lose-color: v-bind(loseColor);
}
</style>
