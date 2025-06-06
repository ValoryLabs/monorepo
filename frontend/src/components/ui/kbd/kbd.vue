<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface KbdProps {
  keys?: string[] | string
  separator?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<KbdProps>(), {
  separator: '+',
  keys: () => [],
})

const normalizedKeys = computed(() => {
  if (typeof props.keys === 'string') {
    return [props.keys]
  }
  return Array.isArray(props.keys) ? props.keys : []
})

const hasLongKeys = computed(() => {
  return normalizedKeys.value.some((key) => key.length > 1)
})
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center gap-1 rounded border bg-white align-middle font-mono text-[10px] leading-loose font-medium text-black select-none',
        [hasLongKeys ? 'size-5' : 'h-5 px-1.5'],
        props.class,
      )
    "
  >
    <template v-for="(key, index) in normalizedKeys" :key="index">
      <kbd>{{ key }}</kbd>
      <span v-if="index < normalizedKeys.length - 1" class="text-black/50">
        {{ separator }}
      </span>
    </template>
  </span>
</template>
