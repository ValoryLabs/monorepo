<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Shortcuts from '@/components/ui/Shortcuts.vue'
import { Button } from '@/components/ui/button'
import { Expand, RotateCcw, Command } from 'lucide-vue-next'

import { useUserStore } from '@/stores/user'
import { useOverlayStore } from '@/stores/overlay'

const userStore = useUserStore()
const overlayStore = useOverlayStore()
</script>

<template>
  <div class="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary" size="icon" @click="userStore.toggleSidebar()">
            <Expand class="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ $t('components.tooltips.fullscreen') }}</p>
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
          <p>{{ $t('components.tooltips.reset') }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Shortcuts>
            <Button variant="secondary" size="icon">
              <Command class="size-6" />
            </Button>
          </Shortcuts>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ $t('components.tooltips.shortcuts') }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
