<script setup lang="ts">
import {computed, onUnmounted, ref, watch} from 'vue'

interface Props {
  gridSize: [number, number]
  frames: number[][][]
  cellClass?: string
  cellActiveClass?: string
  cellInactiveClass?: string
  animationDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  cellClass: 'w-1 h-1',
  cellActiveClass: 'bg-primary',
  cellInactiveClass: 'bg-muted',
  animationDuration: 150
})

const currentFrameIndex = ref(0)
const [rows, cols] = props.gridSize

const cells = computed(() => {
  const result = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result.push({ row, col, id: `${row}-${col}` })
    }
  }
  return result
})

const activeCells = computed(() => {
  if (!props.frames.length) return new Set()

  const currentFrame = props.frames[currentFrameIndex.value] || []
  const activeSet = new Set<string>()

  currentFrame.forEach(([row, col]) => {
    activeSet.add(`${row}-${col}`)
  })

  return activeSet
})

let animationInterval: ReturnType<typeof setInterval> | null = null

const startAnimation = () => {
  if (animationInterval) clearInterval(animationInterval)

  animationInterval = setInterval(() => {
    if (props.frames.length > 0) {
      currentFrameIndex.value = (currentFrameIndex.value + 1) % props.frames.length
    }
  }, props.animationDuration)
}

const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

watch(() => props.frames, () => {
  currentFrameIndex.value = 0
  startAnimation()
}, { immediate: true })

onUnmounted(() => {
  stopAnimation()
})
</script>

<template>
  <div
    class="grid gap-[1px]"
    :style="{
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
    }"
  >
    <div
      v-for="cell in cells"
      :key="cell.id"
      :class="[
        cellClass,
        activeCells.has(cell.id) ? cellActiveClass : cellInactiveClass
      ]"
      class="transition-colors duration-75"
    />
  </div>
</template>
