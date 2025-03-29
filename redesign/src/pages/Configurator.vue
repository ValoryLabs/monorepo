<script setup lang="ts">
import Sidebar from '@/components/sidebar/Sidebar.vue'
import Content from '@/components/Content.vue'
import Header from '@/components/ui/Header.vue'
</script>

<template>
  <Header />
  <div class="flex h-[calc(100dvh-3.5rem)] w-dvw flex-row">
    <Sidebar />
    <Content />
  </div>
</template>
