<script setup lang="ts">
import { LeftSidebar } from '@/components/configuration-page/sidebar/left-sidebar'
</script>

<template>
  <div class="inline-flex w-dvw h-dvh">
    <LeftSidebar />
    <main class="inline-flex w-dvw h-dvh bg-background">
      <router-view />
    </main>
  </div>
</template>
