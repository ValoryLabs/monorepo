<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Configuration, Generate } from '.'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <Tabs default-value="configuration">
    <TabsList>
      <TabsTrigger :disabled="!configuratorActive" value="configuration">
        {{ $t('sidebar.configuration.title') }}
      </TabsTrigger>
      <TabsTrigger :disabled="!configuratorActive" value="generate">
        {{ $t('sidebar.buttons.generate') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="configuration">
      <Configuration />
    </TabsContent>
    <TabsContent value="generate">
      <Generate />
    </TabsContent>
  </Tabs>
</template>
