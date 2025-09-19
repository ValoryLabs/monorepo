<script setup lang="ts">
import { Valory } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import router from '@/router'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: t('pages.not-supported'),
})
</script>

<template>
  <div class="inline-flex h-screen w-screen items-center">
    <div class="m-auto flex items-center justify-center">
      <div class="container flex flex-col content-center items-center justify-center gap-3">
        <div class="relative flex flex-row items-center gap-2">
          <Valory :size="38" />
          <Valory :size="96" class="absolute left-0 blur-[120px]" />
        </div>
        <div class="flex flex-col items-center justify-center gap-4 py-3">
          <span class="text-valory text-lg font-bold uppercase">
            {{ t('components.not-supported.title') }}
          </span>
          <span class="text-center whitespace-pre-wrap">
            {{ t('components.not-supported.description') }}
          </span>
          <Button variant="secondary" @click="router.push({ name: 'home' })" class="mt-2">
            {{ t('components.404.home') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
