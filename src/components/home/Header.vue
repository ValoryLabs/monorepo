<script setup lang="ts">
import Valory from '@/components/icons/Valory.vue'
</script>

<template>
  <header class="flex flex-col items-center justify-center gap-3">
    <span class="flex flex-row items-center justify-center gap-1 text-xs font-bold">
      {{ $t('sidebar.header.badge') }}
    </span>
    <div class="relative flex flex-row items-center gap-3">
      <Valory :size="48" />
      <Valory :size="96" class="absolute left-0 blur-[120px]" />
      <span
        class="font-valory inline-block bg-gradient-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-3xl text-transparent"
      >
        VALORY
      </span>
    </div>
    <span class="whitespace-pre-line text-center text-lg leading-5 text-gray-300">
      {{ $t('sidebar.header.description') }}
    </span>
  </header>
</template>
