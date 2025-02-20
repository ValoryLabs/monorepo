<script setup lang="ts">
interface Props {
  backgroundColor?: string
  textColor?: string
  primaryTextColor?: string
  progressColor?: string
  progressBgColor?: string
  disabledBackground?: boolean
  disabledBackgroundGradient?: boolean
  disabledLastMatchPoints?: boolean
  disabledWinLose?: boolean
  disabledProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#F2F2F2',
  textColor: '#f2f2f2',
  primaryTextColor: '#f2f2f2',
  progressColor: '#61baa4',
  progressBgColor: '#f2f2f2',
  disabledBackground: false,
  disabledBackgroundGradient: false,
  disabledLastMatchPoints: false,
  disabledWinLose: false,
  disabledProgress: false,
})
</script>

<template>
  <div
    class="old-style flex max-h-40 min-h-32 flex-row rounded-br-[90px]"
    :class="{ 'bg-gradient-to-b from-[#ff000000] to-[#00000091]': !disabledBackgroundGradient }"
  >
    <div
      class="flex w-[100px] items-center justify-center bg-[var(--background-color)]/20"
      :style="{ backgroundColor: disabledBackground ? 'transparent' : `${props.backgroundColor}40` }"
    >
      <img src="/ranks/26.webp" alt="" height="80" width="80" />
    </div>
    <div
      class="ml-5 flex w-[340px] flex-col flex-nowrap content-between items-start justify-center gap-[6px] py-5 font-bold"
    >
      <span class="text-[20px] uppercase leading-[1] text-[var(--text-color)]">
        RATING
      </span>
      <span class="text-[24px] uppercase leading-[1] text-[var(--primary-text-color)]">
        Diamond 1 - 82RR
      </span>
      <span
        v-if="!disabledWinLose"
        :class="cn(`text-[17px] leading-[1] text-[var(--text-color)]`)"
      >
        Win:
        <span class="text-[var(--primary-text-color)]">
          0
        </span>
        Lose:
        <span class="text-[var(--primary-text-color)]">
          0
        </span>
      </span>
      <div
        v-if="!disabledProgress"
        class="relative my-[1px] flex h-3 w-64 flex-col justify-center rounded-[10px] py-[6px]
         after:absolute after:flex after:h-3 after:w-56 after:flex-col after:justify-center after:rounded-[10px]
         after:bg-[var(--progress-color)] after:transition after:content-['']"
        :style="{ backgroundColor: `${props.progressBgColor}45`}"
      ></div>
      <div v-if="!disabledLastMatchPoints" class="flex flex-row gap-1 text-base">
        <span :class="(`text-[15px] uppercase leading-[1] text-[var(--text-color)]`)">
          Last match:
        </span>
        <span :class="cn(`text-[15px] uppercase leading-[1] text-[var(--primary-text-color)]`)">
          32 PTS
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.old-style {
  --text-color: v-bind(textColor);
  --primary-text-color: v-bind(primaryTextColor);
  --progress-color: v-bind(progressColor);
}
</style>