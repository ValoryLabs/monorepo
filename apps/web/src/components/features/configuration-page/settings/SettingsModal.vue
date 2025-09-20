<script setup lang="ts">
import { Modal } from '@/components/ui/modal'

import { useSettingsStore } from '@/stores'
import { storeToRefs } from 'pinia'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useI18n } from 'vue-i18n'
import { MiscTab, PersonalTab, SpotifyTab, ValorantTab } from '.'

const settingsStore = useSettingsStore()
const { settingsActive } = storeToRefs(settingsStore)

const { t } = useI18n()

interface ITabs {
  value: string
  title: string
  component: any
}

const tabs: ITabs[] = [
  {
    value: 'personal',
    title: t('components.settings.tabs.personal.title'),
    component: PersonalTab,
  },
  {
    value: 'valorant',
    title: t('components.settings.tabs.valorant.title'),
    component: ValorantTab,
  },
  {
    value: 'spotify',
    title: t('components.settings.tabs.spotify.title'),
    component: SpotifyTab,
  },
  {
    value: 'misc',
    title: t('components.settings.tabs.misc.title'),
    component: MiscTab,
  },
]
</script>

<template>
  <Modal v-model="settingsActive" class="h-4/5">
    <div class="w-4xl h-full relative flex flex-col gap-3">
      <div class="title text-xl">{{ t('components.settings.title') }}</div>
      <div class="flex flex-col items-start h-full">
        <Tabs default-value="personal" class="flex w-full flex-row h-full" orientation="vertical">
          <TabsList
            class="grid w-full gap-1 max-w-[208px] grid-cols-1 p-0 pr-1 border-transparent hover:border-transparent"
          >
            <TabsTrigger v-for="tab in tabs" :key="tab.value" variant="vertical" :value="tab.value">
              {{ tab.title }}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            class="overflow-y-scroll overflow-x-hidden w-full pr-24"
          >
            <component :is="tab.component" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </Modal>
</template>
