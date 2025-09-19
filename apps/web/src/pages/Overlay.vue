<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, watch } from 'vue'

import { Loading } from '@/components/shared/icons/motion-grid'
import { useMMRUpdater } from '@/composables/useMMRUpdater'
import { useOverlayData } from '@/composables/useOverlayData'
import { useOverlayScheduler } from '@/composables/useOverlayScheduler'
import { getOverlayComponent } from '@/lib/utils'
import { useValorantStore } from '@/stores'

interface Props {
  id: string
}

const props = defineProps<Props>()

useHead({
  title: 'Overlay',
})

// Stores
const valorantStore = useValorantStore()
const {
  riotID,
  apiKey,
  AccountInformation,
  MMRInformation,
  lastMatches,
  winCount,
  loseCount,
  seasonWinrate,
} = storeToRefs(valorantStore)

// Composables
const { overlayData, loading, successFetchInfo, loadOverlayData } = useOverlayData(riotID, apiKey)

const { isVisible } = useOverlayScheduler()
const { startMMRUpdates, stopMMRUpdates } = useMMRUpdater()

// Computed properties
const overlayComponent = computed(() => getOverlayComponent(overlayData.value?.overlay_style))
const overlayStyle = computed(() => overlayData.value?.overlay_style || 'old')
const disabledBackground = computed(() => overlayData.value?.disabled_background || false)
const disabledBackgroundGradient = computed(
  () => overlayData.value?.disabled_background_gradient || false,
)
const backgroundColor = computed(() => overlayData.value?.background_color || '#07090E')
const primaryTextColor = computed(() => overlayData.value?.primary_color || '#f2f2f2')

const overlayProps = computed(() => ({
  ...overlayData.value,
  'background-color': overlayData.value?.background_color,
  'text-color': overlayData.value?.text_color,
  'primary-text-color': overlayData.value?.primary_color,
  'progress-color': overlayData.value?.progress_color,
  'progress-bg-color': overlayData.value?.progress_bg_color,
  'win-color': overlayData.value?.win_color,
  'lose-color': overlayData.value?.lose_color,
  'overlay-font': overlayData.value?.overlay_font,
  'rank-icon': MMRInformation.value.current.tier.id,
  rank: MMRInformation.value.current.tier.name,
  elo: MMRInformation.value.current.elo,
  win: winCount.value,
  lose: loseCount.value,
  ptsDelta: MMRInformation.value.current.last_change,
  rr: MMRInformation.value.current.rr,
  lastMatches: lastMatches.value,
  seasonWinRate: seasonWinrate.value,
  'riot-id': `${AccountInformation.value.name}#${AccountInformation.value.tag}`,
  level: AccountInformation.value.account_level,
  peakId: MMRInformation.value.peak.tier.id,
  peakName: MMRInformation.value.peak.tier.name,
  peakRR: MMRInformation.value.peak.rr,
  'leaderboard-place': MMRInformation.value.leaderboard_placement,
}))

const brandingStyles = computed(() => {
  const baseStyles = `color: ${primaryTextColor.value}`

  if (overlayStyle.value !== 'old') {
    return disabledBackground.value
      ? baseStyles
      : `${baseStyles}; background-color: ${backgroundColor.value}80`
  }

  return disabledBackgroundGradient.value
    ? baseStyles
    : `${baseStyles}; background-color: #00000080`
})

const brandingClasses = computed(() => {
  const shouldShowBackground =
    overlayStyle.value !== 'old' ? !disabledBackground.value : !disabledBackgroundGradient.value

  return shouldShowBackground ? 'rounded-b-lg px-3 py-px' : ''
})

// Watchers
watch(
  () => props.id,
  (newId: string) => {
    loadOverlayData(newId)
  },
)

watch(successFetchInfo, (isSuccess) => {
  if (isSuccess) {
    startMMRUpdates()
  } else {
    stopMMRUpdates()
  }
})

// Lifecycle
onMounted(() => {
  loadOverlayData(props.id)
})

onUnmounted(() => {
  stopMMRUpdates()
})
</script>

<template>
  <div v-if="loading" class="flex h-10 w-dvw items-center justify-center">
    <Loading />
  </div>

  <div
    v-else-if="!loading && !successFetchInfo"
    class="flex h-10 w-dvw items-center justify-center text-red-500"
  >
    ERROR: Failed to load overlay data
  </div>

  <div v-else-if="successFetchInfo && overlayData" class="flex flex-col items-center">
    <component :is="overlayComponent" v-bind="overlayProps" />

    <Transition name="branding">
      <div
        v-show="isVisible"
        class="inline-flex w-fit gap-1 text-[0.7rem] font-bold uppercase"
        :style="brandingStyles"
        :class="brandingClasses"
      >
        <span class="font-medium">SHOW STATS WITH</span> VALORY.SU
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.branding-enter-active,
.branding-leave-active {
  transition: opacity 0.2s linear;
}

.branding-enter-from,
.branding-leave-to {
  opacity: 0;
}
</style>
