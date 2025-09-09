<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import {
  StreamersCard,
  StreamersCardMock,
  StreamersCardSkeleton,
} from '@/components/features/home-page/Streamers'
import { useStreamersStore } from '@/stores'

const streamersStore = useStreamersStore()
const { streamers, loading, error } = storeToRefs(streamersStore)

const isLoading = computed(() => loading.value)
const hasError = computed(() => Boolean(error.value))
const showSkeleton = computed(() => isLoading.value || hasError.value)

const safeStreamers = computed(() => {
  return streamers.value.filter(
    (streamer) => streamer && typeof streamer === 'object' && streamer.username && true
  )
})

onMounted(async () => {
  await streamersStore.fetchStreamers({ limit: 5 })
})
</script>

<template>
  <div v-if="showSkeleton" key="skeleton" class="flex flex-wrap gap-3.5 w-full">
    <StreamersCardSkeleton v-for="index in 5" :key="index" />
    <StreamersCardMock />
  </div>

  <div
    v-else-if="safeStreamers.length > 0"
    key="content"
    class="flex items-center justify-center flex-wrap gap-3.5 w-full"
  >
    <StreamersCard
      v-for="streamer in safeStreamers"
      :key="`streamer-${streamer.username}`"
      :img="streamer.img"
      :username="streamer.username"
      :followers="streamer.followers"
      :live="streamer.live"
      :verified="streamer.verified"
    />
    <StreamersCardMock />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
