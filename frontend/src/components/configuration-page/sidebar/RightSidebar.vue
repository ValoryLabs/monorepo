<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Generate } from './index.ts'
import { Configuration } from '@/components/configuration-page/configuration'

import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { fullscreen, configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <aside v-if="!fullscreen" class="flex border-[0.5px] rounded-2xl  h-full w-80 flex-col p-2 transition-all">
    <Tabs default-value="configuration" class="h-full">
      <TabsList>
        <TabsTrigger :disabled="!configuratorActive" value="configuration">
          {{ $t('sidebar.configuration.title') }}
        </TabsTrigger>
        <TabsTrigger :disabled="!configuratorActive" value="generate">
          {{ $t('sidebar.buttons.generate') }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="configuration" class="h-full overflow-scroll ml-2 pr-5">
        <Configuration />
      </TabsContent>
      <TabsContent value="generate" class="ml-2">
        <Generate />
      </TabsContent>
    </Tabs>
  </aside>
</template>
