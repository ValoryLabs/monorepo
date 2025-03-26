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
      <div class="flex h-fit flex-row py-3">
        <div class="flex h-fit flex-col gap-[5px]">
          <span
            class="text-[18px] font-bold uppercase leading-[1] text-[var(--primary-text-color)]"
          >
            IMMORTAL3 #46
          </span>
          <span
            class="flex flex-row items-center gap-2 text-base font-medium leading-[1] text-[var(--text-color)]"
          >
            1838 elo - 123RR
            <span class="text-[10px] font-normal text-[var(--win-color)]">+5</span>
          </span>
          <div v-if="!disabledWinLose" class="flex flex-row items-center gap-2">
            <div class="mt-[2px] flex flex-row items-center gap-1">
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs font-bold leading-[1] text-[var(--win-color)]"
                :style="{ backgroundColor: `${props.winColor}80` }"
              >
                W
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs font-bold leading-[1] text-[var(--lose-color)]"
                :style="{ backgroundColor: `${props.loseColor}80` }"
              >
                L
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs font-bold leading-[1] text-[var(--win-color)]"
                :style="{ backgroundColor: `${props.winColor}80` }"
              >
                W
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs font-bold leading-[1] text-[var(--lose-color)]"
                :style="{ backgroundColor: `${props.loseColor}80` }"
              >
                L
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] bg-[#61c4b9b3] text-xs font-bold leading-[1] text-[var(--win-color)]"
                :style="{ backgroundColor: `${props.winColor}80` }"
              >
                W
              </span>
            </div>
            <span class="text-sm font-medium leading-[1] text-[var(--text-color)]">40%</span>
          </div>
        </div>
      </div>
      <div
        v-if="!disabledProgress"
        class="absolute -bottom-[5px] left-0 h-2 w-full rounded-b-[8px]"
        :style="{ backgroundColor: `${props.progressColor}` }"
      ></div>
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
