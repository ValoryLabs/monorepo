<script setup lang="ts">
import ConfigurationLabel from '@/components/configuration-page/configuration/ConfigurationLabel.vue'

const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div>
    <ConfigurationLabel v-if="props.label">{{ props.label }}</ConfigurationLabel>
    <section class="flex flex-col gap-2">
      <slot />
    </section>
  </div>
</template>
