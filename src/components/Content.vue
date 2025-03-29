<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'
import { generateMeshGradient } from 'meshgrad'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <aside class="relative flex flex-1 items-center justify-center bg-background">
    <div id="preview" class="relative">
      <div class="relative z-10">
        <Overlay v-if="configuratorActive" />
        <div v-else class="w-fit whitespace-pre-line text-center font-medium leading-[1.15]">
          {{ $t('preview') }}
        </div>
      </div>
    </div>
    <div
      class="absolute left-1/2 top-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[300px]"
      :style="generateMeshGradient(8)"
    ></div>
    <div class="pointer-events-none absolute inset-0 bg-[url(/grid.png)] bg-cover opacity-40"></div>
  </aside>
</template>
