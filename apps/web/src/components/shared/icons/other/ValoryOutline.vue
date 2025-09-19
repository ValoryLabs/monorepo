<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  size?: number
  color?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'white',
})
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    :class="props.class"
    viewBox="0 0 471 471"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M438.741 362.966L235.62 470.434L32.5 362.967V276.021L235.387 383.366L235.62 383.49L235.854 383.366L438.741 276.021V362.966ZM438.236 111.035V225.909L235.368 333.542L32.5 225.909V111.035L235.368 0.569336L438.236 111.035ZM330.777 143.384L330.516 143.242L235.811 91.7939L235.572 91.6641L235.334 91.7939L140.628 143.242L140.366 143.384V197.629L140.632 197.771L235.338 247.899L235.572 248.022L235.807 247.899L330.512 197.771L330.777 197.629V143.384Z"
      :stroke="props.color"
    />
  </svg>
</template>
