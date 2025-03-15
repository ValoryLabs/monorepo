<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import Overlay from '@/components/Overlay.vue'

const userStore = useUserStore()

const { showOverlay } = storeToRefs(userStore)
</script>

<template>
  <main
    class="relative flex flex-1 items-center justify-center before:absolute before:z-[-1] before:h-full before:w-full before:bg-[url('/preview.webp')] before:bg-cover before:bg-center before:opacity-80 before:blur-[.325rem] before:content-['']"
  >
    <div id="preview">
      <Overlay v-if="showOverlay" />
      <div v-else class="w-fit whitespace-pre-line text-center font-medium leading-[1.15]">
        {{ $t('preview') }}
      </div>
    </div>
  </main>
</template>
