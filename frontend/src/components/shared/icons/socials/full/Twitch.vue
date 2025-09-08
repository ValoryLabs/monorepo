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
    enable-background="new 0 0 8192 2500"
    viewBox="0 0 8192 2500"
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    aria-label="Twitch"
    :class="props.class"
  >
    <g :fill="props.color">
      <path d="m596 840-.2-520.9h-595.8v1563.9l297.9 297.9 819.1.1v-596h-521v-149h521v-596z"></path>
      <path
        d="m2755 840v745h-149v-745h-595v745h-149v-745h-596v1043l297.9 297.9 1787.1.1v-1341z"
      ></path>
      <path d="m3500 840h596v1340.9h-595.8z"></path>
      <path d="m3500.2 319.1h595.8v372.9h-596z"></path>
      <path d="m5809 840-298 298.3v744.7l297.9 297.9 894.1.1v-596h-596v-149h596v-596z"></path>
      <path d="m7894 840h-446v-521h-596v1862h595v-745h149v745l596-.1v-1042.6z"></path>
      <path
        d="m4841 840-.3-520.9-595.7-.1v1564l297.8 297.9h819.2v-595.8l-521-.1v-149h521v-596z"
      ></path>
    </g>
  </svg>
</template>

<style scoped>
svg {
  margin-bottom: 0;
}
</style>
