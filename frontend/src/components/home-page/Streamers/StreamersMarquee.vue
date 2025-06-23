<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { StreamersCard, StreamersCardMock} from '@/components/home-page/Streamers'
import { useStreamersStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { Skeleton } from '@/components/ui/skeleton'

const streamersStore = useStreamersStore()
const { streamers, loading, error } = storeToRefs(streamersStore)

const isLoading = computed(() => loading.value)
const hasError = computed(() => Boolean(error.value))
const showSkeleton = computed(() => isLoading.value || hasError.value)

const safeStreamers = computed(() => {
  return streamers.value.filter(streamer =>
    streamer &&
    typeof streamer === 'object' &&
    streamer.username &&
    typeof streamer.username === 'string'
  )
})

onMounted(async () => {
  await streamersStore.fetchStreamers()
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="showSkeleton" key="skeleton" class="flex flex-wrap gap-4 w-fit max-w-[500px]">
      <figure
        v-for="index in 5"
        :key="index"
        class="relative w-60 overflow-hidden rounded-xl border border-transparent bg-[#0F0F0F] p-4 transition-colors duration-200 cursor-pointer hover:border-white/10 hover:bg-white/10"
      >
        <div class="flex flex-row items-center gap-3">
          <div class="h-fit">
            <Skeleton class="rounded-full size-[32px] border" />
          </div>
          <div class="flex flex-col gap-1">
            <Skeleton class="line-clamp-1 h-[17px] w-20 rounded-md border" />
            <Skeleton class="line-clamp-1 h-[15px] w-24 rounded-md border" />
          </div>
        </div>
      </figure>
      <StreamersCardMock/>
    </div>

    <div
      v-else-if="safeStreamers.length > 0"
      key="content"
      class="flex flex-wrap gap-4 w-fit max-w-[500px]"
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
      <StreamersCardMock/>
    </div>
  </Transition>
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
