<script setup lang="ts">
import Content from '@/components/Content.vue'
import Header from '@/components/ui/Header.vue'
import { RightSidebar } from '@/components/sidebar/right/'
import { LeftSidebar } from '@/components/sidebar/left/'
import { useUserStore } from '@/stores/user'
import { useOverlayStore } from '@/stores/overlay'
import { storeToRefs } from 'pinia'
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Configurator',
})

const userStore = useUserStore()
const overlayStore = useOverlayStore()
const { showLeftSidebar, showRightSidebar } = storeToRefs(userStore)

const { F, R } = useMagicKeys()

watch(F, (v) => {
  if (v) userStore.toggleSidebar()
})

watch(R, (v) => {
  if (v) overlayStore.reset()
})
</script>

<template>
  <Header />
  <div class="flex h-[calc(100dvh-2.5rem)] w-dvw flex-row">
    <aside
      v-if="showLeftSidebar"
      class="bg-background flex w-80 flex-col overflow-scroll border-r border-white/10 p-5 transition-all"
    >
      <LeftSidebar />
    </aside>
    <Content />
    <aside
      v-if="showRightSidebar"
      class="bg-background flex w-80 flex-col overflow-scroll border-l border-white/10 p-5 transition-all"
    >
      <RightSidebar />
    </aside>
  </div>
</template>
