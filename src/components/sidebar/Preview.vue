<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { previewActive, previewImage } = storeToRefs(userStore)
import { ArrowDown, ArrowUp, Check } from 'lucide-vue-next'

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
  <div class="flex w-full flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <div class="inline-flex items-center justify-between">
        <span class="text-lg font-semibold">{{ $t('sidebar.preview.title') }}</span>
        <Button @click="userStore.togglePreview" size="icon" variant="outline">
          <ArrowDown v-if="!previewActive" />
          <ArrowUp v-else />
        </Button>
      </div>
      <span class="text-sm whitespace-pre-line">
        {{ $t('sidebar.preview.description') }}
      </span>
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-300"
        leave-active-class="transition duration-300"
      >
        <div v-if="previewActive" class="flex flex-wrap justify-between pt-3">
          <div
            class="group flex cursor-pointer flex-col items-start gap-3 pb-3 text-sm"
            v-for="image in images"
            @click="previewImage = image.name.toLowerCase()"
            :key="image.name"
          >
            <img
              class="pointer-events-none w-40 rounded outline-2 outline-offset-3 outline-[hsl(222deg,10%,17%)] transition-all group-hover:scale-102 group-hover:outline-white"
              :class="[previewImage === image.name.toLowerCase() ? 'outline-white' : '']"
              :src="image.src"
              :alt="image.name"
            />
            <div
              class="text-muted inline-flex items-center gap-2 font-medium transition-colors group-hover:text-white"
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
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
