<script setup lang="ts">
import Header from '@/components/home/Header.vue'
import Footer from '@/components/home/Footer.vue'
</script>

<template>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</template>
