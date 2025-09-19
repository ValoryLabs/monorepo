<script lang="ts" setup>
import { cn } from '@/lib/utils.ts'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span :class="cn(props.class)">
    <slot />
  </span>
</template>
