<script setup lang="ts">
import Header from '@/components/configuration-page/Header.vue'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { showHeader } = storeToRefs(userStore)
</script>

<template>
  <div class="configurator-layout">
    <Header v-if="showHeader" />
    <main>
      <slot />
    </main>
  </div>
</template>
