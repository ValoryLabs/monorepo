<script setup lang="ts">
import { LeftSidebar } from '@/components/features/configuration-page/left-sidebar'
import { SettingsModal } from '@/components/features/configuration-page/settings'
</script>

<template>
  <SettingsModal />
  <div class="inline-flex w-dvw h-dvh overflow-x-hidden">
    <LeftSidebar />
    <main class="inline-flex w-dvw h-dvh bg-background overflow-hidden">
      <router-view />
    </main>
  </div>
</template>
