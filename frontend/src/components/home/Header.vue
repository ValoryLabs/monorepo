<script setup lang="ts">
import Valory from '@/components/icons/Valory.vue'
</script>

<template>
  <header class="flex flex-col items-start justify-center gap-3">
    <div class="relative flex flex-row items-center gap-2">
      <Valory :size="26" />
      <Valory :size="96" class="absolute left-0 blur-[120px]" />
      <span
        class="font-valory inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg leading-none text-transparent"
      >
        VALORY
      </span>
    </div>
    <span class="text-4xl leading-tight font-bold whitespace-pre-line text-white">
      {{ $t('sidebar.header.description') }}
    </span>
  </header>
</template>
