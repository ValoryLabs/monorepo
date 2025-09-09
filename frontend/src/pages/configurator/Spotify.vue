<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { Content } from '@/components/features/configuration-page/spotify/content'

const { t } = useI18n()

useHead({
  title: t('pages.configurator.spotify'),
})
</script>

<template>
  <Content />
</template>
