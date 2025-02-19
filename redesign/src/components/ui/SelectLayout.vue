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
import { useVModel } from "@vueuse/core";

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

const styles: Record<string, string> = {
  'old': 'Old style',
  'new': 'New style'
}
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger class="w-full bg-transparent">
      <SelectValue placeholder="Select layout" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Styles</SelectLabel>
        <SelectItem
          v-for="(value, key) in styles"
          :key="key"
          :value="key">
          {{ value }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>