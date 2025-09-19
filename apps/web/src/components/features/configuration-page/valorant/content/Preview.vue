<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div
    class="absolute select-none top-6 right-6 px-3 py-1 bg-black/50 backdrop-blur-sm shadow-xl rounded-full border border-white/10 z-50"
  >
    <span class="text-sm text-white font-medium">{{ t('components.preview') }}</span>
  </div>
</template>
