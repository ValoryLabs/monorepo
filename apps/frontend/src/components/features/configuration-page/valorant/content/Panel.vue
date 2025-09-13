<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSettingsStore, useValorantOverlayStore } from '@/stores'
import { Expand, RotateCcw } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const settingsStore = useSettingsStore()
const valorantOverlayStore = useValorantOverlayStore()
</script>

<template>
  <div class="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary" size="icon" @click="settingsStore.toggleFullscreen()">
            <Expand class="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span class="flex items-center gap-2">
            {{ t('components.tooltips.fullscreen') }}
            <Kbd v-if="settingsStore.showShortcuts" keys="F" />
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary" size="icon" @click="valorantOverlayStore.reset">
            <RotateCcw class="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span class="flex items-center gap-2">
            {{ t('components.tooltips.reset') }} <Kbd v-if="settingsStore.showShortcuts" keys="R" />
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
