<script setup lang="ts">
import SettingsLabel from '@/components/settings/SettingsLabel.vue'

const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div>
    <SettingsLabel v-if="props.label">{{ props.label }}</SettingsLabel>
    <section class="flex flex-col gap-2">
      <slot />
    </section>
  </div>
</template>
