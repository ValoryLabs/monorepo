<script setup lang="ts">
import { openLink } from '@/lib/utils.ts'
import Valory from '@/components/icons/Valory.vue'
import { Kick, Twitch, YouTube } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import Button from '@/components/ui/button/Button.vue'
import router from '@/router'

const redirectToAuth = () => {
  window.location.href = `${import.meta.env.APP_BACKEND_URL}/api/auth/login/twitch`
}
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Left side - Background image -->
    <div class="flex min-w-96 max-w-2xl w-full items-center justify-center bg-black p-8">
      <div class="w-full max-w-sm space-y-8">
        <!-- Header -->
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
          <p class="text-sm text-gray-400">{{ $t('components.login.description') }}</p>
        </div>

        <!-- Social login buttons -->
        <div class="flex w-full flex-col items-center gap-3">
          <Button variant="login" size="lg" class="w-full" @click="redirectToAuth"
            ><Twitch color="white" class="size-5" /> Twitch</Button
          >
          <Separator class="my-2 h-px w-full bg-white/10" label="OR" />
          <Button variant="login" size="lg" class="w-full" disabled="true"
            ><YouTube color="white" class="size-5" />Youtube</Button
          >
          <Button variant="login" size="lg" class="w-full" disabled="true"
            ><Kick color="white" class="size-5" />Kick</Button
          >
        </div>

        <div class="flex flex-col items-center gap-4">
          <a
            class="cursor-pointer text-xs text-neutral-400 hover:underline"
            @click="openLink('https://discord.gg/pYV4PBV5YW')"
            >{{ $t('components.login.trouble') }}</a
          >
          <Separator class="h-px w-full bg-white/10" />
          <!-- Terms and Privacy -->
          <div class="text-center text-xs">
            <span class="text-neutral-500">
              {{ $t('components.login.agree.text') }}
              <a
                @click="router.push({ name: 'terms' })"
                class="cursor-pointer text-white hover:underline"
                >{{ $t('components.login.agree.terms') }}</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Sign in form -->
    <div class="relative hidden lg:flex lg:w-5/6">
      <div class="bg-[url('/signin.webp')] absolute inset-0 bg-cover bg-center bg-no-repeat"></div>
      <span
        class="bg-background/40 absolute right-2 bottom-2 inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-sm font-medium"
        @click="openLink('https://www.artstation.com/artwork/d0eg0W')"
        >Art by Arthur Yuan</span
      >
    </div>
  </div>
</template>
