<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Header from '@/components/home/Header.vue'

const Footer = defineAsyncComponent(() => import('@/components/home/Footer.vue'))
</script>

<template>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</template>
