<script setup lang="ts">
import { ShowShortcuts } from '@/components/ui'
import { useUserStore } from '@/stores/user.ts'
import { ShortcutsHeader, ShortcutsRoot, ShortcutsSection } from '.'

const userStore = useUserStore()
</script>

<template>
  <ShortcutsRoot>
    <ShortcutsHeader />
    <div class="flex w-full flex-col gap-4">
      <ShortcutsSection>
        <span class="text-sm">Shortcut visibility</span>
        <ShowShortcuts v-model="userStore.showShortcuts" />
      </ShortcutsSection>
      <ShortcutsSection>
        <span class="text-sm">Fullscreen mode for configuration</span>
      </ShortcutsSection>
      <ShortcutsSection>
        <span class="text-sm">Reset overlay settings</span>
      </ShortcutsSection>
    </div>
  </ShortcutsRoot>
</template>
