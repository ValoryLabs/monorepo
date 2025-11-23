<script setup lang="ts">
  import { type HTMLAttributes } from "vue";

  interface Props {
    size?: number;
    color?: string;
    class?: HTMLAttributes["class"];
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: "#F2F2F2",
  });
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    :class="props.class"
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 23.8347V4L31.9451 44H15.9726L0 23.8347Z" :fill="props.color" />
    <path d="M42.6484 30.6116H27.0051L48 4V23.8347L42.6484 30.6116Z" :fill="props.color" />
  </svg>
</template>
