<script setup lang="ts">
import { openLink } from "@/utils.ts";
import Twitch from "@/components/icons/socials/Twitch.vue";
import Hearts from "@/components/icons/Hearts.vue";
import Button from "../ui/button/Button.vue";
import Github from "@/components/icons/socials/Github.vue";
import Telegram from "@/components/icons/socials/Telegram.vue";
</script>

<template>
  <footer class="flex flex-col gap-2 items-center font-semibold text-sm">
    <span>{{ $t('sidebar.footer.powered') }}
      <span class="cursor-pointer hover:text-gray-300 transition-colors" @click="openLink('https://github.com/Henrik-3/unofficial-valorant-api')">
        Henrik's API
      </span> 🥰
    </span>
    <span class="text-center leading-5 whitespace-pre-line">
      {{ $t('sidebar.footer.made') }}
    </span>
    <span class="flex flex-row items-center justify-center gap-2">
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://www.twitch.tv/magicxcmd')">
        <Twitch :size="18"/>
      </Button>
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://github.com/haxgun/valory')">
        <Github :size="18"/>
      </Button>
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://t.me/magicxcmd')">
        <Telegram :size="18"/>
      </Button>
      <Button class="px-2 h-fit" variant="ghost" @click="openLink('https://www.donationalerts.com/r/haxgun')">
        <Hearts color="red" :size="18"/>
      </Button>
    </span>
  </footer>
</template>