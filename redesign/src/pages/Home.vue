<script setup lang="ts">
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { Paintbrush, PackageOpen, PencilRuler } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Header from '@/components/home/Header.vue'
import router from '@/router'
import Footer from '@/components/home/Footer.vue'
import StreamersMarquee from '@/components/StreamersMarquee.vue'
</script>

<template>
  <main class="inline-flex h-screen w-screen items-center">
    <div class="m-auto flex w-11/12 flex-col items-center justify-center gap-6">
      <Header />
      <ul class="flex flex-col items-start gap-3">
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
      <div class="flex flex-row gap-2">
        <LanguageSwitcher />
        <Button @click="router.push('/configurator')">
          {{ $t('sidebar.buttons.start') }}
        </Button>
      </div>
      <Footer />
    </div>
    <StreamersMarquee />
  </main>
</template>
