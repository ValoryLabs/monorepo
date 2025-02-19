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
    <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" :stroke="props.color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>