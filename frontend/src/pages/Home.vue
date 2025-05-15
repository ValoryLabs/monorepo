<script setup lang="ts">
// import Features from '@/components/home/Features.vue'
import Footer from '@/components/home/Footer.vue'
import Header from '@/components/home/Header.vue'
import Hero from '@/components/home/Hero.vue'
import OpenSource from '@/components/home/OpenSource.vue'
import Streamers from '@/components/home/Streamers.vue'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.home'),
})
</script>

<template>
  <Header />
  <Hero />
  <!-- <Features /> -->
  <Streamers />
  <OpenSource />
  <Footer />
</template>
