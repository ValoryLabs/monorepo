<script setup lang="ts">
import { StreamersCard } from '@/components/features/home-page/Streamers/index.ts'
import { useAuthStore } from '@/stores'
import { computed } from 'vue'

const authStore = useAuthStore()

const loginLink = computed(() => {
  if (!authStore.isAuthenticated) {
    return 'signin'
  } else {
    return 'configurator'
  }
})
</script>

<template>
  <StreamersCard
    img="/twitch_avatar.webp"
    username="You?"
    text="Click on me to start!"
    :link="loginLink"
  />
</template>
