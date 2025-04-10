<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useOverlayStore } from '@/stores/overlay.ts'
import { computed } from 'vue'
import { Copy } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Link } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

const overlayStore = useOverlayStore()

const queryString = overlayStore.getSettingsAsQuery()
const url = computed(() => `${window.location.origin}/overlay?${queryString}`)
const { copy } = useClipboard({ url })

const copyUrl = () => {
  copy(url.value)
  toast.success('URL copied to clipboard')
}

const dimensions = computed(() => {
  const { overlayStyle } = storeToRefs(overlayStore)

  if (overlayStyle.value === 'old') return '460 x 154'
  else if (overlayStyle.value === 'new') return '360 x 112'
  else if (overlayStyle.value === 'new_v2') return '360 x 112'
  else if (overlayStyle.value === 'minimal') return '293 x 50'
  else return 'Error'
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span
        class="inline-block bg-linear-to-b from-[#f2f2f2] to-[#dddddd] bg-clip-text text-lg font-semibold"
      >
        {{ $t('sidebar.generate.title') }}
      </span>
      <span class="text-sm whitespace-pre-line text-white/70">
        {{ $t('sidebar.generate.description') }}
      </span>
    </div>
    <div class="flex flex-row items-center gap-2">
      <Input v-model="url" disabled="true" class="cursor-text bg-transparent">
        <Link class="size-4" />
      </Input>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" @click="copyUrl"><Copy class="size-4" /></Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ $t('sidebar.generate.tooltip') }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <span class="text-muted-foreground text-sm"
      >{{ $t('sidebar.generate.dimensions') }} {{ dimensions }}</span
    >
  </div>
</template>
