<script setup lang="ts">
import TiltCard from '@/components/ui/TiltCard.vue'
import { useValorantOverlayStore } from '@/stores/valorantOverlay'
import { Check } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const valorantOverlayStore = useValorantOverlayStore()
const { overlayStyle } = storeToRefs(valorantOverlayStore)

const images = [
  {
    codeName: 'old',
    src: '/valorant/overlay_previews/old.webp',
  },
  {
    codeName: 'new',
    src: '/valorant/overlay_previews/new.webp',
  },
  {
    codeName: 'new_v2',
    src: '/valorant/overlay_previews/new_v2.webp',
  },
  {
    codeName: 'minimal',
    src: '/valorant/overlay_previews/minimal.webp',
  },
]
</script>

<template>
  <div class="flex w-full flex-wrap justify-between gap-4 px-2">
    <button
      class="group flex cursor-pointer flex-col items-start gap-3 text-sm"
      v-for="image in images"
      @click="overlayStyle = image.codeName"
      :key="image.codeName"
    >
      <TiltCard
        class="outline-second rounded outline-2 outline-offset-3 transition-all group-hover:scale-102 group-hover:outline-white"
        :class="[overlayStyle === image.codeName ? 'outline-white' : '']"
      >
        <img class="pointer-events-none w-30" :src="image.src" :alt="image.codeName" />
      </TiltCard>

      <div
        class="text-second inline-flex items-center gap-2 font-medium transition-colors group-hover:text-white"
        :class="[overlayStyle === image.codeName ? 'text-white' : '']"
      >
        <Check
          v-if="overlayStyle === image.codeName"
          class="size-5"
          :stroke-width="2.75"
          absoluteStrokeWidth
        />
        <span>{{ t(`components.selectLayout.${image.codeName}`) }}</span>
      </div>
    </button>
  </div>
</template>
