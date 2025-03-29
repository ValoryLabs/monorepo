<script setup lang="ts">
import Content from '@/components/Content.vue'
import Header from '@/components/ui/Header.vue'
</script>

<template>
  <Header />
  <div class="flex h-[calc(100dvh-3.5rem)] w-dvw flex-row">
    <main
      class="flex w-1/4 flex-col gap-10 overflow-scroll border-r border-white/10 bg-background p-10 transition-all"
    >
      <router-view />
    </main>
    <Content />
  </div>
</template>
