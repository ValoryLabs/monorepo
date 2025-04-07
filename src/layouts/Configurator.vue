<script setup lang="ts">
import Content from '@/components/Content.vue'
import Header from '@/components/ui/Header.vue'
</script>

<template>
  <Header />
  <div class="flex h-[calc(100dvh-3.5rem)] w-dvw flex-row">
    <main
      class="bg-background flex w-1/4 flex-col justify-start gap-10 overflow-scroll border-r border-white/10 p-10 transition-all"
    >
      <router-view v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>
    <Content />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
