<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Valory } from '@/components/shared/icons'
import { useUserStore } from '@/stores'
import { Navigation } from './navigation'
import { ProfileMenu } from './profile-menu'

const userStore = useUserStore()
const { showLeftSidebar } = storeToRefs(userStore)

const router = useRouter()
</script>

<template>
  <aside
    :class="[
      'relative border flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out bg-background h-full',
      !showLeftSidebar ? 'w-16 opacity-100' : 'w-61 translate-x-0 opacity-100',
    ]"
  >
    <div class="flex flex-col h-full transition-opacity duration-300 opacity-100">
      <div class="flex-1 flex flex-col">
        <div class="pl-5 pt-2">
          <div
            @click="router.push('/')"
            class="relative flex cursor-pointer items-center justify-baseline gap-2 py-3"
          >
            <Valory class="size-6" />
          </div>
        </div>
        <Navigation />
      </div>
      <div class="p-2 mt-auto">
        <div class="flex flex-col gap-1">
          <ProfileMenu />
        </div>
      </div>
    </div>

    <button
      @click="() => (showLeftSidebar = !showLeftSidebar)"
      aria-label="toggle sidebar"
      :class="[
        'absolute inset-y-0 z-30 w-[4px] transition-all duration-200 hover:bg-neutral-800 sm:flex hidden',
        !showLeftSidebar ? 'right-[-4px] cursor-e-resize' : 'right-[-4px] cursor-w-resize',
      ]"
    >
      <span class="absolute -inset-x-1.5 inset-y-0 opacity-20"></span>
    </button>
  </aside>

  <!-- <button
    v-if="!showLeftSidebar"
    @click="() => (showLeftSidebar = !showLeftSidebar)"
    aria-label="open sidebar"
    class="cursor-pointer fixed left-2 top-4 z-50 p-2 bg-background border rounded-md hover:bg-neutral-900 transition-colors duration-200"
  >
    <ChevronRight class="size-4" />
  </button> -->
</template>
