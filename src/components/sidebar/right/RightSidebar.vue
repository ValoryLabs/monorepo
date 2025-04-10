<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Preview } from '.'
import { Generate } from '.'
</script>

<template>
  <Tabs default-value="preview">
    <TabsList>
      <TabsTrigger value="preview"> {{ $t('sidebar.preview.title') }} </TabsTrigger>
      <TabsTrigger value="generate"> {{ $t('sidebar.buttons.generate') }} </TabsTrigger>
    </TabsList>
    <TabsContent value="preview">
      <Preview />
    </TabsContent>
    <TabsContent value="generate">
      <Generate />
    </TabsContent>
  </Tabs>
</template>
