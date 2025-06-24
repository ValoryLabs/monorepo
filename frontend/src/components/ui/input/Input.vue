<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  disabled?: InputHTMLAttributes['disabled']
  type?: InputHTMLAttributes['type']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    :disabled="props.disabled"
    :type="props.type"
    :class="
      cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground flex h-9 w-full rounded-md border px-3 py-2 font-mono text-sm font-medium file:border-0 file:bg-transparent file:text-sm focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
