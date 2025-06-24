<script setup lang="ts">
import Header from '@/components/home-page/Header.vue'
import { defineAsyncComponent } from 'vue'

const Footer = defineAsyncComponent(() => import('@/components/home-page/Footer.vue'))
</script>

<template>
  <div class="default-layout">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>
