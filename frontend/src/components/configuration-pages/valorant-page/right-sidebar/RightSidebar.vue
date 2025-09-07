<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { Generate } from '.'
import { Configuration } from './configuration'

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
    :class="[
      'relative border flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out bg-background h-full',
      fullscreen ? 'w-0 translate-x-full opacity-100' : 'w-86 translate-x-0 opacity-100',
    ]"
  >
    <div
      class="flex flex-col h-full p-2 gap-1 transition-opacity duration-300"
      :class="[fullscreen ? 'opacity-0 pointer-events-none' : 'opacity-100']"
    >
      <Tabs v-if="!fullscreen" default-value="configuration" class="h-full">
        <TabsList>
          <TabsTrigger value="configuration">
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
    </div>

    <button
      @click="userStore.toggleFullscreen"
      aria-label="toggle sidebar"
      :class="[
        'absolute inset-y-0 z-30 w-[4px] transition-all duration-200 hover:bg-neutral-800 sm:flex hidden',
        fullscreen ? 'left-[-4px] cursor-w-resize' : 'left-[-4px] cursor-e-resize',
      ]"
    >
      <span class="absolute inset-x-1.5 inset-y-0 opacity-20"></span>
    </button>
  </aside>

  <!-- Кнопка для открытия скрытого правого sidebar -->
  <button
    v-if="fullscreen"
    @click="userStore.toggleFullscreen"
    aria-label="open sidebar"
    class="cursor-pointer fixed right-2 top-4 z-50 p-2 bg-background border rounded-md hover:bg-neutral-900 transition-colors duration-200"
  >
    <ChevronLeft class="size-4" />
  </button>
</template>
