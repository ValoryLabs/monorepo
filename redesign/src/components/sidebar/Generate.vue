<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useOverlayStore } from '@/stores/overlay.ts'
import { computed } from 'vue'
import { Copy, KeyRound } from 'lucide-vue-next'
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import InputWithIcon from '@/components/ui/InputWithIcon.vue'
import { Link } from 'lucide-vue-next'

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
  <div class="flex w-11/12 flex-col gap-4 rounded-lg">
    <div class="flex flex-col gap-3">
      <span class="text-lg font-semibold"> {{ $t('sidebar.generate.title') }} </span>
      <span class="whitespace-pre-line text-sm">
        {{ $t('sidebar.generate.description') }}
      </span>
      <div class="flex flex-row items-center gap-2">
        <InputWithIcon v-model="url" disabled="true" class="cursor-text bg-transparent">
          <Link class="size-4" />
        </InputWithIcon>

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
    </div>
  </div>
</template>
