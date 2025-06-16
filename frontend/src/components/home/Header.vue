<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import NumberFlow from '@number-flow/vue'
import { Github, Valory } from '@/components/icons'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { Button } from '@/components/ui/button'
import { NAV_DATA } from '@/data'
import router from '@/router'
import { hidden, moveTo } from '@/lib/utils'

import { useRoute } from 'vue-router'
import LoginOrConfigurator from '@/components/home/LoginOrConfigurator.vue'
import LinkPreview from '@/components/ui/LinkPreview.vue'
import { useGitHubStars } from '@/composables'

const route = useRoute()

const { starsCount, loading, error } = useGitHubStars()

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
        <div class="logo cursor-pointer" @click="router.push({ name: 'home' })">
          <Valory :size="30" />
        </div>
        <ul v-if="!hidden && route.name === 'home'" class="flex items-center justify-between gap-6">
          <li
            v-for="nav in NAV_DATA"
            :key="nav.name"
            @click="moveTo(`${nav.point}`)"
            class="cursor-pointer font-medium text-[#F2F2F2]/80 transition duration-150 hover:text-[#F2F2F2]"
          >
            {{ $t(`nav.${nav.point}`) }}
          </li>
        </ul>
      </div>
      <div class="right flex flex-row items-center gap-1">
        <LinkPreview url="https://github.com/ValoryLabs/Valory" text="Valory">
          <Button
            class="rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100"
          >
            <Github :size="16" />
            <NumberFlow :value="loading ? 0 : starsCount" />
          </Button>
        </LinkPreview>
        <LanguageSwitcher variant="rounded" />
        <LoginOrConfigurator />
      </div>
    </div>
  </header>
</template>
