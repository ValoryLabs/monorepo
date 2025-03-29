<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Settings } from 'lucide-vue-next'
import router from '@/router'
</script>

<template>
  <div class="flex w-11/12 flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ $t('sidebar.configuration.title') }}</span>
        <div class="flex flex-row gap-1">
          <Button
            variant="outline"
            class="p-2 text-xs"
            @click="router.push('/configurator/settings')"
          >
            <Settings class="size-4" />
          </Button>
        </div>
      </div>
      <span class="whitespace-pre-line text-sm">
        {{ $t('sidebar.configuration.description') }}
      </span>
    </div>
  </div>
</template>
