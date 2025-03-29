<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils.ts'
import { useVModel } from '@vueuse/core'

interface Props {
  modelValue?: string | number
  placeholder?: string
  id?: string
  class?: HTMLAttributes['class']
  disabled?: InputHTMLAttributes['disabled']
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  id: '',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})
</script>

<template>
  <div class="relative w-full max-w-sm items-center overflow-hidden">
    <span class="absolute inset-y-0 start-0 flex items-center justify-center pl-3">
      <slot />
    </span>
    <span class="absolute inset-y-0 start-0 flex items-center justify-center pl-3 blur-md">
      <slot />
    </span>
    <Input
      v-model="modelValue"
      :id="props.id"
      type="text"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="
        cn(
          'border-white/10 bg-transparent pl-10 font-medium transition-colors hover:bg-white/5 focus-visible:bg-white/5',
          props.class,
        )
      "
    />
  </div>
</template>
