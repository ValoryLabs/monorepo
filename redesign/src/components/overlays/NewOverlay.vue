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
<div class="new-style flex flex-col w-[360px]">
  <div
    class="relative flex flex-row items-center  rounded-[8px]"
    :style="{ backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}99` }"
    :class="{ 'border-[2px] border-white/10': !disabledBackground }"
  >
    <div class="py-7 px-5">
      <img src="/ranks/26.webp" alt="" height="55" width="55">
    </div>
    <div class="flex flex-row py-3 h-fit">
      <div class="flex flex-col gap-[5px] h-fit">
        <span class="uppercase text-[18px] font-bold leading-[1] text-[var(--primary-text-color)]">
          IMMORTAL3 #46
        </span>
        <span class="text-base text-[var(--text-color)] font-medium leading-[1] flex flex-row items-center gap-2">
          1838 elo - 123RR
          <span class="text-[var(--win-color)] font-normal text-[10px]">+5</span>
        </span>
        <div v-if="!disabledWinLose" class="flex flex-row gap-2 items-center">
          <div class="flex flex-row gap-1 items-center mt-[2px]">
            <span
              class="
                flex flex-col justify-center items-center font-bold text-xs text-[var(--win-color)] leading-[1] w-5 h-5
                 rounded-[4px]
              "
              :style="{  backgroundColor: `${props.winColor}80` }"
            >
              W
            </span>
            <span
              class="
                flex flex-col justify-center items-center font-bold text-xs text-[var(--lose-color)] leading-[1] w-5 h-5
                rounded-[4px]
              "
              :style="{  backgroundColor: `${props.loseColor}80` }"
            >
              L
            </span>
            <span
              class="
                flex flex-col justify-center items-center font-bold text-xs text-[var(--win-color)] leading-[1] w-5 h-5
                 rounded-[4px]
              "
              :style="{  backgroundColor: `${props.winColor}80` }"
            >
              W
            </span>
            <span
              class="
                flex flex-col justify-center items-center font-bold text-xs text-[var(--lose-color)] leading-[1] w-5 h-5
                rounded-[4px]
              "
              :style="{  backgroundColor: `${props.loseColor}80` }"
            >
              L
            </span>
            <span
              class="
                flex flex-col justify-center items-center font-bold text-xs text-[var(--win-color)] leading-[1] w-5 h-5
                bg-[#61c4b9b3] rounded-[4px]
              "
              :style="{  backgroundColor: `${props.winColor}80` }"
            >
              W
            </span>
          </div>
          <span class="font-medium text-sm text-[var(--text-color)] leading-[1]">40%</span>
        </div>
      </div>
    </div>
    <div
      v-if="!disabledProgress"
      class="absolute -bottom-[5px] left-0 w-full h-2 rounded-b-[8px]"
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