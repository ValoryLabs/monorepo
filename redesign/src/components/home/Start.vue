<script setup lang="ts">
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { Paintbrush, PackageOpen, PencilRuler } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()
</script>

<template>
  <div class="flex w-11/12 flex-col items-center justify-center gap-6">
    <ul class="flex flex-col items-start gap-3">
      <li class="flex flex-row items-center justify-center gap-3 leading-5">
        <Paintbrush class="size-6" />
        <span class="whitespace-pre-line">
          {{ $t('sidebar.features.first') }}
        </span>
      </li>
      <li class="flex flex-row items-center justify-center gap-3 leading-5">
        <PackageOpen class="size-6" />
        <span class="whitespace-pre-line">
          {{ $t('sidebar.features.second') }}
        </span>
      </li>
      <li class="flex flex-row items-center justify-center gap-3 leading-5">
        <PencilRuler class="size-6" />
        <span class="whitespace-pre-line">
          {{ $t('sidebar.features.third') }}
        </span>
      </li>
    </ul>
    <div class="flex flex-row gap-2">
      <LanguageSwitcher />
      <Button @click="userStore.toggleProfile()">
        {{ $t('sidebar.buttons.start') }}
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
