<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    textSize?: 'xl' | '2xl' | '3xl' | '4xl'
  }>(),
  {
    textSize: 'xl',
  }
)
</script>

<template>
  <div
    class="max-w-[700px] text-center font-semibold leading-tight tracking-tighter text-white"
    :class="
      cn(props.class, {
        'text-xl': props.textSize === 'xl',
        'text-2xl': props.textSize === '2xl',
        'text-3xl': props.textSize === '3xl',
        'text-4xl': props.textSize === '4xl',
      })
    "
  >
    <slot />
  </div>
</template>
