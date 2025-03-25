<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const styles: string[] = ['old', 'new', 'new_v2', 'minimal']
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger class="w-full bg-transparent">
      <SelectValue placeholder="Select layout" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          {{ $t('components.selectLayout.title') }}
        </SelectLabel>
        <SelectItem v-for="style in styles" :key="style" :value="style">
          {{ $t('components.selectLayout.' + style) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
