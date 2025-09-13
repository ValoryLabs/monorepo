<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useVModel } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
}>()

const emits = defineEmits<(e: 'update:modelValue', payload: string) => void>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const states: string[] = ['Show', 'Hide']
</script>
<template>
  <Select v-model="modelValue">
    <SelectTrigger class="cursor-pointer bg-transparent">
      <SelectValue :placeholder="t('components.selectShowShortcuts')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem class="cursor-pointer" v-for="state in states" :key="state" :value="state">
          {{ state }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
