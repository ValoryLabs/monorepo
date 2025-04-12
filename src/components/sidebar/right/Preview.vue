<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { previewImage } = storeToRefs(userStore)
import { Check } from 'lucide-vue-next'
import TiltCard from '@/components/ui/TiltCard.vue'

const images = [
  {
    name: 'Ascent',
    src: '/thumbnails/ascent.webp',
  },
  {
    name: 'Bind',
    src: '/thumbnails/bind.webp',
  },
  {
    name: 'Breeze',
    src: '/thumbnails/breeze.webp',
  },
  {
    name: 'Fracture',
    src: '/thumbnails/fracture.webp',
  },
  {
    name: 'Haven',
    src: '/thumbnails/haven.webp',
  },
  {
    name: 'Icebox',
    src: '/thumbnails/icebox.webp',
  },
  {
    name: 'Lotus',
    src: '/thumbnails/lotus.webp',
  },
  {
    name: 'Pearl',
    src: '/thumbnails/pearl.webp',
  },
  {
    name: 'Split',
    src: '/thumbnails/split.webp',
  },
  {
    name: 'Sunset',
    src: '/thumbnails/sunset.webp',
  },
]
</script>

<template>
  <div class="flex w-full flex-wrap justify-center gap-6">
    <button
      class="group flex cursor-pointer flex-col items-start gap-3 text-sm"
      v-for="image in images"
      @click="previewImage = image.name.toLowerCase()"
      :key="image.name"
    >
      <TiltCard
        class="outline-second rounded outline-2 outline-offset-3 transition-all group-hover:scale-102 group-hover:outline-white"
        :class="[previewImage === image.name.toLowerCase() ? 'outline-white' : '']"
        ><img class="w-30" :src="image.src" :alt="image.name"
      /></TiltCard>

      <div
        class="text-second inline-flex items-center gap-2 font-medium transition-colors group-hover:text-white"
        :class="[previewImage === image.name.toLowerCase() ? 'text-white' : '']"
      >
        <Check
          v-if="previewImage === image.name.toLowerCase()"
          class="size-5"
          :stroke-width="2.75"
          absoluteStrokeWidth
        />
        <span>{{ image.name }}</span>
      </div>
    </button>
  </div>
</template>
