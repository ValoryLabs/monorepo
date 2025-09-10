<template>
  <div
    :style="{ transform: `translateY(${props.translate}px)` }"
    class="mx-auto max-w-5xl text-center"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  translate: Number,
})
</script>
