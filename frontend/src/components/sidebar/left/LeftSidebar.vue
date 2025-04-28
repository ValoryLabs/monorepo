<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Profile, Configuration, Preview, Generate } from '.'

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
      <TabsTrigger value="preview"> {{ $t('sidebar.preview.title') }} </TabsTrigger>
      <TabsTrigger :disabled="!configuratorActive" value="generate">
        {{ $t('sidebar.buttons.generate') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="profile">
      <Profile />
    </TabsContent>
    <TabsContent value="configuration">
      <Configuration />
    </TabsContent>
    <TabsContent value="preview">
      <Preview />
    </TabsContent>
    <TabsContent value="generate">
      <Generate />
    </TabsContent>
  </Tabs>
</template>
