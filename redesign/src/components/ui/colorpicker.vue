<script lang="ts" setup>
import tinycolor from 'tinycolor2'
import { onMounted, reactive, ref, watch } from 'vue'
import InputWithIcon from "@/components/ui/InputWithIcon.vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from "@/components/ui/input";

interface RGB {
  r: number
  g: number
  b: number
}

const props = defineProps({
  modelValue: {
    type: String,
    default: '#ffffff',
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const hue = ref<number>(0)
const saturation = ref<number>(1)
const brightness = ref<number>(1)
const rgb = reactive<RGB>({ r: 255, g: 255, b: 255 })
const hex = ref<string>(props.modelValue)

const presetColors: string[] = [
  '#BB2649',
  '#F25C54',
  '#A78EC1',
  '#FF9F00',
  '#43B2A1',
  '#F1F2F2',
  '#FF9E6D',
  '#004F8C',
  '#B4A0D0',
  '#F2C1D1',
  '#F1B79B',
  '#F4A300',
  '#0D7A56',
  '#E8C6D2',
  '#4C8C8B',
  '#07090E',
]

const saturationRef = ref<HTMLDivElement | null>(null)
const hueRef = ref<HTMLDivElement | null>(null)

function updateColor(): void {
  const color = tinycolor({ h: hue.value, s: saturation.value, v: brightness.value })
  const { r, g, b } = color.toRgb()
  rgb.r = r
  rgb.g = g
  rgb.b = b
  hex.value = color.toHexString()
  emit('update:modelValue', hex.value)
}

watch(
  () => props.modelValue,
  (newValue) => {
    const color = tinycolor(newValue)
    if (color.isValid()) {
      const hsv = color.toHsv()
      hue.value = hsv.h
      saturation.value = hsv.s
      brightness.value = hsv.v
      updateColor()
    }
  },
  { immediate: true },
)

function updateColorFromHex(): void {
  const color = tinycolor(hex.value)
  if (color.isValid()) {
    const hsv = color.toHsv()
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
    updateColor()
  }
}

function updateColorFromRGB(): void {
  const color = tinycolor({ r: rgb.r, g: rgb.g, b: rgb.b })
  if (color.isValid()) {
    const hsv = color.toHsv()
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
    updateColor()
  }
}

function setPresetColor(color: string): void {
  const selectedColor = tinycolor(color)
  const hsv = selectedColor.toHsv()
  hue.value = hsv.h
  saturation.value = hsv.s
  brightness.value = hsv.v
  updateColor()
}

function startSaturationDrag(): void {
  const onMouseMove = (e: MouseEvent) => {
    if (!saturationRef.value) return
    const rect = saturationRef.value.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height)
    saturation.value = x / rect.width
    brightness.value = 1 - y / rect.height
    updateColor()
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function startHueDrag(): void {
  const onMouseMove = (e: MouseEvent) => {
    if (!hueRef.value) return
    const rect = hueRef.value.getBoundingClientRect()
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
    hue.value = (x / rect.width) * 360
    updateColor()
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

onMounted(() => {
  const color = tinycolor(hex.value)
  if (color.isValid()) {
    const hsv = color.toHsv()
    hue.value = hsv.h
    saturation.value = hsv.s
    brightness.value = hsv.v
    updateColor()
  }
})
</script>

<template>
  <Popover>
    <InputWithIcon v-model="hex" @blur="updateColorFromHex" class="relative">
      <PopoverTrigger
        :style="{
            backgroundColor: hex,
          }"
        class="h-5 w-5 rounded-md"
      />
    </InputWithIcon>
    <PopoverContent>
      <div class="color-picker grid gap-3">
        <div
          ref="saturationRef"
          :style="{ backgroundColor: `hsl(${hue}, 100%, 50%)` }"
          class="saturation"
          @mousedown="startSaturationDrag"
        >
          <div
            :style="{
              left: `${saturation * 100}%`,
              top: `${(1 - brightness) * 100}%`,
              backgroundColor: hex,
            }"
            class="saturation-pointer"
          ></div>
          <div class="saturation-white"></div>
          <div class="saturation-black"></div>
        </div>
        <div ref="hueRef" class="hue" @mousedown="startHueDrag">
          <div :style="{ left: `calc(${(hue / 360) * 100}% - 7px)` }" class="hue-pointer"></div>
        </div>
        <div class="inputs">
          <Input class="text-xs hover:bg-white/5 transition-colors h-8" id="hex" v-model="hex" @focusout="updateColorFromHex"/>
          <Input class="text-xs hover:bg-white/5 transition-colors h-8" id="r" v-model.number="rgb.r" @focusout="updateColorFromRGB" />
          <Input class="text-xs hover:bg-white/5 transition-colors h-8" id="g" v-model.number="rgb.g" @focusout="updateColorFromRGB" />
          <Input class="text-xs hover:bg-white/5 transition-colors h-8" id="b" v-model.number="rgb.b" @focusout="updateColorFromRGB" />
        </div>

        <div class="presets">
          <div
            v-for="color in presetColors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="preset-color"
            @click="setPresetColor(color)"
          ></div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style lang="scss" scoped>
.color-picker {
  .saturation,
  .saturation-white,
  .saturation-black {
    position: relative;
    width: 100%;
    height: 150px;
    background: red;
    cursor: crosshair;

    .saturation-white {
      position: absolute;
      background: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
    }

    .saturation-black {
      position: absolute;
      background: linear-gradient(0deg, #000, transparent);
    }

    .saturation-pointer {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 2px solid #fff;
      z-index: 999;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .hue {
    position: relative;
    width: 100%;
    height: 10px;
    background: linear-gradient(to right, red, yellow, lime, aqua, blue, magenta, red);
    cursor: pointer;
    border-radius: 2.5px;

    .hue-pointer {
      position: absolute;
      width: 14px;
      height: 14px;
      background-color: #fff;
      border-radius: 999px;
      border: 3px solid #fff;
      cursor: pointer;
      transform: translateY(-50%);
      top: 50%;
    }
  }

  .presets {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;

    .preset-color {
      width: 22px;
      height: 22px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .inputs {
    display: grid;
    gap: 4px;
    align-items: center;
    align-content: center;
    grid-template-columns: 2fr repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
