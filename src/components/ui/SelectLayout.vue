<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOverlayStore } from '@/stores/overlay'
const overlayStore = useOverlayStore()
const { overlayStyle } = storeToRefs(overlayStore)
import { Check } from 'lucide-vue-next'
import TiltCard from '@/components/ui/TiltCard.vue'

const images = [
  {
    name: 'Old',
    codeName: 'old',
    src: '/overlays/old.webp',
  },
  {
    name: 'New',
    codeName: 'new',
    src: '/overlays/new.webp',
  },
  {
    name: 'New v2',
    codeName: 'new_v2',
    src: '/overlays/new_v2.webp',
  },
  {
    name: 'Minimal',
    codeName: 'minimal',
    src: '/overlays/minimal.webp',
  },
]
</script>

<template>
  <div class="flex w-full flex-wrap justify-center gap-6">
    <button
      class="group flex cursor-pointer flex-col items-start gap-3 text-sm"
      v-for="image in images"
      @click="overlayStyle = image.codeName"
      :key="image.codeName"
    >
      <TiltCard
        class="rounded outline-2 outline-offset-3 outline-[hsl(222deg,10%,17%)] transition-all group-hover:scale-102 group-hover:outline-white"
        :class="[overlayStyle === image.codeName ? 'outline-white' : '']"
        ><img class="w-30" :src="image.src" :alt="image.name"
      /></TiltCard>

      <div
        class="text-muted inline-flex items-center gap-2 font-medium transition-colors group-hover:text-white"
        :class="[overlayStyle === image.codeName ? 'text-white' : '']"
      >
        <Check
          v-if="overlayStyle === image.codeName"
          class="size-5"
          :stroke-width="2.75"
          absoluteStrokeWidth
        />
        <span>{{ image.name }}</span>
      </div>
    </button>
  </div>
</template>
