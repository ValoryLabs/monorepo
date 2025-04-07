<script setup lang="ts">
import { openLink } from '@/lib/utils'
import Button from '@/components/ui/button/Button.vue'
import { SocialLinksData } from '@/data/SocialLinks.data.ts'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
</script>

<template>
  <footer class="flex flex-col items-center gap-4 text-sm font-semibold">
    <span class="text-center leading-5 whitespace-pre-line">
      {{ $t('sidebar.footer.made') }}
    </span>
    <span class="flex flex-row items-center justify-center gap-2">
      <Button
        v-for="link in SocialLinksData"
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
