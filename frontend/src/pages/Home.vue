<script setup lang="ts">
import { Paintbrush, PackageOpen, PencilRuler } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Header from '@/components/home/Header.vue'
import router from '@/router'
import Footer from '@/components/home/Footer.vue'
import { Twitch } from '@/components/icons/socials'
// import StreamersMarquee from '@/components/StreamersMarquee.vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const redirectToAuth = () => {
  window.location.href = `${import.meta.env.APP_BACKEND_URL}/api/auth/login`
}
</script>

<template>
  <main class="inline-flex h-screen w-screen items-center">
    <div class="m-auto flex w-1/2 flex-col items-center justify-center gap-6">
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
      <Button v-if="authStore.isAuthenticated" @click="router.push({ name: 'configurator' })">
        {{ $t('sidebar.buttons.auth') }}
      </Button>
      <Button v-else @click="redirectToAuth">
        {{ $t('sidebar.buttons.unauth') }}
        <Twitch color="#000" :size="15" />
      </Button>
      <Footer />
    </div>
    <!-- <StreamersMarquee /> -->
  </main>
</template>
