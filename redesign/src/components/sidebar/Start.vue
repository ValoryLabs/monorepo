<script setup lang="ts">
import LanguageSwitcher from "@/components/ui/LanguageSwitcher.vue";
import Brush from "@/components/icons/Brush.vue";
import Hearts from "@/components/icons/Hearts.vue";
import Button from "../ui/button/Button.vue";
import Tools from "@/components/icons/Tools.vue";
import { useUserStore } from "@/stores/user.ts";

const userStore = useUserStore()
</script>

<template>
<div class="flex flex-col items-center justify-center gap-6 w-11/12">
  <ul class="flex flex-col gap-3 items-start">
    <li class="flex flex-row gap-3 items-center justify-center leading-5">
      <Brush/>
      <span class="whitespace-pre-line">
        {{ $t('sidebar.features.first') }}
      </span>
    </li>
    <li class="flex flex-row gap-3 items-center justify-center leading-5">
      <Hearts/>
      <span class="whitespace-pre-line">
        {{ $t('sidebar.features.second') }}
      </span>
    </li>
    <li class="flex flex-row gap-3 items-center justify-center leading-5">
      <Tools/>
      <span class="whitespace-pre-line">
        {{ $t('sidebar.features.third') }}
      </span>
    </li>
  </ul>
  <div class="flex flex-row gap-2">
    <LanguageSwitcher/>
    <Button @click="userStore.toggleProfile()">
      {{ $t('sidebar.buttons.start') }}
    </Button>
  </div>
</div>
</template>

<style scoped>

</style>