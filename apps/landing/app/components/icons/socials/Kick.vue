<script setup lang="ts">
  import { type HTMLAttributes } from "vue";

  interface Props {
    size?: number;
    color?: string;
    class?: HTMLAttributes["class"];
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 24,
  });
</script>

<template>
  <svg
    :class="props.class"
    fill="currentColor"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size"
    :height="props.size"
  >
    <path
      d="M64 464V48H192V144H272V96H320V48H448V176H400V224H352V288H400V336H441V464H313V416H264.5V368H200V464H64Z"
      :fill="props.color"
    ></path>
  </svg>
</template>

<style scoped>
  svg {
    margin-bottom: 0;
  }
</style>
