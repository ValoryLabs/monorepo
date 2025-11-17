<script setup lang="ts">
import { useElementBounding, useScroll, useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'

import ContainerScrollCard from '@/components/ui/ContainerScroll/ContainerScrollCard.vue'
import ContainerScrollTitle from '@/components/ui/ContainerScroll/ContainerScrollTitle.vue'

const containerRef = ref(null)
const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const { height } = useWindowSize()
const { y: scrollY } = useScroll(window)
const { bottom } = useElementBounding(containerRef)

const scrollYProgress = computed(() => {
  if (!bottom.value) return 0
  return 1 - Math.max(0, bottom.value - scrollY.value) / height.value
})

const scaleDimensions = computed(() => (isMobile.value ? [0.7, 0.9] : [1.05, 1]))

const rotate = computed(() => 20 * (1 - scrollYProgress.value))
const scale = computed(() => {
  const [start, end] = scaleDimensions.value
  return start + (end - start) * scrollYProgress.value
})
const translateY = computed(() => -100 * scrollYProgress.value)
const translateCardY = computed(() => scrollYProgress.value * 30 - 30)
</script>

<template>
  <div ref="containerRef" class="relative flex items-center justify-center">
    <div class="relative flex w-full flex-col gap-28" style="perspective: 1000px">
      <ContainerScrollTitle :translate="translateY">
        <slot name="title"></slot>
      </ContainerScrollTitle>
      <ContainerScrollCard :rotate="rotate" :scale="scale" :translate="translateCardY">
        <slot name="card" />
      </ContainerScrollCard>
    </div>
  </div>
</template>
