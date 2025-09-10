<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useValorantOverlayStore } from '@/stores'
import { useUserStore } from '@/stores/user.ts'
import { Expand, RotateCcw } from 'lucide-vue-next'

const userStore = useUserStore()
const valorantOverlayStore = useValorantOverlayStore()
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
          <Button variant="secondary" size="icon" @click="valorantOverlayStore.reset">
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
