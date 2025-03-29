<script setup lang="ts">
import Valory from '@/components/icons/Valory.vue'
</script>

<template>
  <header class="flex h-14 items-center justify-between border-b px-10">
    <span @click="$router.push('/')" class="flex w-56 cursor-pointer items-center gap-3">
      <Valory :size="30" />
      <span class="font-valory text-lg leading-none">VALORY</span>
    </span>
  </header>
</template>
