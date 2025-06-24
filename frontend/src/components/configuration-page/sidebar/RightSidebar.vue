<script setup lang="ts">
import { Configuration } from '@/components/configuration-page/configuration'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Generate } from './index.ts'

import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { fullscreen, configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <aside
    v-if="!fullscreen"
    class="fixed z-50 top-2 right-2 border flex rounded-lg h-[calc(100%-1rem)] w-86 flex-col p-2 transition-all bg-background"
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
      <TabsContent
        value="configuration"
        class="scrollbar-thin h-full overflow-scroll overflow-x-hidden ml-2 pr-3"
      >
        <Configuration />
      </TabsContent>
      <TabsContent value="generate" class="ml-2">
        <Generate />
      </TabsContent>
    </Tabs>
  </aside>
</template>
