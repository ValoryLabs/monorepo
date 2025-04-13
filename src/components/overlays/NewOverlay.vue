<script setup lang="ts">
interface Props {
  backgroundColor?: string
  textColor?: string
  primaryTextColor?: string
  winColor?: string
  loseColor?: string
  disabledBackground?: boolean
  disabledBorder?: boolean
  disabledGlowEffect?: boolean
  disabledWinLose?: boolean
  disabledProgress?: boolean
  overlayFont?: string

  rankIcon?: string
  rank?: string
  rr?: number
  elo?: number
  win?: number
  lose?: number
  ptsDelta?: number
  lastMatches?: string[]
  seasonWinRate?: number
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#07090e',
  textColor: '#f2f2f2',
  primaryTextColor: '#B9B4B4',
  winColor: '#00FFE3',
  loseColor: '#FF7986',
  disabledBackground: false,
  disabledBorder: false,
  disabledGlowEffect: false,
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
  lastMatches: () => ['-', '-', '-', '-', '-'],
  seasonWinRate: 0,
})
</script>

<template>
  <div class="new-style flex w-[360px] flex-col">
    <div
      class="relative flex flex-row items-center rounded-[8px]"
      :style="{
        backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}99`,
        fontFamily: props.overlayFont,
      }"
      :class="{ 'border-[2px] border-white/10': !disabledBackground && !disabledBorder }"
    >
      <div class="relative px-5 py-7">
        <img
          :src="`/ranks/${props.rankIcon}.webp`"
          class="relative z-10"
          alt=""
          height="55"
          width="55"
          preload="high"
        />
        <img
          v-if="!disabledGlowEffect"
          :src="`/ranks/${props.rankIcon}.webp`"
          class="absolute top-1/2 left-1/2 z-0 size-14 max-w-[unset] -translate-x-1/2 -translate-y-1/2 transform blur-[20px]"
          alt=""
          height="55"
          width="55"
          preload="high"
        />
      </div>
      <div class="flex h-fit flex-row py-3">
        <div class="flex h-fit flex-col gap-[5px]">
          <span
            class="text-[18px] leading-none font-bold text-[var(--primary-text-color)] uppercase"
          >
            {{ props.rank }}
          </span>
          <span
            class="flex flex-row items-center gap-2 text-base leading-none font-medium text-[var(--text-color)] uppercase"
          >
            {{ props.elo }} elo - {{ props.rr }} rr
            <span
              v-if="props.ptsDelta > 0 || props.ptsDelta < 0"
              class="text-[10px] font-medium"
              :class="{
                'drop-shadow-[0px_0px_6px_var(--win-color)]':
                  !disabledGlowEffect && props.ptsDelta > 0,
                'drop-shadow-[0px_0px_6px_var(--lose-color)]':
                  !disabledGlowEffect && props.ptsDelta < 0,
                'text-[var(--win-color)]': props.ptsDelta > 0,
                'text-[var(--lose-color)]': props.ptsDelta < 0,
              }"
              >{{ props.ptsDelta }}</span
            >
          </span>
          <div v-if="!disabledWinLose" class="mt-[2px] flex flex-row items-center gap-2">
            <div
              class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs leading-none font-bold"
              v-for="(result, index) in lastMatches"
              :key="index"
              :class="{
                'text-[var(--win-color)]': result === 'Win',
                'drop-shadow-[0px_0px_12px_var(--win-color)]':
                  !disabledGlowEffect && result === 'Win',
                'text-[var(--lose-color)]': result === 'Lose',
                'drop-shadow-[0px_0px_12px_var(--lose-color)]':
                  !disabledGlowEffect && result === 'Lose',
                'text-[var(--primary-text-color)]': result === 'Draw' || result === '-',
                'drop-shadow-[0px_0px_12px_var(--primary-text-color)]':
                  (!disabledGlowEffect && result === 'Draw') || result === '-',
              }"
              :style="{
                backgroundColor:
                  props.ptsDelta > 0
                    ? `${props.winColor}80`
                    : props.ptsDelta < 0
                      ? `${props.loseColor}80`
                      : `${props.primaryTextColor}80`,
              }"
            >
              <span v-if="result === 'Win'">W</span>
              <span v-else-if="result === 'Lose'">L</span>
              <span v-else-if="result === 'Draw'">D</span>
              <span v-else> - </span>
            </div>
            <span class="text-sm leading-none font-bold text-[var(--text-color)]">{{
              `${props.seasonWinRate}%`
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.new-style {
  --text-color: v-bind(textColor);
  --primary-text-color: v-bind(primaryTextColor);
  --win-color: v-bind(winColor);
  --lose-color: v-bind(loseColor);
}
</style>
