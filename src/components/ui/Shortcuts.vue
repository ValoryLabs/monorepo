<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Kbd } from '@/components/ui/kbd'

const shortcuts = [
  {
    key: ['F'],
    description: 'Fullscreen',
  },
  {
    key: ['R'],
    description: 'Reset',
  },
]
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <slot />
    </PopoverTrigger>
    <PopoverContent>
      <div class="flex flex-col gap-3 font-medium">
        <span>Shortcuts</span>
        <div
          class="inline-flex items-center justify-between rounded-md bg-white/20 p-2 text-sm"
          v-for="shortcut in shortcuts"
          :key="shortcut.key"
        >
          <span>{{ shortcut.description }}</span>
          <Kbd :keys="shortcut.key" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
