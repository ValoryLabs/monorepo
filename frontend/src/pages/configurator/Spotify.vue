<script setup lang="ts">
import { Content } from '@/components/configuration-pages/spotify-page/content'
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
