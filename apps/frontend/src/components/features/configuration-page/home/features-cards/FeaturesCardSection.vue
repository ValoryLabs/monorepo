<script setup lang="ts">
import { CONFIGURATOR_NAV_DATA } from '@/data'
import { FeaturesCard } from '.'

const features_data = [
  ...CONFIGURATOR_NAV_DATA[1].links,
  ...CONFIGURATOR_NAV_DATA[2].links,
  ...CONFIGURATOR_NAV_DATA[3].links,
]
</script>

<template>
  <div class="inline-flex mt-3 flex-wrap max-w-[90%] justify-center z-10">
    <FeaturesCard
      v-for="feature in features_data"
      :key="feature.label"
      :icon="feature.icon"
      :label="feature.label"
      :description="feature.description"
      :link="feature.link"
      :color="feature.color"
      :disabled="feature.disabled"
      :status="feature.status"
    />
  </div>
</template>
