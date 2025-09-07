<script setup lang="ts">
import TiltCard from '@/components/ui/TiltCard.vue'
import { useUserStore } from '@/stores/user.ts'
import { Ban, Check } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { previewImage } = storeToRefs(userStore)

const images = [
  {
    name: 'None',
    src: '',
  },
  {
    name: 'Abyss',
    src: '/valorant/settings/preview_thumbnails/abyss.webp',
  },
  {
    name: 'Ascent',
    src: '/valorant/settings/preview_thumbnails/ascent.webp',
  },
  {
    name: 'Bind',
    src: '/valorant/settings/preview_thumbnails/bind.webp',
  },
  {
    name: 'Breeze',
    src: '/valorant/settings/preview_thumbnails/breeze.webp',
  },
  {
    name: 'Corrode',
    src: '/valorant/settings/preview_thumbnails/corrode.webp',
  },
  {
    name: 'Fracture',
    src: '/valorant/settings/preview_thumbnails/fracture.webp',
  },
  {
    name: 'Haven',
    src: '/valorant/settings/preview_thumbnails/haven.webp',
  },
  {
    name: 'Icebox',
    src: '/valorant/settings/preview_thumbnails/icebox.webp',
  },
  {
    name: 'Lotus',
    src: '/valorant/settings/preview_thumbnails/lotus.webp',
  },
  {
    name: 'Pearl',
    src: '/valorant/settings/preview_thumbnails/pearl.webp',
  },
  {
    name: 'Split',
    src: '/valorant/settings/preview_thumbnails/split.webp',
  },
  {
    name: 'Sunset',
    src: '/valorant/settings/preview_thumbnails/sunset.webp',
  },
]
</script>

<template>
  <div class="flex w-full flex-wrap justify-start gap-6">
    <button
      class="group flex cursor-pointer flex-col items-start gap-3 text-sm"
      v-for="image in images"
      @click="previewImage = image.name.toLowerCase()"
      :key="image.name"
    >
      <TiltCard
        class="outline-second rounded outline-2 outline-offset-3 transition-all group-hover:scale-102 group-hover:outline-white"
        :class="[previewImage === image.name.toLowerCase() ? 'outline-white' : '']"
      >
        <img
          v-if="image.name !== 'None'"
          class="pointer-events-none h-18 w-30"
          :src="image.src"
          :alt="image.name"
        />
        <span
          v-else
          class="bg-background pointer-events-none flex h-18 w-30 items-center justify-center rounded"
        >
          <Ban class="text-second size-8 group-hover:text-white" />
        </span>
      </TiltCard>

      <span
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
      </span>
    </button>
  </div>
</template>
