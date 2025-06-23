<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Expand, RotateCcw } from 'lucide-vue-next'

import { useUserStore } from '@/stores/user.ts'
import { useOverlayStore } from '@/stores/overlay.ts'
import { Kbd } from '@/components/ui/kbd'

const userStore = useUserStore()
const overlayStore = useOverlayStore()
</script>

<template>
  <div class="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary" size="icon" @click="userStore.toggleFullscreen()">
            <Expand class="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span class="flex items-center gap-2"
            >{{ $t('components.tooltips.fullscreen') }}
            <Kbd v-if="userStore.showShortcuts === 'Show'" keys="F"
          /></span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary" size="icon" @click="overlayStore.reset">
            <RotateCcw class="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span class="flex items-center gap-2"
            >{{ $t('components.tooltips.reset') }}
            <Kbd v-if="userStore.showShortcuts === 'Show'" keys="R"
          /></span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
