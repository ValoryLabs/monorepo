<script setup lang="ts">
import { openLink } from '@/utils.ts'
import Button from '../ui/button/Button.vue'
import { SocialLinksData } from '@/data/SocialLinks.data.ts'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
</script>

<template>
  <footer class="flex flex-col items-center gap-4 text-sm font-semibold">
    <span class="whitespace-pre-line text-center leading-5">
      {{ $t('sidebar.footer.made') }}
    </span>
    <span class="flex flex-row items-center justify-center gap-2">
      <Button
        v-for="link in SocialLinksData"
        :key="link.name"
        class="h-fit px-2"
        variant="ghost"
        @click="openLink(link.url)"
      >
        <component :is="link.icon" :size="18" />
      </Button>
      <LanguageSwitcher />
    </span>
  </footer>
</template>
