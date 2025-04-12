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
          src="/ranks/26.webp"
          class="relative z-10"
          alt=""
          height="55"
          width="55"
          preload="high"
        />
        <img
          v-if="!disabledGlowEffect"
          src="/ranks/26.webp"
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
            {{ $t('overlays.ranks.immortal') }} #46
          </span>
          <span
            class="flex flex-row items-center gap-2 text-base leading-none font-medium text-[var(--text-color)]"
          >
            1838 {{ $t('overlays.elo') }} - 123 {{ $t('overlays.rr') }}
            <span
              class="text-[10px] font-medium text-[var(--win-color)]"
              :class="{ 'drop-shadow-[0px_0px_6px_var(--win-color)]': !disabledGlowEffect }"
              >+5</span
            >
          </span>
          <div v-if="!disabledWinLose" class="flex flex-row items-center gap-2">
            <div class="mt-[2px] flex flex-row items-center gap-1">
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs leading-none font-bold text-[var(--win-color)]"
                :class="{ 'drop-shadow-[0px_0px_12px_var(--win-color)]': !disabledGlowEffect }"
                :style="{ backgroundColor: `${props.winColor}80` }"
              >
                {{ $t('overlays.win_short') }}
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs leading-none font-bold text-[var(--lose-color)]"
                :class="{ 'drop-shadow-[0px_0px_12px_var(--lose-color)]': !disabledGlowEffect }"
                :style="{ backgroundColor: `${props.loseColor}80` }"
              >
                {{ $t('overlays.lose_short') }}
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs leading-none font-bold text-[var(--win-color)]"
                :class="{ 'drop-shadow-[0px_0px_12px_var(--win-color)]': !disabledGlowEffect }"
                :style="{ backgroundColor: `${props.winColor}80` }"
              >
                {{ $t('overlays.win_short') }}
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] text-xs leading-none font-bold text-[var(--lose-color)]"
                :class="{ 'drop-shadow-[0px_0px_12px_var(--lose-color)]': !disabledGlowEffect }"
                :style="{ backgroundColor: `${props.loseColor}80` }"
              >
                {{ $t('overlays.lose_short') }}
              </span>
              <span
                class="flex h-5 w-5 flex-col items-center justify-center rounded-[4px] bg-[#61c4b9b3] text-xs leading-none font-bold text-[var(--win-color)]"
                :class="{ 'drop-shadow-[0px_0px_12px_var(--win-color)]': !disabledGlowEffect }"
                :style="{ backgroundColor: `${props.winColor}80` }"
              >
                {{ $t('overlays.win_short') }}
              </span>
            </div>
            <span class="text-sm leading-none font-bold text-[var(--text-color)]">40%</span>
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
