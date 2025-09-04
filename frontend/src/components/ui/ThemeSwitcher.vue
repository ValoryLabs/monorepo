<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-vue-next'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

const getThemeLabel = () => {
  switch (themeStore.currentTheme) {
    case 'light':
      return 'Switch to dark mode'
    case 'dark':
      return 'Switch to system mode'
    case 'system':
      return 'Switch to light mode'
  }
}

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <Button
    @click="themeStore.toggleTheme"
    size="icon"
    variant="ghost"
    class="h-fit w-fit cursor-pointer p-2"
    :aria-label="getThemeLabel()"
  >
    <Transition mode="out-in">
      <SunIcon v-if="themeStore.currentTheme === 'light'" class="size-4" />
      <MoonIcon v-else-if="themeStore.currentTheme === 'dark'" class="size-4" />
      <MonitorIcon v-else class="size-4 transition-colors" />
    </Transition>
  </Button>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.5;
}
</style>
