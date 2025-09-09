<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CONFIGURATOR_NAV_DATA } from '@/data'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores'
import { NavigationLink, NavigationTitle } from '.'

const userStore = useUserStore()
const { showLeftSidebar } = storeToRefs(userStore)
</script>

<template>
  <div class="p-3 mt-3 flex-1 flex flex-col" :class="cn(showLeftSidebar ? 'gap-5' : 'gap-3')">
    <div
      class="flex flex-col gap-1"
      v-for="nav_data in CONFIGURATOR_NAV_DATA"
      :key="nav_data.title"
    >
      <NavigationTitle v-if="showLeftSidebar" :label="nav_data.title" />
      <div class="flex flex-col" :class="cn(!showLeftSidebar ? 'items-center gap-3' : 'gap-1')">
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
