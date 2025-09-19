<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  label: string
}>()

const { t } = useI18n()
</script>

<template>
  <div class="ml-2 text-second text-[0.65rem] font-bold uppercase">{{ t(props.label) }}</div>
</template>
