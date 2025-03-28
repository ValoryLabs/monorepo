<script setup lang="ts">
import OldOverlay from '@/components/overlays/OldOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import { useOverlayStore } from '@/stores/overlay.ts'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import MiniOverlay from '@/components/overlays/MiniOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'

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
  disabledBackground,
  disabledBackgroundGradient,
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
    :disabled-last-match-points="disabledLastMatchPoints"
    :disabled-win-lose="disabledWinLose"
    :disabled-progress="disabledProgress"
    :win-color="winColor"
    :lose-color="loseColor"
  />
</template>
