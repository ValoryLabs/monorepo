<script setup lang="ts">
import LoginOrConfigurator from '@/components/home-page/LoginOrConfigurator.vue'
import Button from '@/components/ui/button/Button.vue'
import CarouselOverlay from '@/components/ui/CarouselOverlay.vue'
import { PackageOpen, Paintbrush, PencilRuler } from 'lucide-vue-next'
import Valory from '../icons/other/Valory.vue'
</script>

<template>
  <main class="container flex h-screen flex-col items-center justify-center">
    <div class="inline-flex h-[calc(100dvh-3rem)] w-full items-center">
      <div class="flex h-fit w-1/2 flex-col items-start justify-center gap-8">
        <div class="flex flex-col items-start justify-center gap-3">
          <div class="relative flex flex-row items-center gap-2">
            <Valory :size="26" />
            <Valory :size="96" class="absolute left-0 blur-[120px]" />
            <span
              class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-4 text-transparent"
            >
              VALORY
            </span>
          </div>
          <span class="text-4xl leading-tight font-bold whitespace-pre-line text-white">
            {{ $t('sidebar.header.description') }}
          </span>
        </div>
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
        <div class="inline-flex items-center justify-center gap-1">
          <LoginOrConfigurator />
          <Button variant="ghost">
            {{ $t('sidebar.buttons.learn') }}
          </Button>
        </div>
      </div>
      <div
        class="relative flex size-1/2 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl"
      >
        <img
          src="/rank_preview.webp"
          alt="Rank Preview Background"
          class="absolute inset-0 size-full object-cover object-center -z-10"
          fetchpriority="high"
          loading="eager"
        />
        <CarouselOverlay />
      </div>
    </div>
  </main>
</template>
