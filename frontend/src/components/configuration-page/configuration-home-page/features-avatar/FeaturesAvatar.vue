<script setup lang="ts">
import { cn } from '@/lib/utils.ts'
import router from '@/router'

const props = defineProps<{
  icon: any
  color?: string
  link?: string
  disabled?: boolean
}>()
</script>

<template>
  <div
    @click="props.disabled ? None : router.push({ name: props.link })"
    class="flex size-12 cursor-pointer items-center justify-center rounded-full hover:z-10 hover:scale-105 hover:-translate-y-0.5 transition-all"
    style="opacity: 1; margin-right: -17px; will-change: transform, opacity; transform: none"
  >
    <div class="bg-background flex size-full items-center justify-center rounded-full p-0.5">
      <div
        class="bg-background border-white/10 flex size-full items-center justify-center rounded-full border-[1.5px]"
      >
        <div class="absolute size-full [backface-visibility:hidden]">
          <div class="relative flex size-full items-center justify-center text-xl">
            <component
              v-if="props.icon"
              :is="props.icon"
              :class="cn('rounded-sm size-4 icon')"
              :style="{ color: props.disabled ? '#fff' : props.color }"
              :color="props.color"
            />
            <component
              v-if="props.icon"
              :is="props.icon"
              :class="cn('absolute rounded-sm size-4 icon blur-sm')"
              :style="{ color: props.disabled ? '#fff' : props.color }"
              :color="props.color"
            />
            <div v-else class="rounded-sm bg-[#323330]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
