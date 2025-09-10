<script setup lang="ts">
import { Settings } from '@/components/features/configuration-page/settings'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.settings'),
})
</script>

<template>
  <Settings />
</template>
