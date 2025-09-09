<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab, ValorantTab } from '.'

const { t } = useI18n()

interface ITabs {
  value: string
  title: string
  component: any
}

const tabs: ITabs[] = [
  {
    value: 'profile',
    title: t('components.settings.tabs.profile.title'),
    component: ProfileTab,
  },
  {
    value: 'valorant',
    title: t('components.settings.tabs.valorant.title'),
    component: ValorantTab,
  },
]
</script>

<template>
  <div class="container mt-6 relative flex flex-col gap-3">
    <div class="title text-xl">{{ t('components.settings.title') }}</div>
    <div class="flex flex-col items-start max-w-4xl">
      <Tabs default-value="profile" class="flex w-full flex-row" orientation="vertical">
        <TabsList
          class="grid w-full gap-1 max-w-[208px] grid-cols-1 p-0 pr-1 border-transparent hover:border-transparent"
        >
          <TabsTrigger v-for="tab in tabs" :key="tab.value" variant="vertical" :value="tab.value">
            {{ tab.title }}
          </TabsTrigger>
        </TabsList>
        <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <component :is="tab.component" />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
