<script setup lang="ts">
import { Configuration } from '@/components/configuration-page/configuration'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { onMounted, ref } from 'vue'
import { Generate } from './index.ts'

import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { fullscreen, configuratorActive } = storeToRefs(userStore)

const scrollState = ref({
  canScrollUp: false,
  canScrollDown: false,
})
const scrollRef = ref<HTMLElement>()

const handleScroll = (event: Event) => {
  const element = event.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = element

  scrollState.value = {
    canScrollUp: scrollTop > 0,
    canScrollDown: scrollTop < scrollHeight - clientHeight,
  }
}

const checkInitialState = () => {
  if (scrollRef.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.value
    scrollState.value = {
      canScrollUp: scrollTop > 0,
      canScrollDown: scrollTop < scrollHeight - clientHeight,
    }
  }
}

onMounted(() => {
  setTimeout(checkInitialState, 100)
})
</script>

<template>
  <aside
    v-if="!fullscreen"
    class="border flex-shrink-0 flex w-86 flex-col p-2 transition-all bg-background"
  >
    <Tabs default-value="configuration" class="h-full">
      <TabsList>
        <TabsTrigger :disabled="!configuratorActive" value="configuration">
          {{ $t('sidebar.configuration.title') }}
        </TabsTrigger>
        <TabsTrigger :disabled="!configuratorActive" value="generate">
          {{ $t('sidebar.buttons.generate') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="configuration" class="relative h-full overflow-hidden ml-2 pr-3">
        <div
          :class="[
            'absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10 transition-opacity duration-300',
            scrollState.canScrollUp ? 'opacity-100' : 'opacity-0',
          ]"
        />

        <div
          :class="[
            'absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10 transition-opacity duration-300',
            scrollState.canScrollDown ? 'opacity-100' : 'opacity-0',
          ]"
        />
        <div
          ref="scrollRef"
          class="scrollbar-thin h-full overflow-scroll overflow-x-hidden"
          @scroll="handleScroll"
        >
          <Configuration />
        </div>
      </TabsContent>

      <TabsContent value="generate" class="ml-2">
        <Generate />
      </TabsContent>
    </Tabs>
  </aside>
</template>
