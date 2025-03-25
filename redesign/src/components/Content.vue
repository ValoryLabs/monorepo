<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'

const userStore = useUserStore()

const { showOverlay } = storeToRefs(userStore)
</script>

<template>
  <main class="relative flex flex-1 items-center justify-center bg-[#010101]">
    <div id="preview" class="relative">
      <Overlay v-if="showOverlay" class="relative z-10" />
      <div v-else class="w-fit whitespace-pre-line text-center font-medium leading-[1.15]">
        {{ $t('preview') }}
      </div>
      <div
        class="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FA4454] opacity-10 blur-[350px]"
      ></div>
    </div>
    <div class="pointer-events-none absolute inset-0 bg-[url(/grid.png)] bg-cover opacity-40"></div>
  </main>
</template>
