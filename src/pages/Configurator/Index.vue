<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Atom, Settings } from 'lucide-vue-next'
import { Preview, Section } from '@/components/sidebar'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const userStore = useUserStore()
const { configuratorActive } = storeToRefs(userStore)

const sections = [
  {
    title: t('sidebar.profile.title'),
    description: t('sidebar.profile.description'),
    icon: Settings,
    routeName: 'configurator.profile',
  },
  {
    title: t('sidebar.configuration.title'),
    description: t('sidebar.configuration.description'),
    icon: Settings,
    routeName: 'configurator.settings',
    if: configuratorActive.value,
  },
]
</script>

<template>
  <div class="configurator flex flex-col gap-10">
    <Section
      v-for="section in sections"
      :if="section.if"
      :key="section.title"
      :title="section.title"
      :description="section.description"
      :icon="section.icon"
      :route-name="section.routeName"
    />
    <Preview />
    <Button
      v-if="configuratorActive"
      @click="router.push({ name: 'configurator.generate' })"
      size="lg"
      class="w-full"
    >
      <Atom class="size-4" />
      {{ $t('sidebar.buttons.generate') }}
    </Button>
  </div>
</template>
