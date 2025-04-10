<script setup lang="ts">
import OldOverlay from '@/components/overlays/OldOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { onMounted, watch, computed } from 'vue'
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

onMounted(updateStoreFromQuery)

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
</script>

<template>
  <component
    :is="overlay"
    :background-color="backgroundColor"
    :text-color="textColor"
    :primary-text-color="primaryTextColor"
    :progress-color="progressColor"
    :progress-bg-color="progressBgColor"
    :disabled-background="disabledBackground"
    :disabled-background-gradient="disabledBackgroundGradient"
    :disabled-last-match-points="disabledLastMatchPoints"
    :disabled-win-lose="disabledWinLose"
    :disabled-progress="disabledProgress"
    :win-color="winColor"
    :lose-color="loseColor"
    :overlay-font="overlayFont"
    :disabled-border="disabledBorder"
    :disabled-glow-effect="disabledGlowEffect"
  />
</template>
