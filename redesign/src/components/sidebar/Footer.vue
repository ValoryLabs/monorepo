<script setup lang="ts">
import { openLink } from '@/utils.ts'
import Twitch from '@/components/icons/socials/Twitch.vue'
import Hearts from '@/components/icons/Hearts.vue'
import Button from '@/components/ui/button/Button.vue'
import Github from '@/components/icons/socials/Github.vue'
import Telegram from '@/components/icons/socials/Telegram.vue'
</script>

<template>
  <footer class="flex flex-col items-center gap-2 text-sm font-semibold">
    <span
      >{{ $t('sidebar.footer.powered') }}
      <span
        class="cursor-pointer transition-colors hover:text-gray-300"
        @click="openLink('https://github.com/Henrik-3/unofficial-valorant-api')"
      >
        Henrik's API
      </span>
      🥰
    </span>
    <span class="whitespace-pre-line text-center leading-5">
      {{ $t('sidebar.footer.made') }}
    </span>
    <span class="flex flex-row items-center justify-center gap-2">
      <Button
        class="h-fit px-2"
        variant="ghost"
        @click="openLink('https://www.twitch.tv/magicxcmd')"
      >
        <Twitch :size="18" />
      </Button>
      <Button
        class="h-fit px-2"
        variant="ghost"
        @click="openLink('https://github.com/haxgun/valory')"
      >
        <Github :size="18" />
      </Button>
      <Button class="h-fit px-2" variant="ghost" @click="openLink('https://t.me/magicxcmd')">
        <Telegram :size="18" />
      </Button>
      <Button
        class="h-fit px-2"
        variant="ghost"
        @click="openLink('https://www.donationalerts.com/r/haxgun')"
      >
        <Hearts color="red" :size="18" />
      </Button>
    </span>
  </footer>
</template>
