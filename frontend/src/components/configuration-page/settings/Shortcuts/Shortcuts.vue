<script setup lang="ts">
import ShortcutsRoot from '@/components/configuration-page/settings/Shortcuts/ShortcutsRoot.vue'
import ShortcutsHeader from '@/components/configuration-page/settings/Shortcuts/ShortcutsHeader.vue'
import ShortcutsSection from '@/components/configuration-page/settings/Shortcuts/ShortcutsSection.vue'
import ShowShortcuts from '@/components/ui/ShowShortcuts.vue'

import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()
</script>

<template>
  <ShortcutsRoot>
    <ShortcutsHeader />
    <div class="flex w-full flex-col gap-4">
      <ShortcutsSection>
        <span class="text-sm">Shortcut visibility</span>
        <ShowShortcuts v-model="userStore.showShortcuts"
      /></ShortcutsSection>
      <ShortcutsSection>
        <span class="text-sm">Fullscreen mode for configuration</span></ShortcutsSection
      >
      <ShortcutsSection> <span class="text-sm">Reset overlay settings</span></ShortcutsSection>
    </div>
  </ShortcutsRoot>
</template>
