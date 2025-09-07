<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Preview, Profile } from '.'
</script>

<template>
  <div class="container mt-6 relative flex flex-col gap-3">
    <div class="title text-xl">{{ $t('components.settings.title') }}</div>
    <div>
      <Tabs default-value="profile" class="flex w-full flex-row" orientation="vertical">
        <TabsList
          class="grid w-full gap-1 max-w-[208px] grid-cols-1 p-0 pr-1 border-transparent hover:border-transparent"
        >
          <TabsTrigger variant="vertical" value="profile">
            {{ $t('components.settings.tabs.profile.title') }}
          </TabsTrigger>
          <TabsTrigger variant="vertical" value="preview">
            {{ $t('components.settings.tabs.preview.title') }}
          </TabsTrigger>
          <!--          <TabsTrigger variant="vertical" value="shortcuts"> Shortcuts </TabsTrigger>-->
        </TabsList>
        <TabsContent value="profile"> <Profile /></TabsContent>
        <TabsContent value="preview"> <Preview /> </TabsContent>
        <!--        <TabsContent value="shortcuts"> <Shortcuts /> </TabsContent>-->
      </Tabs>
    </div>
  </div>
</template>
