<script setup lang="ts">
import { FeaturesCard } from '@/components/configuration-page/configuration-home-page/features-cards'
import { CONFIGURATOR_NAV_DATA } from '@/data'

const features_data = [...CONFIGURATOR_NAV_DATA[1].links, ...CONFIGURATOR_NAV_DATA[2].links]
</script>

<template>
  <div class="inline-flex gap-5 flex-wrap w-full justify-center">
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
