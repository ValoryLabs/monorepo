<script setup lang="ts">
import OldOverlay from '@/components/overlays/OldOverlay.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { usePlayerStore } from '@/stores/player.ts'
import { storeToRefs } from 'pinia'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import MiniOverlay from './overlays/MiniOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'
import { computed } from 'vue'

const overlaySettingsStore = useOverlayStore()
const playerStore = usePlayerStore()
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

const { AccountInformation, MMRInformation, lastMatches, winCount, loseCount, seasonWinrate } =
  storeToRefs(playerStore)

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
    :disabled-border="disabledBorder"
    :disabled-background-gradient="disabledBackgroundGradient"
    :disabled-glow-effect="disabledGlowEffect"
    :disabled-last-match-points="disabledLastMatchPoints"
    :disabled-win-lose="disabledWinLose"
    :disabled-progress="disabledProgress"
    :win-color="winColor"
    :lose-color="loseColor"
    :overlay-font="overlayFont"
    :rank-icon="MMRInformation.current.tier.id"
    :rank="MMRInformation.current.tier.name"
    :elo="MMRInformation.current.elo"
    :win="winCount"
    :lose="loseCount"
    :ptsDelta="MMRInformation.current.last_change"
    :rr="MMRInformation.current.rr"
    :lastMatches="lastMatches"
    :seasonWinRate="seasonWinrate"
    :riot-id="`${AccountInformation.name}#${AccountInformation.tag}`"
    :level="AccountInformation.account_level"
  />
</template>
