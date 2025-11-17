<script setup lang="ts">
import { BetaModal } from '@/components/features/configuration-page'
import { LeftSidebar } from '@/components/features/configuration-page/left-sidebar'
import { SettingsModal } from '@/components/features/configuration-page/settings'
</script>

<template>
  <BetaModal />
  <SettingsModal />
  <div class="inline-flex w-dvw h-dvh overflow-x-hidden">
    <LeftSidebar />
    <main class="inline-flex w-dvw h-dvh bg-background overflow-hidden">
      <router-view />
    </main>
  </div>
</template>
