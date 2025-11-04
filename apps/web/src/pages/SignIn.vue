<script setup lang="ts">
import { KickFull, TwitchFull, Valory, YouTubeFull } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { openLink } from '@/lib/utils.ts'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const redirectToAuth = () => {
  window.location.href = `https://${import.meta.env.APP_BACKEND}/api/auth/login/twitch`
}
</script>

<template>
  <div class="flex min-h-screen">
    <div
      class="flex min-w-96 max-w-2xl w-full items-center overflow-hidden justify-center bg-black p-8"
    >
      <div class="w-full max-w-80 space-y-8">
        <div class="flex flex-col items-center gap-3">
          <div class="relative flex flex-row items-center gap-2">
            <Valory :size="26" />
            <Valory :size="96" class="absolute left-0 blur-[120px]" />
            <span
              class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-none text-transparent"
            >
              VALORY
            </span>
          </div>
          <p class="text-sm text-neutral-400">{{ t('components.login.description') }}</p>
        </div>

        <div class="flex w-full flex-col items-center gap-3">
          <Button variant="login" size="lg" class="w-full justify-center" @click="redirectToAuth">
            <TwitchFull color="white" class="size-14" />
          </Button>
          <Separator class="my-2 h-px w-full bg-white/10" label="OR" />
          <Button variant="login" size="lg" class="w-full justify-center" disabled="true">
            <YouTubeFull color="white" class="size-14" />
          </Button>
          <Button variant="login" size="lg" class="w-full justify-center" disabled="true">
            <KickFull color="white" class="size-14" />
          </Button>
        </div>

        <div class="flex flex-col items-center gap-4">
          <a
            class="cursor-pointer text-xs text-neutral-400 hover:underline"
            @click="openLink('https://discord.gg/pYV4PBV5YW')"
          >
            {{ t('components.login.trouble') }}
          </a>
          <Separator class="h-px w-full bg-white/10" />
          <div class="text-center text-xs">
            <span class="text-neutral-500">
              {{ t('components.login.agree.text') }}
              <a
                @click="router.push({ name: 'terms' })"
                class="cursor-pointer text-white hover:underline"
              >
                {{ t('components.login.agree.terms') }}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="relative hidden lg:flex lg:w-5/6">
      <div class="bg-[url('/auth/signin.webp')] absolute inset-0 bg-cover bg-center bg-no-repeat" />
      <a
        href="https://www.artstation.com/artwork/d0eg0W"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-background/40 absolute right-2 bottom-2 inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-sm font-medium"
      >
        Art by Arthur Yuan
      </a>
    </div>
  </div>
</template>
