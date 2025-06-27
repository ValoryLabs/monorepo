<script setup lang="ts">
import {
  NavigationLink,
  NavigationTitle,
} from '@/components/configuration-page/sidebar/left-sidebar/navigation'
import { CONFIGURATOR_NAV_DATA } from '@/data'
</script>

<template>
  <div class="p-3 mt-3 flex-1 flex flex-col gap-5">
    <div
      class="flex flex-col gap-1"
      v-for="nav_data in CONFIGURATOR_NAV_DATA"
      :key="nav_data.title"
    >
      <NavigationTitle :label="nav_data.title" />
      <div class="flex flex-col gap-1">
        <NavigationLink
          v-for="link in nav_data.links"
          :key="link.label"
          :icon="link.icon"
          :label="link.label"
          :router-link="link.link"
          :color="link.color"
          :disabled="link.disabled"
        />
      </div>
    </div>
  </div>
</template>
