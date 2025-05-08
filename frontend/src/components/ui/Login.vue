<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Button from '@/components/ui/button/Button.vue'
import { Twitch, YouTube, Kick } from '@/components/icons/socials'
import { Separator } from 'reka-ui'
import { openLink } from '@/lib/utils'

const redirectToAuth = () => {
  window.location.href = `${import.meta.env.APP_BACKEND_URL}/api/auth/login`
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button>
        {{ $t('sidebar.buttons.unauth') }}
      </Button>
    </DialogTrigger>
    <DialogContent class="flex w-[24rem] flex-col items-center">
      <DialogHeader class="flex flex-col items-center gap-2">
        <DialogTitle class="text-2xl font-bold">Sign in</DialogTitle>
        <DialogDescription class="text-base">
          Sign in or create an account to continue
        </DialogDescription>
      </DialogHeader>
      <div class="flex w-full flex-col items-center gap-2">
        <Button variant="login" size="lg" class="w-full" @click="redirectToAuth"
          ><Twitch color="white" class="size-5" /> Continue with Twitch</Button
        >
        <Button variant="login" size="lg" class="w-full" disabled="true"
          ><YouTube color="white" class="size-5" />Continue with Youtube</Button
        >
        <Button variant="login" size="lg" class="w-full" disabled="true"
          ><Kick color="white" class="size-5" />Continue with Kick</Button
        >
      </div>
      <a class="cursor-pointer text-xs text-neutral-400 hover:underline" @click="openLink('')"
        >Trouble signing in?</a
      >
      <Separator class="h-px w-full bg-white/10" />
      <DialogFooter class="text-center text-xs">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
