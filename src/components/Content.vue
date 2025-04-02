<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'
import { generateMeshGradient } from 'meshgrad'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
} from "@/components/ui/PatternBackground/index";

import PatternBackground from "@/components/ui/PatternBackground/PatternBackground.vue";
</script>

<template>
  <aside class="relative flex flex-1 items-center justify-center bg-background">
    <PatternBackground
      :animate="true"
      :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
      :variant="PATTERN_BACKGROUND_VARIANT.Dot"
      class="flex h-full w-full items-center justify-center"
      :speed="PATTERN_BACKGROUND_SPEED.Slow"
    >
      <div id="preview" class="relative z-20">
        <div class="relative z-10">
          <Overlay v-if="configuratorActive" />
          <div v-else class="w-fit whitespace-pre-line text-center font-medium leading-[1.15]">
            {{ $t('preview') }}
          </div>
        </div>
        <div
          class="absolute left-1/2 top-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[300px]"
          :style="generateMeshGradient(8)"
        ></div>
      </div>
    </PatternBackground>
  </aside>
</template>