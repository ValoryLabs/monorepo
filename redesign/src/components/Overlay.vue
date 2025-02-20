<script setup lang="ts">
import OldOverlay from "@/components/overlays/OldOverlay.vue";
import { useOverlayStore } from "@/stores/overlay.ts";
import { storeToRefs } from "pinia";
import NewOverlay from "@/components/overlays/NewOverlay.vue";

const overlaySettingsStore = useOverlayStore()
const { backgroundColor, textColor, primaryTextColor, progressColor,
      progressBgColor, winColor, loseColor, overlayStyle,
      disabledBackground, disabledBackgroundGradient,
      disabledLastMatchPoints, disabledWinLose, disabledProgress }
  = storeToRefs(overlaySettingsStore)

</script>

<template>
  <OldOverlay
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
    v-if="overlayStyle === 'old'"/>
  <NewOverlay
    :background-color="backgroundColor"
    :text-color="textColor"
    :primary-text-color="primaryTextColor"
    :progress-color="progressColor"
    :progress-bg-color="progressBgColor"
    :win-color="winColor"
    :lose-color="loseColor"
    :disabled-background="disabledBackground"
    :disabled-win-lose="disabledWinLose"
    :disabled-progress="disabledProgress"
    v-else/>
</template>