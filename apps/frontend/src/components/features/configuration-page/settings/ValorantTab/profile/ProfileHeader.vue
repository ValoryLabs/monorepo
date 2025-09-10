<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2">
    <span class="title text-xl">
      {{ t('components.settings.tabs.valorant.sections.profile.title') }}
    </span>
    <span class="text-second text-sm whitespace-pre-line">
      {{ t('components.settings.tabs.valorant.sections.profile.description') }}
    </span>
  </div>
</template>
