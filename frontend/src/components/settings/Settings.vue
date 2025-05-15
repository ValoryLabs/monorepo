<script lang="ts" setup>
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

import { Profile, Preview } from '.'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { X } from 'lucide-vue-next'

const userStore = useUserStore()

const { showSettings } = storeToRefs(userStore)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="showSettings"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        @click.self="userStore.toggleShowSettings"
      >
        <div
          class="bg-background relative flex min-h-3/4 w-full max-w-[880px] flex-col gap-3 rounded-xl p-8"
        >
          <button class="absolute top-4 right-4" @click="userStore.toggleShowSettings">
            <X class="size-4" />
          </button>
          <div class="text-xl">Settings</div>
          <div>
            <Tabs default-value="profile" class="flex w-full flex-row" orientation="vertical">
              <TabsList class="grid w-full max-w-[208px] grid-cols-1 gap-1">
                <TabsTrigger value="profile"> {{ $t('sidebar.profile.title') }} </TabsTrigger>
                <TabsTrigger value="preview"> {{ $t('sidebar.preview.title') }} </TabsTrigger>
              </TabsList>
              <TabsContent value="profile"> <Profile /></TabsContent>
              <TabsContent value="preview"> <Preview /> </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
