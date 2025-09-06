<script setup lang="ts">
import { Header } from '@/components/home-page'
import { moveTo } from '@/lib/utils'
import { ChevronUp } from 'lucide-vue-next'
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

const Footer = defineAsyncComponent(() => import('@/components/home-page/Footer.vue'))

const showScrollButton = ref(false)

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="default-layout" id="top">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <Transition name="scroll-button">
      <div
        v-if="showScrollButton"
        @click="moveTo('top')"
        class="cursor-pointer fixed right-4 bottom-4 z-50 p-2 bg-background border rounded-md hover:bg-neutral-900 transition-colors duration-200"
      >
        <ChevronUp class="size-4" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scroll-button-enter-active,
.scroll-button-leave-active {
  transition: all 0.3s ease;
}

.scroll-button-enter-from,
.scroll-button-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
