<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Input } from '@/components/ui/input'
import { cn } from "@/utils.ts";
import { useVModel } from "@vueuse/core";

interface Props {
  modelValue?: string | number,
  placeholder?: string,
  id?: string,
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  id: '',
});

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true
})


</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input v-model="modelValue" :id="props.id" type="text" :placeholder="props.placeholder" :class="cn('pl-10 bg-transparent border-white/10 hover:bg-white/5 focus-visible:bg-white/5 transition-colors', props.class)" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center pl-3">
      <slot />
    </span>
  </div>
</template>