<script setup lang="ts">
import OldOverlay from '@/components/overlays/OldOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import MiniOverlay from '@/components/overlays/MiniOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'

import { useHead } from '@unhead/vue'

useHead({
  title: 'Overlay',
})

const route = useRoute()
const overlaySettingsStore = useOverlayStore()

const updateStoreFromQuery = () => {
  const queryParams = route.query

  Object.keys(queryParams).forEach((key) => {
    if (key in overlaySettingsStore) {
      const value = queryParams[key]

      if (value === 'true' || value === 'false') {
        overlaySettingsStore[key] = value === 'true'
      } else {
        overlaySettingsStore[key] = decodeURIComponent(value as string)
      }
    }
  })
}

watch(() => route.query, updateStoreFromQuery)

const {
  backgroundColor,
  textColor,
  primaryTextColor,
  progressColor,
  progressBgColor,
  winColor,
  loseColor,
  overlayStyle,
  overlayFont,
  disabledBackground,
  disabledBackgroundGradient,
  disabledBorder,
  disabledGlowEffect,
  disabledLastMatchPoints,
  disabledWinLose,
  disabledProgress,
} = storeToRefs(overlaySettingsStore)

const overlay = computed(() => {
  switch (overlayStyle.value) {
    case 'old':
      return OldOverlay
    case 'minimal':
      return MiniOverlay
    case 'new_v2':
      return NewV2Overlay
    default:
      return NewOverlay
  }
})

const isVisible = ref(false)
let showTimeout: number | undefined
let hideTimeout: number | undefined

function scheduleShow() {
  isVisible.value = true
  hideTimeout = window.setTimeout(() => {
    isVisible.value = false
    showTimeout = window.setTimeout(scheduleShow, 300_000)
  }, 30_000)
}
onMounted(() => {
  updateStoreFromQuery()
  scheduleShow()
})

onUnmounted(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <component
      :is="overlay"
      :background-color="backgroundColor"
      :text-color="textColor"
      :primary-text-color="primaryTextColor"
      :progress-color="progressColor"
      :progress-bg-color="progressBgColor"
      :disabled-background="disabledBackground"
      :disabled-border="disabledBorder"
      :disabled-background-gradient="disabledBackgroundGradient"
      :disabled-glow-effect="disabledGlowEffect"
      :disabled-last-match-points="disabledLastMatchPoints"
      :disabled-win-lose="disabledWinLose"
      :disabled-progress="disabledProgress"
      :win-color="winColor"
      :lose-color="loseColor"
      :overlay-font="overlayFont"
      :rank-icon="5"
      :rank="'Radiant'"
      :elo="2222"
      :win="2"
      :lose="0"
      :ptsDelta="24"
      :rr="26"
      :lastMatches="['-', '-', '-', '-', '-']"
      :seasonWinRate="0"
      :riot-id="`MAGICX#1339`"
      :level="232"
    />
    <Transition>
      <div
        v-show="isVisible"
        class="inline-flex w-fit gap-1 text-[0.7rem] font-bold uppercase"
        :style="[
          overlayStyle !== 'old'
            ? disabledBackground
              ? ''
              : `background-color: ${backgroundColor}80`
            : disabledBackgroundGradient
              ? ''
              : `background-color: #00000080`,
          `color: ${primaryTextColor}`,
        ]"
        :class="[
          overlayStyle !== 'old'
            ? disabledBackground
              ? ''
              : 'rounded-b-lg px-3 py-px'
            : disabledBackgroundGradient
              ? ''
              : 'rounded-b-lg px-3 py-px',
        ]"
      >
        <span class="font-medium">SHOW STATS WITH</span> VALORY.SU
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
