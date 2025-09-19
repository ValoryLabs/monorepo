<script setup lang="ts">
import { CONFIGURATOR_NAV_DATA } from '@/data'
import { FeaturesAvatar } from '.'

const features_data = [
  ...CONFIGURATOR_NAV_DATA[1].links,
  ...CONFIGURATOR_NAV_DATA[2].links,
  ...CONFIGURATOR_NAV_DATA[3].links,
]
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="flex">
      <FeaturesAvatar
        v-for="feature in features_data"
        :key="feature.label"
        :icon="feature.icon"
        :color="feature.color"
        :disabled="feature.disabled"
        :link="feature.link"
      />
    </div>
  </div>
</template>
