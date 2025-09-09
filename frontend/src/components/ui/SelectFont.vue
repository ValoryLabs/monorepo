<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SelectSeparator from './select/SelectSeparator.vue'

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
}>()

const emits = defineEmits<(e: 'update:modelValue', payload: string) => void>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const fonts: string[] = [
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Lato',
  'Poppins',
  'Inter',
  'DM Sans',
  'Public Sans',
  'Manrope',
  'Sora',
  'Outfit',
  'Urbanist',
  'Space Grotesk',
  'Geist',
  'JetBrains Mono',
  'Space Mono',
  'Geist Mono',
  'Lora',
  'Rajdhani',
  'Gabarito',
  'Oxanium',
  'Russo one',
  'Bricolage Grotesque',
  'Onest',
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
