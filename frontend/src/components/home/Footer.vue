<script setup lang="ts">
import { openLink } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'
import { SocialLinksData } from '@/data/SocialLinks.data.ts'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
</script>

<template>
  <footer class="inline-flex h-12 w-full items-center justify-between gap-4 text-sm font-semibold">
    <span class="inline-flex gap-4 text-center leading-5 whitespace-pre-line">
      <span>{{ $t('sidebar.footer.made') }}</span>
      <span>{{ $t('sidebar.footer.rights') }}</span>
    </span>
    <span class="flex flex-row items-center justify-center gap-2">
      <Button
        v-for="link in SocialLinksData"
        :aria-label="link.name"
        :key="link.name"
        size="icon"
        variant="ghost"
        @click="openLink(link.url)"
      >
        <component :is="link.icon" />
      </Button>
      <LanguageSwitcher />
    </span>
  </footer>
</template>
