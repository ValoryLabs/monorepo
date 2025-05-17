<script setup lang="ts">
import Header from '@/components/ui/Header.vue'
import {useUserStore} from '@/stores/user.ts'
import {storeToRefs} from 'pinia'

const userStore = useUserStore()
const { showHeader } = storeToRefs(userStore)
</script>

<template>
  <Header v-if="showHeader" />
  <main>
    <slot />
  </main>
</template>

<style scoped></style>
