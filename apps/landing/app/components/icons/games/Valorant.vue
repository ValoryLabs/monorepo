<script setup lang="ts">
interface Props {
  size?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: '#f2f2f2',
})
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 23.8347V4L31.9451 44H15.9726L0 23.8347Z" :fill="props.color" />
    <path d="M42.6484 30.6116H27.0051L48 4V23.8347L42.6484 30.6116Z" :fill="props.color" />
  </svg>
</template>
