<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
  keys?: string[]
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div class="inline-flex items-center justify-center gap-1">
    <kbd
      v-for="key in keys"
      :key="key"
      :class="
        cn(
          'flex items-center justify-center rounded bg-white font-mono text-xs text-black drop-shadow-[0_0_10px_#ffffff4f]',
          [key.length > 1 ? 'h-5 px-1' : 'size-5'],
          props.class,
        )
      "
    >
      <slot>{{ key }} </slot>
    </kbd>
  </div>
</template>
