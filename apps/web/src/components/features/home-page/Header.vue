<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import router from '@/router'
import { NAV_DATA } from '@/data'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher, LinkPreview } from '@/components/ui'
import { LoginOrConfigurator } from '@/components/features/home-page/index.ts'
import { Github, Valory } from '@/components/shared/icons'
import { hidden, moveTo } from '@/lib/utils.ts'

const { t } = useI18n()
const route = useRoute()

const isDev = import.meta.env.APP_DEV === 'true'
</script>

<template>
  <header class="fixed z-100 flex h-16 w-full justify-center transition-all duration-700">
    <div class="w-full bg-black/30 backdrop-blur-sm">
      <div class="container h-16 flex items-center justify-between text-sm">
        <div class="left flex flex-row gap-8">
          <div
            class="relative inline-flex gap-2 logo cursor-pointer"
            @click="router.push({ name: 'home' })"
          >
            <div @click="moveTo('main')" class="flex flex-row items-center gap-2">
              <Valory :size="30" />
              <span class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-none text-transparent">
                VALORY
              </span>
            </div>
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
        <div class="right flex flex-row items-center gap-2">
          <LinkPreview v-if="!hidden" url="https://github.com/ValoryLabs/Valory" text="Valory">
            <Button
              class="rounded-full border border-transparent bg-transparent text-white opacity-50 transition hover:border-white/10 hover:bg-white/10 hover:opacity-100"
              size="icon"
            >
              <Github :size="16" />
            </Button>
          </LinkPreview>
          <LanguageSwitcher v-if="!hidden" variant="rounded" />
          <LoginOrConfigurator />
        </div>
      </div>
    </div>

  </header>
</template>
