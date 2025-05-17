<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import {Kick, Twitch, YouTube} from '@/components/icons'
import {Separator} from '@/components/ui/separator'
import {openLink} from '@/lib/utils'
import Valory from '../icons/Valory.vue'

const redirectToAuth = () => {
  window.location.href = `${import.meta.env.APP_BACKEND_URL}/api/auth/login/twitch`
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>
        {{ $t('sidebar.buttons.unauth') }}
      </Button>
    </DialogTrigger>
    <DialogContent class="flex w-[24rem] flex-col items-center py-12">
      <DialogHeader class="flex flex-col items-center gap-2">
        <div class="relative flex flex-row items-center gap-2">
          <Valory :size="26" />
          <Valory :size="96" class="absolute left-0 blur-[120px]" />
          <span
            class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-none text-transparent"
          >
            VALORY
          </span>
        </div>
        <DialogDescription class="text-base">
          {{ $t('components.login.description') }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex w-full flex-col items-center gap-2">
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
      <a class="cursor-pointer text-xs text-neutral-400 hover:underline" @click="openLink('https://discord.gg/pYV4PBV5YW')">{{
        $t('components.login.trouble')
      }}</a>
      <Separator class="h-px w-full bg-white/10" />
      <DialogFooter class="text-center text-xs">
        <span class="text-neutral-500">
          {{ $t('components.login.agree.text') }}
          <a href="#" class="text-white hover:underline">{{
            $t('components.login.agree.terms')
          }}</a>
          {{ $t('components.login.agree.and') }}
          <a href="#" class="text-white hover:underline">{{
            $t('components.login.agree.privacy')
          }}</a></span
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
