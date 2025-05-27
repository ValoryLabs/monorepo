<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { PencilRuler } from 'lucide-vue-next'
import NumberFlow from '@number-flow/vue'

import Github from '@/components/icons/socials/Github.vue'
import Valory from '@/components/icons/Valory.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import Login from '@/components/ui/Login.vue'
import { Button } from '@/components/ui/button'
import { NAV_DATA } from '@/data/HeaderNav.data'
import router from '@/router'
import { hidden, moveTo, openLink } from '@/lib/utils'

import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const route = useRoute()

const authStore = useAuthStore()
const repoUrl = ref('https://api.github.com/repos/ValoryApp/Valory')

const { data: repoData } = useFetch(repoUrl).get().json()

const starsCount = computed(() => repoData.value?.stargazers_count ?? 0)

const showHeader = ref(true)
let lastScrollPosition = 0

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  if (currentScrollPosition > lastScrollPosition) {
    showHeader.value = false
  } else {
    showHeader.value = true
  }
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
      'sticky right-0 left-0 z-10 flex h-16 w-full justify-center transition-all duration-700',
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
        <Button
          class="rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100"
          @click="openLink('https://github.com/ValoryApp/Valory')"
        >
          <Github :size="16" />
          <NumberFlow :value="starsCount" />
        </Button>
        <LanguageSwitcher />
        <Button v-if="authStore.isAuthenticated" @click="router.push({ name: 'configurator' })">
          {{ $t('sidebar.buttons.auth') }}
          <PencilRuler class="size-4" />
        </Button>
        <Login v-else />
      </div>
    </div>
  </header>
</template>
