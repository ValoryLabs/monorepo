<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Profile, Configuration } from '.'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <Tabs default-value="profile">
    <TabsList>
      <TabsTrigger value="profile"> {{ $t('sidebar.profile.title') }} </TabsTrigger>
      <TabsTrigger :disabled="!configuratorActive" value="configuration">
        {{ $t('sidebar.configuration.title') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="profile">
      <Profile />
    </TabsContent>
    <TabsContent value="configuration">
      <Configuration />
    </TabsContent>
  </Tabs>
</template>
