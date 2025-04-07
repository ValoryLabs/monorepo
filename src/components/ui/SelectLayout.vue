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
import SelectSeparator from './select/SelectSeparator.vue'

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
    <SelectTrigger class="w-full cursor-pointer bg-transparent">
      <SelectValue :placeholder="$t('components.selectLayout.title')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          {{ $t('components.selectLayout.title') }}
        </SelectLabel>
        <SelectSeparator />
        <SelectItem class="cursor-pointer" v-for="style in styles" :key="style" :value="style">
          {{ $t('components.selectLayout.' + style) }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
