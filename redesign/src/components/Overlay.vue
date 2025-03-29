<script setup lang="ts">
import OldOverlay from '@/components/overlays/OldOverlay.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import MiniOverlay from './overlays/MiniOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'

const overlaySettingsStore = useOverlayStore()
const {
  backgroundColor,
  textColor,
  primaryTextColor,
  progressColor,
  progressBgColor,
  winColor,
  loseColor,
  overlayStyle,
  disabledBackground,
  disabledBackgroundGradient,
  disabledGlowEffect,
  disabledLastMatchPoints,
  disabledWinLose,
  disabledProgress,
} = storeToRefs(overlaySettingsStore)
</script>

<template>
  <component
    :is="
      overlayStyle === 'old'
        ? OldOverlay
        : overlayStyle === 'minimal'
          ? MiniOverlay
          : overlayStyle === 'new_v2'
            ? NewV2Overlay
            : NewOverlay
    "
    :background-color="backgroundColor"
    :text-color="textColor"
    :primary-text-color="primaryTextColor"
    :progress-color="progressColor"
    :progress-bg-color="progressBgColor"
    :disabled-background="disabledBackground"
    :disabled-background-gradient="disabledBackgroundGradient"
    :disabled-glow-effect="disabledGlowEffect"
    :disabled-last-match-points="disabledLastMatchPoints"
    :disabled-win-lose="disabledWinLose"
    :disabled-progress="disabledProgress"
    :win-color="winColor"
    :lose-color="loseColor"
  />
</template>
