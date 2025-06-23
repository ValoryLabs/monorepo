<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Header from '@/components/home-page/Header.vue'

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
