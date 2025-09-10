<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

// State for tracking card rotation
const rotation = reactive({ x: 0, y: 0 })
const isHovering = ref(false)
const cardRef = ref<HTMLElement | null>(null)
const mousePosition = reactive({ x: 0.5, y: 0.5 }) // Default to center

// Function to handle mouse movement
const handleMouseMove = (event: MouseEvent) => {
  if (!cardRef.value || !isHovering.value) return

  const card = cardRef.value
  const rect = card.getBoundingClientRect()

  // Calculate the center of the card
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Calculate mouse position relative to the center of the card
  const mouseX = event.clientX - centerX
  const mouseY = event.clientY - centerY

  // Save the opposite position of the mouse for the glow effect (in percentages relative to the card size)
  mousePosition.x = 1 - (event.clientX - rect.left) / rect.width
  mousePosition.y = 1 - (event.clientY - rect.top) / rect.height

  // Convert mouse offset into rotation values
  const normalizedX = mouseX / (rect.width / 2)
  const normalizedY = mouseY / (rect.height / 2)

  rotation.x = -normalizedY
  rotation.y = normalizedX
}

// Function to handle mouse enter event
const handleMouseEnter = () => {
  isHovering.value = true
}

// Function to handle mouse leave event
const handleMouseLeave = () => {
  isHovering.value = false
  rotation.x = 0
  rotation.y = 0
}

// Add and remove event listeners for mouse movement
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

// Calculate rotation angle based on mouse position
const rotationAngle = computed(() => {
  return Math.sqrt(rotation.x ** 2 + rotation.y ** 2) * 10
})

// Computed properties for CSS variables
const glowX = computed(() => `${mousePosition.x * 100}%`)
const glowY = computed(() => `${mousePosition.y * 100}%`)
</script>

<template>
  <div
    ref="cardRef"
    class="relative size-fit cursor-pointer perspective-[600px]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="
        cn(
          'card relative size-fit overflow-hidden transition-transform duration-200 ease-out',
          { 'glow-active': isHovering },
          props.class,
        )
      "
      :style="{
        transform: isHovering
          ? `rotate3d(${rotation.x}, ${rotation.y}, 0, ${rotationAngle}deg)`
          : '',
        '--glow-x': glowX,
        '--glow-y': glowY,
      }"
    >
      <slot />

      <!-- Explicit glow element -->
      <div
        class="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200"
        :class="{ 'opacity-100': isHovering }"
        :style="{
          background: `radial-gradient(circle at ${glowX} ${glowY}, hsla(222deg 14% 93% / 0.15), transparent 50%)`,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.card {
  --glow-x: 50%;
  --glow-y: 50%;
}

.glow-active {
  transition: transform 0.2s ease-out;
}
</style>
