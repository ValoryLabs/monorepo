<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Settings } from 'lucide-vue-next'
import router from '@/router'
</script>

<template>
  <div class="flex w-full flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold">{{ $t('sidebar.configuration.title') }}</span>
        <div class="flex flex-row gap-1">
          <Button
            size="icon"
            variant="outline"
            class="text-xs"
            @click="router.push({ name: 'configurator.settings' })"
          >
            <Settings class="size-4" />
          </Button>
        </div>
      </div>
      <span class="text-sm whitespace-pre-line">
        {{ $t('sidebar.configuration.description') }}
      </span>
    </div>
  </div>
</template>
