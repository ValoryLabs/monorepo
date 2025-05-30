<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { getOverlayData } from '@/api/backend.ts'

import OldOverlay from '@/components/overlays/OldOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import MiniOverlay from '@/components/overlays/MiniOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'
import { LoaderCircle } from 'lucide-vue-next'

useHead({
  title: 'Overlay',
})

interface Props {
  id: string
}

interface OverlayData {
  background_color: string
  disabled_background: boolean
  disabled_background_gradient: boolean
  disabled_border: boolean
  disabled_glow_effect: boolean
  disabled_last_match_points: boolean
  disabled_leaderboard_place: boolean
  disabled_peak_rank_icon: boolean
  disabled_peak_rr: boolean
  disabled_progress: boolean
  disabled_win_lose: boolean
  id: string
  lose_color: string
  overlay_font: string
  overlay_style: string
  primary_color: string
  progress_bg_color: string
  progress_color: string
  text_color: string
  user_id: number
  win_color: string
}

const props = defineProps<Props>()
const overlayId = ref<string>(props.id)
const loading = ref<boolean>(false)
const overlayData = ref<OverlayData | null>(null)

const isVisible = ref(false)
let showTimeout: number | undefined
let hideTimeout: number | undefined

const overlayStyle = computed(() => overlayData.value?.overlay_style || 'old')
const disabledBackground = computed(() => overlayData.value?.disabled_background || false)
const disabledBackgroundGradient = computed(
  () => overlayData.value?.disabled_background_gradient || false,
)
const backgroundColor = computed(() => overlayData.value?.background_color || '#07090E')
const primaryTextColor = computed(() => overlayData.value?.primary_color || '#f2f2f2')

const loadOverlayData = async (id: string): Promise<void> => {
  loading.value = true

  try {
    overlayData.value = await getOverlayData(id)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } catch (error) {
    console.error('Error loading overlay data:', error)
    overlayData.value = null
  } finally {
    loading.value = false
  }
}

const overlay = computed(() => {
  if (!overlayData.value) {
    return null
  }
  switch (overlayData.value.overlay_style) {
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
  loadOverlayData(overlayId.value)
})

watch(
  () => props.id,
  (newId: string) => {
    overlayId.value = newId
    loadOverlayData(newId)
  },
)

function scheduleShow() {
  isVisible.value = true
  hideTimeout = window.setTimeout(() => {
    isVisible.value = false
    showTimeout = window.setTimeout(scheduleShow, 300_000)
  }, 30_000)
}

onMounted(() => {
  scheduleShow()
})

onUnmounted(() => {
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>

<template>
  <div v-if="loading" class="flex h-10 w-dvw items-center justify-center">
    <span class="animate-spin font-bold">
      <LoaderCircle />
    </span>
  </div>
  <div v-else-if="overlayData" class="flex flex-col items-center">
    <component
      :is="overlay"
      :background-color="overlayData.background_color"
      :text-color="overlayData.text_color"
      :primary-text-color="overlayData.primary_color"
      :progress-color="overlayData.progress_color"
      :progress-bg-color="overlayData.progress_bg_color"
      :disabled-background="overlayData.disabled_background"
      :disabled-border="overlayData.disabled_border"
      :disabled-background-gradient="overlayData.disabled_background_gradient"
      :disabled-glow-effect="overlayData.disabled_glow_effect"
      :disabled-last-match-points="overlayData.disabled_last_match_points"
      :disabled-win-lose="overlayData.disabled_win_lose"
      :disabled-progress="overlayData.disabled_progress"
      :win-color="overlayData.win_color"
      :lose-color="overlayData.lose_color"
      :overlay-font="overlayData.overlay_font"
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
