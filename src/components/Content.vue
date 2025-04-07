<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'
import { generateMeshGradient } from 'meshgrad'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from '@/components/ui/PatternBackground/index'

import PatternBackground from '@/components/ui/PatternBackground/PatternBackground.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const currentGradient = ref(generateMeshGradient(8))
const nextGradient = ref(generateMeshGradient(8))
const isTransitioning = ref(false)

let intervalId: number | null = null

const updateGradient = () => {
  isTransitioning.value = true
  nextGradient.value = generateMeshGradient(8)

  setTimeout(() => {
    currentGradient.value = nextGradient.value
    isTransitioning.value = false
  }, 2000) // Duration of the transition
}

onMounted(() => {
  intervalId = setInterval(updateGradient, 10000)
})

onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
})
</script>

<template>
  <aside class="bg-background relative flex flex-1 items-center justify-center">
    <PatternBackground
      :animate="true"
      :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
      :variant="PATTERN_BACKGROUND_VARIANT.Dot"
      class="flex h-full w-full items-center justify-center"
      :speed="PATTERN_BACKGROUND_SPEED.Slow"
    >
      <div id="preview" class="relative z-20">
        <div class="relative z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]">
          <Overlay v-if="configuratorActive" />
          <div v-else class="w-fit text-center leading-[1.15] font-medium whitespace-pre-line">
            {{ $t('preview') }}
          </div>
        </div>
        <div
          class="animate-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
        >
          <div
            class="absolute top-1/2 left-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] transition-opacity duration-2000"
            :style="currentGradient"
            :class="{ 'opacity-0': isTransitioning }"
          ></div>
          <div
            class="absolute top-1/2 left-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] transition-opacity duration-2000"
            :style="nextGradient"
            :class="{ 'opacity-0': !isTransitioning }"
          ></div>
        </div>
      </div>
    </PatternBackground>
  </aside>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>
