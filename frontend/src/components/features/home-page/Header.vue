<script setup lang="ts">
import { Github, Valory } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { NAV_DATA } from '@/data'
import { hidden, moveTo } from '@/lib/utils.ts'
import router from '@/router'
import { onMounted, onUnmounted, ref } from 'vue'

import { LoginOrConfigurator } from '@/components/features/home-page/index.ts'
import { LanguageSwitcher, LinkPreview } from '@/components/ui'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const isDev = import.meta.env.APP_DEV === 'true'

const showHeader = ref(true)
let lastScrollPosition = 0

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  showHeader.value = currentScrollPosition <= lastScrollPosition
  lastScrollPosition = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed right-0 left-0 z-10 flex h-16 w-full justify-center transition-all duration-700',
      showHeader ? 'top-6' : 'top-[-600px]',
    ]"
  >
    <div
      class="container flex items-center justify-between gap-48 rounded-full bg-black/30 py-1 text-sm backdrop-blur-sm"
    >
      <div class="left flex flex-row gap-8">
        <div
          class="relative inline-flex gap-2 logo cursor-pointer"
          @click="router.push({ name: 'home' })"
        >
          <Valory :size="30" />
          <span
            v-if="isDev"
            class="absolute -top-2 left-3 inline-flex text-xs px-1.5 py-0.5 h-fit font-semibold items-center justify-center rounded-full border text-white transition border-white/10 bg-neutral-900"
          >
            DEV
          </span>
        </div>
        <ul v-if="!hidden && route.name === 'home'" class="flex items-center justify-between gap-6">
          <li
            v-for="nav in NAV_DATA"
            :key="nav.name"
            @click="moveTo(`${nav.point}`)"
            class="cursor-pointer font-medium text-[#F2F2F2]/80 transition duration-150 hover:text-[#F2F2F2]"
          >
            {{ t(`nav.${nav.point}`) }}
          </li>
        </ul>
      </div>
      <div class="right flex flex-row items-center gap-1">
        <LinkPreview url="https://github.com/ValoryLabs/Valory" text="Valory">
          <Button
            class="rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100"
          >
            <Github :size="16" />
          </Button>
        </LinkPreview>
        <LanguageSwitcher variant="rounded" />
        <LoginOrConfigurator />
      </div>
    </div>
  </header>
</template>
