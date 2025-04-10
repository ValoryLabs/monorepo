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

const fonts: string[] = [
  'Lato',
  'Lora',
  'Inter',
  'Geist',
  'Onest',
  'Roboto',
  'Manrope',
  'Poppins',
  'Gabarito',
  'Rajdhani',
  'Russo one',
  'Open Sans',
  'Geist Mono',
  'Space Mono',
  'Montserrat',
  'Space Grotesk',
  'JetBrains Mono',
  'Bricolage Grotesque',
]
</script>

<template>
  <Select v-model="modelValue">
    <SelectTrigger class="w-full cursor-pointer bg-transparent">
      <SelectValue :style="{ fontFamily: modelValue }" :placeholder="$t('components.selectFont')" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          {{ $t('components.selectFont') }}
        </SelectLabel>
        <SelectSeparator />
        <SelectItem
          class="cursor-pointer"
          v-for="font in fonts"
          :style="{ fontFamily: font }"
          :key="font"
          :value="font"
        >
          {{ font }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
