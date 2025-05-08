<script setup lang="ts">
import { Paintbrush, PackageOpen, PencilRuler } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Login from '@/components/ui/Login.vue'
import Header from '@/components/home/Header.vue'
import router from '@/router'
import Footer from '@/components/home/Footer.vue'
import { Twitch } from '@/components/icons/socials'
import StreamersMarquee from '@/components/StreamersMarquee.vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const redirectToAuth = () => {
  window.location.href = `${import.meta.env.APP_BACKEND_URL}/api/auth/login`
}
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
        <Button v-if="authStore.isAuthenticated" @click="router.push({ name: 'configurator' })">
          {{ $t('sidebar.buttons.auth') }}
          <PencilRuler class="size-4" />
        </Button>
        <Login v-else />
        <!-- <Button v-else @click="redirectToAuth">
          {{ $t('sidebar.buttons.unauth') }}
          <Twitch color="black" :size="16" />
        </Button> -->
      </div>
      <StreamersMarquee />
    </div>
    <Footer />
  </main>
</template>
