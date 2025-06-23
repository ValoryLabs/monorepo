<script setup lang="ts">
import { StreamersCard } from "@/components/home-page/Streamers";
import { computed } from "vue";
import { useAuthStore } from "@/stores";

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
