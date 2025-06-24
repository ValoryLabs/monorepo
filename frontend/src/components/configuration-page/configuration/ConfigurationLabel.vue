<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils.ts";

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span :class="cn(props.class)">
    <slot />
  </span>
</template>
