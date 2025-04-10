<script setup lang="ts">
import Content from '@/components/Content.vue'
import Header from '@/components/ui/Header.vue'
import { RightSidebar } from '@/components/sidebar/right/'
import { LeftSidebar } from '@/components/sidebar/left/'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { showLeftSidebar, showRightSidebar } = storeToRefs(userStore)
</script>

<template>
  <Header />
  <div class="flex h-[calc(100dvh-2.5rem)] w-dvw flex-row">
    <aside
      v-if="showLeftSidebar"
      class="bg-background flex w-1/6 flex-col overflow-scroll border-r border-white/10 p-5 transition-all"
    >
      <LeftSidebar />
    </aside>
    <Content />
    <aside
      v-if="showRightSidebar"
      class="bg-background flex w-1/6 flex-col overflow-scroll border-l border-white/10 p-5 transition-all"
    >
      <RightSidebar />
    </aside>
  </div>
</template>
