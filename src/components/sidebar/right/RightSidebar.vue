<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Preview } from '.'
import { Generate } from '.'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)
</script>

<template>
  <Tabs default-value="preview">
    <TabsList>
      <TabsTrigger value="preview"> {{ $t('sidebar.preview.title') }} </TabsTrigger>
      <TabsTrigger :disabled="!configuratorActive" value="generate">
        {{ $t('sidebar.buttons.generate') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="preview">
      <Preview />
    </TabsContent>
    <TabsContent value="generate">
      <Generate />
    </TabsContent>
  </Tabs>
</template>
