<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useOverlayStore } from '@/stores/overlay.ts'
import { computed } from 'vue'
import { Copy } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const overlayStore = useOverlayStore()

const queryString = overlayStore.getSettingsAsQuery()
const url = computed(() => `${window.location.href}overlay?${queryString}`)
const { copy } = useClipboard({ url })

const copyUrl = () => {
  copy(url.value)
  toast.success('URL copied to clipboard')
}
</script>

<template>
  <div class="flex w-11/12 flex-col gap-4 rounded-lg bg-white/5 p-5">
    <div class="flex flex-col gap-3">
      <span class="text-lg font-semibold"> Overlay URL: Streaming Software </span>
      <span class="whitespace-pre-line text-sm">
        Copy the URL below and paste it into your streaming software as "Browser".
      </span>
      <div class="flex flex-row items-center gap-2">
        <Input v-model="url" disabled="true" class="cursor-text bg-transparent" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button size="icon" @click="copyUrl"><Copy class="size-4" /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</template>
