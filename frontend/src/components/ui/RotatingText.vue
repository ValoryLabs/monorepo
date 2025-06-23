<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  text: string
  class?: string
}

const props = defineProps<Props>()

const displayText = ref(props.text)
const isAnimating = ref(false)

watch(() => props.text, async (newText) => {
  if (newText === displayText.value) return

  isAnimating.value = true

  // Анимация исчезновения
  await new Promise(resolve => setTimeout(resolve, 150))

  displayText.value = newText

  // Анимация появления
  await new Promise(resolve => setTimeout(resolve, 50))

  isAnimating.value = false
})
</script>

<template>
  <div :class="props.class">
    <Transition
      name="text-rotate"
      mode="out-in"
    >
      <span
        :key="displayText"
        class="block text-sm font-medium"
      >
        {{ displayText }}
      </span>
    </Transition>
  </div>
</template>

<style scoped>
.text-rotate-enter-active,
.text-rotate-leave-active {
  transition: all 0.15s ease;
}

.text-rotate-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.text-rotate-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
