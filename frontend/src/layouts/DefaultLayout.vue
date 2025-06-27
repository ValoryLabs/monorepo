<script setup lang="ts">
import Header from '@/components/home-page/Header.vue'
import { moveTo } from '@/lib/utils'
import { ChevronUp } from 'lucide-vue-next'
import { defineAsyncComponent } from 'vue'

const Footer = defineAsyncComponent(() => import('@/components/home-page/Footer.vue'))
</script>

<template>
  <div class="default-layout" id="top">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <div
      @click="moveTo('top')"
      class="cursor-pointer fixed right-4 bottom-4 z-50 p-2 bg-background border rounded-md hover:bg-neutral-900 transition-colors duration-200"
    >
      <ChevronUp class="size-4" />
    </div>
  </div>
</template>
