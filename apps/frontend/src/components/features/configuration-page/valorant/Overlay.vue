<script setup lang="ts">
import {
  MiniOverlay,
  NewOverlay,
  NewV2Overlay,
  OldOverlay,
} from '@/components/features/overlays/valorant'
import { getAccountInformation, getMMRInformation } from '@/services/playerInformation.ts'
import { usePlayerStore, useUserStore, useValorantOverlayStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

const valorantOverlayStore = useValorantOverlayStore()
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
  disabledPeakRR,
  disabledLeaderboardPlace,
  disabledPeakRankIcon,
  disabledBackground,
  disabledBackgroundGradient,
  disabledBorder,
  disabledGlowEffect,
  disabledLastMatchPoints,
  disabledWinLose,
  disabledProgress,
} = storeToRefs(valorantOverlayStore)

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

onMounted(() => {
  if (configuratorActive.value) {
    getAccountInformation()
    getMMRInformation()
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
    :disabled-leaderboard-place="disabledLeaderboardPlace"
    :disabled-peak-rank-icon="disabledPeakRankIcon"
    :disabledPeakRR="disabledPeakRR"
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
    :peakId="MMRInformation.peak.tier.id"
    :peakName="MMRInformation.peak.tier.name"
    :peakRR="MMRInformation.peak.rr"
    :leaderboard-place="MMRInformation.leaderboard_placement"
  />
</template>
