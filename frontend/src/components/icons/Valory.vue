<script setup lang="ts">
interface Props {
  size?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: '#FA4454',
})
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 407 471"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M203.248 0L0 110.673V226.076L203.248 333.911L406.495 226.076V110.673L203.248 0ZM203.451 92.1793L108.802 143.597V197.212L203.451 247.311L298.101 197.212V143.597L203.451 92.1793Z"
      :fill="props.color"
    />
    <path
      d="M203.5 382.698L407 275.029V363.053L203.5 470.721L0 363.053V275.029L203.5 382.698Z"
      :fill="props.color"
    />
  </svg>
</template>
