<script setup lang="ts">
import { Content, RightSidebar } from '@/components/features/configuration-page/spotify'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator.spotify'),
})
</script>

<template>
  <Content />
  <RightSidebar />
</template>
