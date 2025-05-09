<script setup lang="ts">
import { Paintbrush, PackageOpen, PencilRuler } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Login from '@/components/ui/Login.vue'
import Header from '@/components/home/Header.vue'
import router from '@/router'
import Footer from '@/components/home/Footer.vue'
import CarouselOverlay from '@/components/ui/CarouselOverlay.vue'
// import StreamersMarquee from '@/components/StreamersMarquee.vue'

import { useAuthStore } from '@/stores/auth'
import MiniOverlay from '@/components/overlays/MiniOverlay.vue'
import NewOverlay from '@/components/overlays/NewOverlay.vue'
import NewV2Overlay from '@/components/overlays/NewV2Overlay.vue'
import OldOverlay from '@/components/overlays/OldOverlay.vue'

const authStore = useAuthStore()

const slides = [MiniOverlay, NewOverlay, NewV2Overlay, OldOverlay]
</script>

<template>
  <main class="container flex h-screen flex-col items-center justify-center">
    <div class="inline-flex h-[calc(100dvh-3rem)] w-full items-center">
      <div class="flex h-fit w-1/2 flex-col items-start justify-center gap-8">
        <Header />
        <ul class="flex flex-col items-start gap-4 text-base font-medium">
          <li class="flex flex-row items-center justify-center gap-3 leading-5">
            <Paintbrush class="size-6" />
            <span class="whitespace-pre-line">
              {{ $t('sidebar.features.first') }}
            </span>
          </li>
          <li class="flex flex-row items-center justify-center gap-3 leading-5">
            <PackageOpen class="size-6" />
            <span class="whitespace-pre-line">
              {{ $t('sidebar.features.second') }}
            </span>
          </li>
          <li class="flex flex-row items-center justify-center gap-3 leading-5">
            <PencilRuler class="size-6" />
            <span class="whitespace-pre-line">
              {{ $t('sidebar.features.third') }}
            </span>
          </li>
        </ul>
        <div class="inline-flex items-center justify-center gap-3">
          <Button v-if="authStore.isAuthenticated" @click="router.push({ name: 'configurator' })">
            {{ $t('sidebar.buttons.auth') }}
            <PencilRuler class="size-4" />
          </Button>
          <Login v-else />
          <Button variant="ghost">
            {{ $t('sidebar.buttons.learn') }}
          </Button>
        </div>
      </div>
      <div
        class="relative flex h-full w-1/2 flex-col items-center justify-center gap-3 overflow-hidden"
      >
        <CarouselOverlay :slides="slides" />
      </div>
      <!-- <StreamersMarquee /> -->
    </div>
    <Footer />
  </main>
</template>
