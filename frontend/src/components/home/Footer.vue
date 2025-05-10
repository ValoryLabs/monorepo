<script setup lang="ts">
import Discord from '@/components/icons/socials/Discord.vue'
import Github from '@/components/icons/socials/Github.vue'
import Telegram from '@/components/icons/socials/Telegram.vue'
import Twitch from '@/components/icons/socials/Twitch.vue'
import Valory from '@/components/icons/Valory.vue'
import { Button } from '@/components/ui/button'
import { FOOTER_NAV_PRODUCT_DATA } from '@/data/FooterNav.data'
import { hidden, moveTo, openLink } from '@/lib/utils'
</script>
<template>
  <footer class="container m-auto mt-10 flex flex-col gap-10 py-16">
    <div class="flex justify-between gap-8">
      <div class="flex flex-col gap-4" :class="[hidden ? 'max-w-52' : '']">
        <div @click="moveTo('main')" class="flex flex-row items-center gap-3">
          <Valory :size="25" />
          <span class="font-valory cursor-pointer text-lg transition-colors hover:text-gray-300"
            >VALORY</span
          >
        </div>
        <span class="text-sm font-normal whitespace-pre-line">
          {{ $t('footer.left.description') }}
        </span>
        <span class="text-xs text-[#7D7D7D]">
          © 2023-2025 Valory. {{ $t('footer.copyright') }}
        </span>
        <div class="flex flex-wrap gap-2">
          <Button
            aria-label="Github"
            @click="openLink('https://github.com/ValoryApp/Valory')"
            variant="ghost"
            class="h-fit w-fit cursor-pointer p-2"
          >
            <Github :size="20" />
          </Button>
          <Button
            aria-label="Twitch"
            @click="openLink('https://twitch.tv/MAGICXcmd')"
            variant="ghost"
            class="h-fit w-fit cursor-pointer p-2"
          >
            <Twitch :size="20" />
          </Button>
          <Button
            aria-label="Discord"
            @click="openLink('https://discord.gg/valory')"
            variant="ghost"
            class="h-fit w-fit cursor-pointer p-2"
          >
            <Discord :size="20" />
          </Button>
          <Button
            aria-label="Telegram"
            @click="openLink('https://t.me/magicxcmd')"
            variant="ghost"
            class="h-fit w-fit cursor-pointer p-2"
          >
            <Telegram :size="20" />
          </Button>
          <Button
            aria-label="Donate"
            @click="openLink('https://www.donationalerts.com/r/haxgun')"
            variant="ghost"
            class="h-fit w-fit cursor-pointer p-2"
          >
            <Hearts color="#FA4454" :size="20" />
          </Button>
        </div>
        <iframe
          src="https://status.valory.su/badge?theme=dark"
          width="250"
          height="30"
          frameborder="0"
          scrolling="no"
          style="color-scheme: normal"
        ></iframe>
      </div>
      <div
        class="flex"
        :class="[hidden ? 'flex-col justify-start gap-8' : 'flex-row justify-end gap-32']"
      >
        <div v-for="nav in FOOTER_NAV_PRODUCT_DATA" :key="nav.title" class="flex flex-col gap-2">
          <span class="text-base font-bold">
            {{ $t(`footer.right.sections.${nav.id === 1 ? 'first' : 'second'}.title`) }}
          </span>
          <div class="flex flex-col gap-2">
            <RouterLink
              v-for="item in nav.items"
              :key="item.name"
              :to="item.url"
              class="text-base font-normal text-[#A9A9A9] transition duration-150 hover:text-[#F2F2F2]"
            >
              {{
                $t(`footer.right.sections.${nav.id === 1 ? 'first' : 'second'}.items.${item.name}`)
              }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
