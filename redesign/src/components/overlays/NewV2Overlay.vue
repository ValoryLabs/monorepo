<script setup lang="ts">
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
  <div class="new-style flex w-[360px] flex-col">
    <div
      class="relative flex flex-row items-center rounded-[8px]"
      :style="{
        backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}99`,
      }"
      :class="{ 'border-[2px] border-white/10': !disabledBackground }"
    >
      <div class="px-5 py-7">
        <img src="/ranks/26.webp" alt="" height="55" width="55" preload="high" />
      </div>
      <div class="flex h-fit flex-1 flex-row justify-between py-3 pr-7">
        <div class="flex h-fit flex-col gap-[5px]">
          <span class="text-sm font-medium leading-[1] text-[var(--primary-text-color)]">
            MAGICX#1337
          </span>
          <span
            class="flex flex-row items-center gap-2 text-xl font-extrabold capitalize leading-[1] text-[var(--text-color)]"
          >
            Immortal 3
          </span>
          <span class="text-sm font-medium capitalize leading-[1] text-[var(--primary-text-color)]">
            Level: 200
          </span>
        </div>
        <div class="flex flex-col items-end gap-1">
          <span class="text-2xl font-extrabold text-[var(--win-color)]">54%</span>
          <span class="text-xs">Win rate</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.new-style {
  --text-color: v-bind(textColor);
  --primary-text-color: v-bind(primaryTextColor);
  --progress-color: v-bind(progressColor);
  --win-color: v-bind(winColor);
  --lose-color: v-bind(loseColor);
}
</style>
