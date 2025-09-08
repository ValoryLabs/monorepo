<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  color?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  color: '#F2F2F2',
})
</script>

<template>
  <svg
    width="934"
    height="300"
    viewBox="0 0 934 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="props.class"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM466.667 0V33.3333H433.333V266.667H466.667V300H633.333V200H533.333V100H633.333V0H466.667Z"
      :fill="props.color"
    />
  </svg>
</template>

<style scoped>
svg {
  margin-bottom: 0;
}
</style>
