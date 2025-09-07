<script setup lang="ts">
import { Content } from '@/components/features/configuration-page/spotify/content'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.configurator.spotify'),
})
</script>

<template>
  <Content />
</template>
