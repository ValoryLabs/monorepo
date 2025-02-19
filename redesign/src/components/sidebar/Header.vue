<script setup lang="ts">
import Valory from "@/components/icons/Valory.vue";
</script>

<template>
  <header class="flex flex-col items-center justify-center gap-3">
    <span class="text-xs font-bold flex flex-row justify-center items-center gap-1 ">
      {{ $t('sidebar.header.badge') }}
    </span>
    <div class="flex flex-row items-center gap-3">
      <Valory :size="48"/>
      <span class="valory-text text-3xl bg-gradient-to-b from-[#f2f2f2] to-[#dddddd] text-transparent bg-clip-text inline-block">
        VALORY
      </span>
    </div>
    <span class="whitespace-pre-line text-lg text-gray-300 text-center leading-5">
      {{ $t('sidebar.header.description') }}
    </span>
  </header>
</template>