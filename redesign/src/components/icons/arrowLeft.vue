<script setup lang="ts">
  interface Props {
    size?: number;
    color?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: "#f2f2f2"
  });
</script>

<template>
  <svg :width="props.size" :height="props.size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" :stroke="props.color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>